import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, CircularProgress, Dialog, DialogContent, Divider, Grid, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material";
import type { ReactNode } from "react";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { typography } from "src/theme/core";
import { Iconify } from "../iconify";
import type { KeyboardType, KeyboardWrapperProps } from "./types";
import { keyNumber, keyNumberFirstLine, keyNumberFourthLine, keyNumberSecondLine, keyNumberThirdLine, keyTextFirstLine, keyTextFourthLineEmail, keyTextFourthLineText, keyTextSecondLine, keyTextThirdLine } from "./variables";


const KeyboardWrapper = React.forwardRef((props: KeyboardWrapperProps, inputRef: any) => {
  const { elementName, withDialog, inputType, onClose, open } = props

  const dialogInputRef = useRef<HTMLInputElement | null>(null)

  const { setValue, trigger } = useFormContext();
  const theme = useTheme()
  const values = useWatch({ name: elementName })

  const onInputChange = (key: string) => {
    if (dialogInputRef) {
      const currentInput = dialogInputRef.current?.value || '';
      const dialogRef = dialogInputRef.current

      let newInput;
      const cursorPosition = dialogRef?.selectionStart || 0;
      let newCursorPosition = dialogRef?.selectionStart || 0;

      if (key === 'Backspace' || key === 'BACKSPACE') {
        newInput = currentInput.slice(0, cursorPosition - 1) + currentInput.slice(cursorPosition);
        newCursorPosition = Math.max(0, cursorPosition - 1);
      } else if (key === 'Enter' || key === 'ENTER') {
        setValue(elementName, currentInput)
        onClose && onClose(); trigger(elementName)
        return;
      } else {
        newInput = currentInput.slice(0, cursorPosition) + key + currentInput.slice(cursorPosition);
        newCursorPosition += key.length;
      }

      (dialogRef as any).value = newInput
      setValue(elementName, newInput)
    }
  }

  const inputLabel = inputRef[elementName]?.placeholder || (inputRef[elementName]?.label || "")

  if (withDialog) {
    return (
      <Dialog open={open || false} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogContent>
          <Stack sx={{ my: 2 }} spacing={2}>
            <Box sx={{ display: "flex", placeItems: "center", placeContent: "space-between" }}>
              <Typography variant="subtitle1" gutterBottom>{inputLabel}</Typography>
              <IconButton size="large" color="error" title="Close" onClick={onClose}>
                <Iconify icon="carbon:close-filled" width={28} />
              </IconButton>
            </Box>
            <TextField
              fullWidth
              value={values}
              placeholder={inputLabel}
              inputRef={r => { dialogInputRef.current = r }}
              autoFocus
              variant="filled"
              inputProps={{
                style: {
                  textAlign: "center",
                  paddingBottom: theme.spacing(3),
                  backgroundColor: theme.palette.background.neutral,
                  ...typography.h3
                }
              }}
              onChange={(event) => {
                if (inputType === "number") {
                  try {
                    const num = Number(event.target.value)
                    if (Number.isNaN(num)) throw Error("Apalah Beliau Ini");
                    setValue(elementName, num)
                  } catch (error) {
                    console.log(error)
                  }
                } else {
                  setValue(elementName, event.target.value)
                }
              }}
            />
            <Divider />
            <Keyboard
              withDialog={withDialog}
              inputType={inputType}
              elementName={elementName}
              onInputChange={onInputChange}
              ref={inputRef}
            />
          </Stack>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Keyboard
      elementName={elementName}
      inputType={inputType}
      ref={inputRef}
    />
  )
})

const Keyboard = React.forwardRef((props: KeyboardType, inputRef: any) => {
  const { inputType, elementName, onInputChange, withDialog } = props;

  const theme = useTheme()
  const [openNumber, setOpenNumber] = useState(props.inputType === "number")
  const [shift, setShift] = useState(false);
  const [secondShift, setSecondShift] = useState(false);

  const { setValue, formState: { isSubmitting } } = useFormContext();

  const defaultButtonStyle = useMemo(() => {
    return {
      borderWidth: 2,
      borderColor: theme.palette.secondary.main,
      height: 94,
      width: 94,
    }
  }, [theme])

  const handleButtonClick = (currentKey: string) => {

    const key = (shift || secondShift) ? currentKey.toUpperCase() : currentKey;

    const currentRef = inputRef[elementName];

    if (key === "TO_NUMBER_AND_CHAR") {
      setOpenNumber((prev) => !prev)
    } else if (withDialog && onInputChange) {

      onInputChange(key)
      setShift(false);

    } else if (currentRef) {
      let { selectionStart, selectionEnd, value } = currentRef as HTMLInputElement;

      currentRef.focus()

      if (!selectionStart) {
        selectionStart = 0
      }

      if (!selectionEnd) {
        selectionEnd = 0
      }

      if (key === 'Backspace' || key === 'BACKSPACE') {
        if (selectionStart > 0) {
          value = value.substring(0, selectionStart - 1) + value.substring(selectionEnd);
        }
      } else if (key === 'Enter' || key === 'ENTER') {
        value = value.substring(0, selectionStart) + '\n' + value.substring(selectionEnd);
      } else {
        value = value.substring(0, selectionStart) + key + value.substring(selectionEnd);
      }

      currentRef.setSelectionRange(selectionStart + (key === 'Backspace' ? -1 : 1), selectionStart + (key === 'Backspace' ? -1 : 1));

      currentRef.value = value
      setValue(elementName, value);
      setShift(false);
    }
  };

  const NumberOnlyLayout = useCallback((onButtonClick: any) => {
    return keyNumber.map((row) => {
      const isEnter = row.value === "Enter"
      const isBackspace = row.value === "Backspace"
      return (
        <Grid item xs={12} md={4} key={row.value}>
          <LoadingButton
            unselectable="on"
            variant="outlined"
            fullWidth
            disableRipple
            disableElevation
            disableTouchRipple
            sx={{
              p: isEnter && isSubmitting ? 2 : 3,
              borderWidth: 2,
              borderColor: (thm) => thm.palette.secondary.main
            }}
            type={isEnter ? "submit" : undefined}
            disabled={isSubmitting}
            onMouseDown={(event) => {
              event.preventDefault()
              onButtonClick(row.value)
            }}>
            <Typography variant="h4">
              {
                isEnter && (
                  isSubmitting ? (
                    <CircularProgress size={38} color="secondary" />
                  ) : <>{row.label}</>
                )
              }
              {
                isBackspace && (
                  isSubmitting ? (
                    <Iconify icon="fluent:backspace-16-regular" sx={{ transform: 'scale(2)' }} />
                  ) : <>{row.label}</>
                )
              }
              {
                !isEnter && row.value !== "Backspace" && row.label
              }
            </Typography>
          </LoadingButton>
        </Grid>
      )
    })
  }, [isSubmitting])

  const TextLayout = useCallback((onButtonClick: any) => {
    const isUpper = shift || secondShift

    const getLabel = (label: string | ReactNode) => typeof label === "string" ? isUpper ? label.toUpperCase() : label : label

    return (
      <>
        <Grid item xs={12} sx={{ display: 'flex', placeItems: 'center', placeContent: 'center', gap: 1 }}>
          {
            (openNumber ? keyNumberFirstLine : keyTextFirstLine).map((row, index) => {

              return (
                <LoadingButton
                  key={index}
                  unselectable="on"
                  variant="outlined"
                  fullWidth
                  disableRipple
                  disableElevation
                  disableTouchRipple
                  sx={{ ...defaultButtonStyle }}
                  disabled={isSubmitting}
                  onMouseDown={(event) => {
                    event.preventDefault()
                    onButtonClick(row.value)
                  }}
                >
                  <Typography variant="h4">{getLabel(row.label)}</Typography>
                </LoadingButton>
              )
            })
          }
        </Grid >

        <Grid item xs={12} sx={{ display: 'flex', placeItems: 'center', placeContent: 'center', gap: 1 }}>
          {
            (openNumber ? keyNumberSecondLine : keyTextSecondLine).map((row, index) => {
              return (
                <LoadingButton
                  key={index}
                  unselectable="on"
                  variant="outlined"
                  fullWidth
                  disableRipple
                  disableElevation
                  disableTouchRipple
                  sx={{ ...defaultButtonStyle }}
                  disabled={isSubmitting}
                  onMouseDown={(event) => {
                    event.preventDefault()
                    onButtonClick(row.value)
                  }}>
                  <Typography variant="h4">{getLabel(row.label)}</Typography>
                </LoadingButton>
              )
            })
          }
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', placeItems: 'center', placeContent: 'center', gap: 1 }}>
          {
            !openNumber && (
              <Button
                unselectable="on"
                variant="outlined"
                fullWidth
                disableRipple
                disableElevation
                disableTouchRipple
                disabled={isSubmitting}
                sx={{
                  ...defaultButtonStyle,
                  width: 94 * 1.5,
                }}
                onDoubleClick={() => {
                  if (!secondShift) setSecondShift((prev) => !prev)
                }}
                onMouseDown={(event) => {
                  event.preventDefault()
                  if (secondShift) setSecondShift(false); else setShift(true)
                }}>
                {<Iconify icon={`fluent:keyboard-shift-uppercase-16-${isUpper ? 'filled' : 'regular'}`} sx={{ width: 42 }} />}
              </Button>
            )
          }
          {
            (openNumber ? keyNumberThirdLine : keyTextThirdLine).map((row, index) => {
              const isBackspace = row.value === "Backspace"
              return (
                <LoadingButton
                  key={index}
                  unselectable="on"
                  variant="outlined"
                  fullWidth
                  disableRipple
                  disableElevation
                  disableTouchRipple
                  sx={{
                    ...defaultButtonStyle,
                    width: isBackspace ? (openNumber ? 94 * 2 : 94 * 1.5) : 94,
                  }}
                  disabled={isSubmitting}
                  onMouseDown={(event) => {
                    event.preventDefault()
                    onButtonClick(row.value)
                  }}>
                  <Typography variant="h4">
                    {
                      isBackspace && (
                        isSubmitting ? (
                          <Iconify icon="fluent:backspace-16-regular" sx={{ transform: 'scale(2)' }} />
                        ) : <>{row.label}</>
                      )
                    }
                    {
                      !isBackspace && getLabel(row.label)
                    }
                  </Typography>
                </LoadingButton>
              )
            })
          }
        </Grid>


        <Grid item xs={12} sx={{ display: 'flex', placeItems: 'center', placeContent: 'center', gap: 1 }}>
          {
            (inputType === "email" ? keyTextFourthLineEmail : (openNumber ? keyNumberFourthLine : keyTextFourthLineText)).map((row, index) => {
              const isEnter = row.value === "Enter"
              return (
                <LoadingButton
                  key={index}
                  unselectable="on"
                  variant="outlined"
                  fullWidth
                  disableRipple
                  disableElevation
                  disableTouchRipple
                  sx={{
                    ...defaultButtonStyle,
                    width: index === (openNumber ? (inputType === "email" ? 2 : 1) : 2) ? 94 * (openNumber ? (inputType === "email" ? 6.4 : 8.6) : 6.3) : 94,
                  }}
                  type={isEnter ? "submit" : undefined}
                  disabled={isSubmitting}
                  onMouseDown={(event) => {
                    event.preventDefault()
                    onButtonClick(row.value)
                  }}>
                  <Typography variant="h4">
                    {
                      row.value === "Enter" && (
                        isSubmitting ? (
                          <CircularProgress size={38} color="secondary" />
                        ) : <>{row.label}</>
                      )
                    }
                    {
                      row.value !== "Enter" && getLabel(row.label)
                    }
                  </Typography>
                </LoadingButton>
              )
            })
          }
        </Grid>
      </>
    )
  }, [secondShift, shift, isSubmitting, inputType, openNumber, defaultButtonStyle])

  const renderKeyboard = () => {

    if (inputType === "numberOnly") {
      return NumberOnlyLayout(handleButtonClick)
    }
    if (inputType === "text" || inputType === "number" || inputType === "email") {
      return TextLayout(handleButtonClick)
    }

    return (
      <Box sx={{ display: "flex", placeItems: "center", placeContent: "center", flexWrap: "wrap", gap: 2 }}>
        <Alert severity="error">Tidak Ada Keyboard. Hubungi IT</Alert>
        <Alert severity="info">Tidak Ada Keyboard. Hubungi IT</Alert>
        <Alert severity="warning">Tidak Ada Keyboard. Hubungi IT</Alert>
        <Alert severity="success">Tidak Ada Keyboard. Hubungi IT</Alert>
      </Box>)
  }

  return (
    <Box sx={{ my: 2 }}>
      <Box>
        <Grid container spacing={1}>
          {renderKeyboard()}
        </Grid>
      </Box>
    </Box>
  )
})

export default memo(KeyboardWrapper)

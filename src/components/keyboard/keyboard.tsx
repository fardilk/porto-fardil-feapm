import type { ReactNode } from "react";
import React, { memo, useCallback, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import { LoadingButton } from "@mui/lab";
import { Box, Button, Dialog, DialogContent, Grid, Stack, TextField, Typography } from "@mui/material";

import { Iconify } from "../iconify";
import type { KeyboardType, KeyboardWrapperProps } from "./types";

const KeyboardWrapper = React.forwardRef((props: KeyboardWrapperProps, inputRef: any) => {
  const { elementName, withDialog, inputType, onClose, open } = props

  const dialogInputRef = useRef<HTMLInputElement | null>(null)

  const { setValue, watch } = useFormContext();
  const values = watch(elementName)

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
        onClose && onClose()
        return;
      } else {
        newInput = currentInput.slice(0, cursorPosition) + key + currentInput.slice(cursorPosition);
        newCursorPosition += key.length;
      }

      (dialogRef as any).value = newInput
    }
  }

  if (withDialog) {
    return (
      <Dialog open={open || false} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <TextField
              fullWidth
              value={values}
              inputRef={r => { dialogInputRef.current = r }}
              autoFocus
            />
            <Keyboard
              withDialog={withDialog}
              inputType={inputType}
              elementName={elementName}
              onInputChange={onInputChange}
              ref={inputRef}
            />
          </Box>
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

  const [openNumber, setOpenNumber] = useState(false)
  const [shift, setShift] = useState(false);
  const [secondShift, setSecondShift] = useState(false);

  const { setValue, formState: { isSubmitting } } = useFormContext();

  const handleButtonClick = (key: string) => {
    key = (shift || secondShift) ? key.toUpperCase() : key;

    const currentRef = inputRef[elementName];

    if (withDialog && onInputChange) {

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

  const NumberLayout = useCallback((onButtonClick: any) => {
    return keyNumber.map((row) => {
      const isEnter = row.value === "Enter"
      return (
        <Grid item xs={12} md={4} key={row.value}>
          <LoadingButton
            unselectable="on"
            variant="outlined"
            fullWidth
            sx={{ p: 4, borderWidth: 2, borderColor: (theme) => theme.palette.secondary.main }}
            type={isEnter ? "submit" : undefined}
            disabled={isSubmitting}
            loading={isEnter ? isSubmitting : undefined}
            onMouseDown={(event) => {
              event.preventDefault()
              onButtonClick(row.value)
            }}>
            <Typography variant="h4">{isSubmitting ? "-" : row.label}</Typography>
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
            keyTextFirstLine.map((row, index) => {
              return (
                <LoadingButton
                  key={index}
                  unselectable="on"
                  variant="outlined"
                  fullWidth
                  sx={{ p: 4, borderWidth: 2, borderColor: (theme) => theme.palette.secondary.main }}
                  disabled={isSubmitting}
                  loading={row.value === "Enter" ? isSubmitting : undefined}
                  onMouseDown={(event) => {
                    event.preventDefault()
                    onButtonClick(row.value)
                  }}>
                  <Typography variant="h4">{isSubmitting ? "-" : getLabel(row.label)}</Typography>
                </LoadingButton>
              )
            })
          }
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', placeItems: 'center', placeContent: 'center', gap: 1, mx: 4 }}>
          {
            keyTextSecondLine.map((row, index) => {
              return (
                <LoadingButton
                  key={index}
                  unselectable="on"
                  variant="outlined"
                  fullWidth
                  sx={{ p: 4, borderWidth: 2, borderColor: (theme) => theme.palette.secondary.main }}
                  disabled={isSubmitting}
                  onMouseDown={(event) => {
                    event.preventDefault()
                    onButtonClick(row.value)
                  }}>
                  <Typography variant="h4">{isSubmitting ? "-" : getLabel(row.label)}</Typography>
                </LoadingButton>
              )
            })
          }
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', placeItems: 'center', placeContent: 'center', gap: 1 }}>
          <Button
            unselectable="on"
            variant="outlined"
            fullWidth
            disabled={isSubmitting}
            sx={{ p: 4, width: "200%", borderWidth: 2, borderColor: (theme) => theme.palette.secondary.main }}
            onDoubleClick={() => {
              if (!secondShift) setSecondShift((prev) => !prev)
            }}
            onMouseDown={(event) => {
              event.preventDefault()
              if (secondShift) setSecondShift(false); else setShift(true)
            }}>
            {isSubmitting ? "-" : <Iconify icon={`fluent:keyboard-shift-uppercase-16-${isUpper ? 'filled' : 'regular'}`} sx={{ transform: 'scale(2)' }} />}
          </Button>
          {
            keyTextThirdLine.map((row, index) => {
              return (
                <LoadingButton
                  key={index}
                  unselectable="on"
                  variant="outlined"
                  fullWidth
                  sx={{ p: 4, borderWidth: 2, borderColor: (theme) => theme.palette.secondary.main, width: row.value === "Backspace" ? "300%" : "100%" }}
                  disabled={isSubmitting}
                  onMouseDown={(event) => {
                    event.preventDefault()
                    onButtonClick(row.value)
                  }}>
                  <Typography variant="h4">{isSubmitting ? "-" : getLabel(row.label)}</Typography>
                </LoadingButton>
              )
            })
          }
        </Grid>


        <Grid item xs={12} sx={{ display: 'flex', placeItems: 'center', placeContent: 'center', gap: 1 }}>
          <LoadingButton
            unselectable="on"
            variant="outlined"
            fullWidth
            sx={{ p: 4, borderWidth: 2, borderColor: (theme) => theme.palette.secondary.main, }}
            disabled={isSubmitting}
            loading={isSubmitting}
            onMouseDown={(event) => {
              event.preventDefault()
              console.log('.?')
            }}>
            <Typography variant="h4">?123</Typography>
          </LoadingButton>
          {
            (inputType === "email" ? keyTextFourthLineEmail : keyTextFourthLineText).map((row, index) => {
              return (
                <LoadingButton
                  key={index}
                  unselectable="on"
                  variant="outlined"
                  fullWidth
                  sx={{ p: 4, borderWidth: 2, borderColor: (theme) => theme.palette.secondary.main, width: index === 0 ? "500%" : undefined }}
                  type={row.value === "Enter" ? "submit" : undefined}
                  disabled={isSubmitting}
                  loading={row.value === "Enter" ? isSubmitting : undefined}
                  onMouseDown={(event) => {
                    event.preventDefault()
                    onButtonClick(row.value)
                  }}>
                  <Typography variant="h4">{isSubmitting ? "-" : getLabel(row.label)}</Typography>
                </LoadingButton>
              )
            })
          }
        </Grid>
      </>
    )
  }, [secondShift, shift, isSubmitting, inputType])


  return (
    <Box sx={{ my: 2 }}>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} md={(inputType === "email") ? 10 : 12}>
            <Grid container spacing={2}>

              {(inputType === "number" || openNumber) && NumberLayout(handleButtonClick)}

              {(inputType !== "number" && !openNumber) && TextLayout(handleButtonClick)}
            </Grid>
          </Grid>
          {
            inputType === "email" && (
              <Grid item xs={12} md={2}>
                <Stack sx={{ placeContent: "space-evenly", height: "100%", gap: 2 }}>
                  <Box sx={{ width: "100%", height: "100%" }} >
                    <Button
                      variant="outlined"
                      sx={{ width: "100%", height: "100%", borderWidth: 2, borderColor: (theme) => theme.palette.secondary.main }}
                      onClick={() => setOpenNumber(true)}
                    >
                      <Typography variant="h4">123</Typography>
                    </Button>
                  </Box>
                  <Box sx={{ width: "100%", height: "100%" }} >
                    <Button
                      variant="outlined"
                      sx={{ width: "100%", height: "100%", borderWidth: 2, borderColor: (theme) => theme.palette.secondary.main }}
                      onClick={() => setOpenNumber(false)}
                    >
                      <Typography variant="h4">ABC</Typography>
                    </Button>
                  </Box>
                </Stack>
              </Grid>
            )
          }
        </Grid>
      </Box>
    </Box>
  )
})

export default memo(KeyboardWrapper)

const keyNumber = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  {
    label: <Iconify icon="fluent:backspace-16-regular" sx={{ transform: 'scale(2)' }} color="secondary.main" />,
    value: "Backspace"
  },
  { label: "0", value: "0" },
  {
    label: <Iconify icon="fluent:arrow-enter-left-20-filled" sx={{ transform: 'scale(2)' }} color="secondary.main" />,
    value: "Enter"
  }
]

const keyTextFirstLine = [
  { label: "q", value: "q" },
  { label: "w", value: "w" },
  { label: "e", value: "e" },
  { label: "r", value: "r" },
  { label: "t", value: "t" },
  { label: "y", value: "y" },
  { label: "u", value: "u" },
  { label: "i", value: "i" },
  { label: "o", value: "o" },
  { label: "p", value: "p" },
];

const keyTextSecondLine = [
  { label: "a", value: "a" },
  { label: "s", value: "s" },
  { label: "d", value: "d" },
  { label: "f", value: "f" },
  { label: "g", value: "g" },
  { label: "h", value: "h" },
  { label: "j", value: "j" },
  { label: "k", value: "k" },
  { label: "l", value: "l" },
]

const keyTextThirdLine = [
  { label: "z", value: "z" },
  { label: "x", value: "x" },
  { label: "c", value: "c" },
  { label: "v", value: "v" },
  { label: "b", value: "b" },
  { label: "n", value: "n" },
  { label: "m", value: "m" },
  {
    label: <Iconify icon="fluent:backspace-16-regular" sx={{ transform: 'scale(2)' }} color="secondary.main" />,
    value: "Backspace"
  },
]

const keyTextFourthLineEmail = [
  {
    label: <Iconify icon="fluent:backspace-16-regular" sx={{ transform: 'scale(2)' }} color="secondary.main" />,
    value: "Backspace"
  },
  { label: "@", value: "@" },
  { label: "+", value: "+" },
  { label: ".", value: "." },
  { label: "_", value: "_" },
  { label: "-", value: "-" },
  { label: "@gmail", value: "@gmail" },
  { label: "@yahoo", value: "@yahoo" },
  {
    label: <Iconify icon="fluent:arrow-enter-left-20-filled" sx={{ transform: 'scale(2)' }} color="secondary.main" />,
    value: "Enter"
  },
]

const keyTextFourthLineText = [
  { label: "space", value: " " },
  {
    label: <Iconify icon="fluent:arrow-enter-left-20-filled" sx={{ transform: 'scale(2)' }} color="secondary.main" />,
    value: "Enter"
  }
]
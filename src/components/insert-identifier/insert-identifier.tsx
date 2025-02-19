import { useRef, useState } from "react"
import { useWatch } from "react-hook-form"

import { Box, Divider, Stack, Typography, useTheme } from "@mui/material"

import { typography } from "src/theme/core"

import { RHFSwitch, RHFTextField } from "src/components/hook-form"
import { Keyboard } from "src/components/keyboard"
import { useTranslate } from "src/locales"
import { ErrorAlert } from "../error-alert"
import type { InsertIdentifierProps } from "./types"

const InsertIdentifier = ({ errorMessage }: InsertIdentifierProps) => {

  const valCitizenship = useWatch({ name: "citizenship" })

  const isForeign = valCitizenship === "WNA"

  const { t, onChangeLang } = useTranslate()

  const theme = useTheme()

  const [keyboardType, setKeyboardType] = useState(isForeign ? "text" : "numberOnly")

  const inputRef = useRef<any>({})

  return (
    <Stack gap={2}>
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          placeItems: "center",
          width: "fit-content",
          pl: 2,
          borderRadius: 1,
          bgcolor: theme.palette.secondary.light,
        }}
      >
        <Typography>WNI</Typography>
        <RHFSwitch
          name="citizenship"
          label="WNA"
          color="secondary.main"
          onClick={(event) => {
            const { checked } = (event.target as any)
            if (checked) {
              setKeyboardType("text")
              onChangeLang("en")
            }
            else {
              setKeyboardType("numberOnly")
              onChangeLang("id")
            }
          }}
        />
      </Box>

      <Typography variant="h4" textAlign="center">{isForeign ? t('appointment.input_your_passport') : t('appointment.input_your_nik')}</Typography>
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <RHFTextField
        id="nik"
        name="nik"
        placeholder={isForeign ? t("appointment.placeholder_input_passport") : t("appointment.placeholder_input_nik")}
        variant="filled"
        inputRef={(ref) => { inputRef.current.nik = ref }}
        inputProps={{
          style: {
            textAlign: "center",
            backgroundColor: theme.palette.background.paper,
            ...typography.h3
          }
        }}
      />
      <Divider />

      <Keyboard
        ref={inputRef.current}
        elementName="nik"
        inputType={keyboardType}
      />
    </Stack>
  )
}

export default InsertIdentifier

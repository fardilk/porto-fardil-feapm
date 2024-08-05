import { useRef, useState } from "react"

import { Stack, Divider, useTheme, Typography } from "@mui/material"

import { typography } from "src/theme/core"

import { Keyboard } from "src/components/keyboard"
import { RHFTextField } from "src/components/hook-form"
import { useTranslate } from "src/locales"

const InsertEmail = () => {

  const theme = useTheme()
  const [elementName, setElementName] = useState("email")
  const [keyboardType, setKeyboardType] = useState("email")

  const inputRef = useRef<any>({})
  const {t} = useTranslate()

  return (
    <Stack gap={2}>
      <Typography variant="h4" textAlign="center">{t("registration.subtitle.input_your_email")}</Typography>
      <RHFTextField
        id="email"
        name="email"
        placeholder={t("registration.subtitle.input_your_email")}
        variant="filled"
        onClick={() => {
          setElementName("email")
          setKeyboardType("email")
        }}
        inputRef={(ref) => { inputRef.current.email = ref }}
        inputProps={{
          style: {
            textAlign: "center",
            backgroundColor: theme.palette.background.paper,
            ...typography.h3
          }
        }}
      />
      <Divider />

      {
        elementName && (
          <Keyboard
            ref={inputRef.current}
            elementName={elementName}
            inputType={keyboardType}
          />
        )
      }
    </Stack>
  )
}

export default InsertEmail

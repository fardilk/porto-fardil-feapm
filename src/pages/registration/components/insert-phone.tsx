import { useRef, useState } from "react"

import { Stack, Divider, useTheme, Typography } from "@mui/material"

import { typography } from "src/theme/core"

import { Keyboard } from "src/components/keyboard"
import { RHFTextField } from "src/components/hook-form"
import { useTranslate } from "src/locales"

const InsertPhone = () => {

  const theme = useTheme()
  const [elementName, setElementName] = useState("phone")
  const [keyboardType, setKeyboardType] = useState("number")

  const inputRef = useRef<any>({})
  const {t} = useTranslate()

  return (
    <Stack gap={2}>
      <Typography variant="h4" textAlign="center">{t("registration.subtitle.input_your_phone")}</Typography>
      <RHFTextField
        id="phone"
        name="phone"
        placeholder={t("registration.subtitle.input_your_phone")}
        variant="filled"
        onClick={() => {
          setElementName("phone")
          setKeyboardType("number")
        }}
        inputRef={(ref) => { inputRef.current.phone = ref }}
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

export default InsertPhone

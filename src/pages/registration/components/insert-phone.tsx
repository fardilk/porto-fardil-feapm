import { useRef, useState } from "react"

import { Stack, Divider, useTheme, Typography } from "@mui/material"

import { typography } from "src/theme/core"

import { Keyboard } from "src/components/keyboard"
import { RHFTextField } from "src/components/hook-form"

const InsertPhone = () => {

  const theme = useTheme()
  const [elementName, setElementName] = useState("phone")
  const [keyboardType, setKeyboardType] = useState("number")

  const inputRef = useRef<any>({})

  return (
    <Stack gap={2}>
      <Typography variant="h4" textAlign="center">Masukkan Nomor Telepon Anda</Typography>
      <RHFTextField
        id="phone"
        name="phone"
        placeholder="Masukkan Nomor Telepon Anda"
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
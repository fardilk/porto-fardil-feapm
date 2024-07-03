import { Divider, Stack, Typography, useTheme } from "@mui/material"
import { useRef, useState } from "react"
import { RHFTextField } from "src/components/hook-form"
import { Keyboard } from "src/components/keyboard"
import { typography } from "src/theme/core"

const InsertEmail = () => {

  const theme = useTheme()
  const [elementName, setElementName] = useState("email")
  const [keyboardType, setKeyboardType] = useState("email")

  const inputRef = useRef<any>({})

  return (
    <Stack gap={2}>
      <Typography variant="h4" textAlign="center">Masukkan Email Anda</Typography>
      <RHFTextField
        id="email"
        name="email"
        placeholder="Masukkan Email Anda"
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
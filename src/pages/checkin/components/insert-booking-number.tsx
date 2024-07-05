import { Divider, Stack, Typography, useTheme } from "@mui/material"
import { useRef, useState } from "react"
import { RHFTextField } from "src/components/hook-form"
import { Keyboard } from "src/components/keyboard"
import { typography } from "src/theme/core"

const InsertBookingNumber = () => {

  const theme = useTheme()
  const [elementName, _setElementName] = useState("nik")
  const [keyboardType, _setKeyboardType] = useState("number")

  const inputRef = useRef<any>({})

  return (
    <Stack gap={2}>

      <Typography variant="h4" textAlign="center">Masukkan/Scan Nomor Booking Anda</Typography>
      <RHFTextField
        id="nik"
        name="nik"
        placeholder={"Masukkan Nomor Booking Anda"}
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

export default InsertBookingNumber
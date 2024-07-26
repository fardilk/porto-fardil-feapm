import { Divider, Stack, Typography, useTheme } from "@mui/material"
import { useRef } from "react"
import { RHFTextField } from "src/components/hook-form"
import { Keyboard } from "src/components/keyboard"
import { usePartialState } from "src/hooks"
import { typography } from "src/theme/core"

const InsertEmployeeNumber = () => {

  const theme = useTheme()
  const inputRef = useRef<any>({})

  const [{ elementName, keyboardType }, setPartialState] = usePartialState({ elementName: "employeeNumber", keyboardType: "numberOnly" })

  return (
    <Stack gap={2}>
      <Typography variant="h4" textAlign="center" gutterBottom>Masukan Nomor Karyawan Anda</Typography>

      <RHFTextField
        name="employeeNumber"
        placeholder="Masukan Nomor Karyawan Anda"
        variant="filled"
        inputRef={(ref) => { inputRef.current.employeeNumber = ref }}
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

export default InsertEmployeeNumber
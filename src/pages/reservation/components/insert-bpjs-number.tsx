import { Divider, Stack, Typography, useTheme } from "@mui/material"
import { useRef } from "react"
import { RHFTextField } from "src/components/hook-form"
import { Keyboard } from "src/components/keyboard"
import { usePartialState } from "src/hooks"
import { typography } from "src/theme/core"

const InsertBPJSNumber = () => {

  const theme = useTheme()
  const inputRef = useRef<any>({})

  const [{ elementName, keyboardType }, setPartialState] = usePartialState({ elementName: "bpjsNumber", keyboardType: "numberOnly" })

  return (
    <Stack gap={2}>
      <Typography variant="h4" textAlign="center" gutterBottom>Masukan Nomor Kartu BPJS</Typography>

      <RHFTextField
        name="bpjsNumber"
        placeholder="Masukan Nomor Kartu BPJS"
        variant="filled"
        inputRef={(ref) => { inputRef.current.bpjsNumber = ref }}
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

export default InsertBPJSNumber
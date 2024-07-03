import { Box, Divider, Stack, Typography, useTheme } from "@mui/material"
import { useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { RHFSwitch, RHFTextField } from "src/components/hook-form"
import { Keyboard } from "src/components/keyboard"
import { typography } from "src/theme/core"


const InsertNIK = () => {

  const { watch } = useFormContext()
  const isForeign = watch("citizenship")

  const theme = useTheme()
  const [elementName, setElementName] = useState("nik")
  const [keyboardType, setKeyboardType] = useState(isForeign ? "text" : "number")

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
            const checked = (event.target as any).checked
            if (checked) setKeyboardType("text"); else setKeyboardType("number")
          }}
        />
      </Box>

      <Typography variant="h4" textAlign="center">{isForeign ? "Submit Your Passport" : "Masukkan NIK Anda"}</Typography>
      <RHFTextField
        id="nik"
        name="nik"
        placeholder={isForeign ? "Submit Your Passport Number" : "Masukkan 16 digit nomor NIK Anda"}
        variant="filled"
        inputRef={(ref) => { inputRef.current.nik = ref }}
        // onClick={() => {
        //   setElementName("nik")
        //   setKeyboardType("number")
        // }}
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

export default InsertNIK
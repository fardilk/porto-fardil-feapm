import { Divider, Stack, Typography, useTheme } from "@mui/material"
import { useRef } from "react"
import { RHFTextField } from "src/components/hook-form"
import { Keyboard } from "src/components/keyboard"
import { usePartialState } from "src/hooks"
import { useTranslate } from "src/locales"
import { typography } from "src/theme/core"

const InsertEmployeeNumber = () => {

  const theme = useTheme()
  const inputRef = useRef<any>({})
  const { t } = useTranslate();

  const [{ elementName, keyboardType }, setPartialState] = usePartialState({ elementName: "employeeNumber", keyboardType: "numberOnly" })

  return (
    <Stack gap={2}>
      <Typography variant="h4" textAlign="center" gutterBottom>{t('assurance.subtitle.enter_employee_number')}</Typography>

      <RHFTextField
        name="employeeNumber"
        placeholder={t('assurance.subtitle.enter_employee_number')}
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

import { useController, useFormContext } from "react-hook-form";
import type { TimePilsContainerProps } from "../time-pils/types";
import TimePilsContainer from "../time-pils/time-pils-container";
import { Box, Typography } from "@mui/material";

export type RHFTimePilsProps<T> = Omit<TimePilsContainerProps<T>, 'getIsSelected' | 'onClick'> & {
  getOptionEqualToValue: (option: T, value: T | null) => boolean
  name: string
  multiple?: boolean
  errorText?: string
  label?: string
}

export function RHFTimePils<T>(props: RHFTimePilsProps<T>) {
  const { name, options, multiple, errorText, label, getOptionEqualToValue, getOptionLabel } = props

  const { clearErrors, watch, setValue, control } = useFormContext()
  const { fieldState: { error } } = useController({ name, control })

  const value = watch(name)

  const isSelected = (option: T) => {

    if (multiple) {
      return value?.find((row: T) => getOptionEqualToValue(row, option))
    }

    return getOptionEqualToValue(option, value)
  }

  return (
    <Box>
      <Typography>{label}</Typography>
      <TimePilsContainer
        getIsSelected={(opt) => Boolean(isSelected(opt))}
        getOptionLabel={getOptionLabel}
        error={Boolean(error?.message)}
        onClick={(newValue) => {
          clearErrors(name)
          const isExist = isSelected(newValue)

          if (multiple) {
            if (isExist) {
              const newTempValue = value?.filter((row: T) => !getOptionEqualToValue(row, newValue))
              setValue(name, newTempValue)
            } else {
              const tempNewValue = [...value, newValue]
              setValue(name, tempNewValue)
            }
          } else {
            setValue(name, newValue)
          }
        }}
        options={options}
      />
      <Typography variant="caption" color="error.main"> {error?.message || errorText} </Typography>
    </Box>
  )
}

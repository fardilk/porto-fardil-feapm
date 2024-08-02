import type { ButtonProps } from "@mui/material";
import { Button } from "@mui/material"

export type TimePilsProps = ButtonProps & {
  selected?: boolean
  text?: string,
  error?: boolean
}

const TimePils = (props: TimePilsProps) => {
  const { selected, text, error, ...buttonProps } = props

  return (
    <Button
      size="small"
      color={error ? "error" : "secondary"}
      variant={selected ? 'contained' : 'outlined'}
      sx={{ borderWidth: '1px', borderRadius: 0.7, ...buttonProps?.sx }}
      {...buttonProps}
    >
      {text}
    </Button>
  )
}

export default TimePils

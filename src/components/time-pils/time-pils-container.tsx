import { Box } from "@mui/material"
import TimePils from "./time-pils"
import { TimePilsContainerProps } from "./types"

const TimePilsContainer = <T,>(props: TimePilsContainerProps<T>) => {
  const { options, getIsSelected, getOptionLabel, onClick } = props

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {
        options.map((row, index) => {
          return (
            <TimePils
              key={index}
              text={getOptionLabel(row)}
              onClick={() => onClick(row)}
              selected={getIsSelected(row)}
            />
          )
        })
      }
    </Box>
  )
}

export default TimePilsContainer
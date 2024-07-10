import { Box, Typography } from "@mui/material"
import { Iconify } from "../iconify"
import type { AlertInformationProps } from "./types"

const AlertInformation = (props: AlertInformationProps) => {
  const { body, icon, title } = props

  return (
    <Box sx={{ display: "flex", placeItems: "center", gap: 3 }}>
      <Iconify icon={icon ?? "icon-park-solid:check-one"} color="success.main" sx={{ width: 32, transform: 'scale(2.5)' }} />
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h4" color="secondary.main">{body}</Typography>
      </Box>
    </Box>
  )
}

export default AlertInformation
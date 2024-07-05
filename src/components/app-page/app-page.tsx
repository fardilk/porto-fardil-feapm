import { Box } from "@mui/material"
import type { ReactNode } from "react"
import { Header_Height } from "src/utils/variables"

const AppPage = ({ children }: { children?: ReactNode }) => {

  return (
    <Box sx={{ height: `calc(100vh - ${Header_Height}px)`, py: 2, overflowY: "scroll" }}>
      {children}
    </Box>
  )
}

export default AppPage
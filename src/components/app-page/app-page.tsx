import { Box } from "@mui/material"
import type { ReactNode } from "react"
import { Header_Height } from "src/utils/variables"

const AppPage = ({ children }: { children?: ReactNode }) => {

  return (
    <Box sx={{ height: `calc(100vh - ${Header_Height}px)`, overflowY: "auto", display: "flex", placeItems: "center", placeContent: "center", }}>
      <Box sx={{ width: '100%', }}>
        {children}
      </Box>
    </Box>
  )
}

export default AppPage
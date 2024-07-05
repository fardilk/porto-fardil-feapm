import { Outlet } from "react-router"

import { Box } from "@mui/material"

import { Header_Height } from "src/utils/variables"

import Header from "./header"

const AppLayout = () => {

  return (
    <Box sx={{ bgcolor: ({ palette }) => palette.secondary.darker, height: '100vh' }}>
      <Header />
      <Box sx={{ height: `calc(100vh - ${Header_Height}px)` }}>
        <Outlet />
      </Box>
      <div id="keyboard" />
    </Box>
  )
}

export default AppLayout
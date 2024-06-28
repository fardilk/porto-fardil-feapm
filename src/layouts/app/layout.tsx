import { Outlet } from "react-router"

import { Box } from "@mui/material"

import Header from "./header"

const AppLayout = () => {

  return (
    <Box sx={{ bgcolor: ({ palette }) => palette.secondary.darker, minHeight: '100vh' }}>
      <Header />
      <Outlet />
    </Box>
  )
}

export default AppLayout
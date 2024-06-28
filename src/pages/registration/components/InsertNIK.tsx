import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import { Iconify } from "src/components/iconify"
import { CloseIcon } from "yet-another-react-lightbox"

const InsertNIK = () => {

  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.grey[300], borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Iconify icon="solar:alt-arrow-left-line-duotone" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Masukkan NIK
          </Typography>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>


    </Box>
  )
}

export default InsertNIK
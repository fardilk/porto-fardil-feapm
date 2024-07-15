import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import { useMemo, type ReactNode } from "react"
import { CloseIcon } from "yet-another-react-lightbox"
import { Iconify } from "src/components/iconify"

type WindowContainerProps = {
  title: string,
  handleBackNavigation?: () => void,
  handleCloseNavigation?: () => void,
  children?: ReactNode
  hideBackNavigation?: boolean;
  hideCloseNavigation?: boolean
  size?: "medium" | "large" | "superLarge"
}

const WindowContainer = (props: WindowContainerProps) => {
  const { title, children, size = "medium", hideBackNavigation, hideCloseNavigation, handleBackNavigation, handleCloseNavigation } = props

  const containerWidth = useMemo(() => {
    if (size === "medium") {
      return { xs: "90%", md: "65%", lg: "55%" }
    }

    if (size === "superLarge") {
      return { xs: "90%", md: "85%", lg: "75%" }
    }

    return { xs: "90%", md: "70%", lg: "65%" }
  }, [size])

  return (
    <Box sx={{ display: "flex", placeContent: "center", px: 4, width: "100%" }}>
      <Box sx={{ width: containerWidth, bgcolor: (theme) => theme.palette.background.paper, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
        <AppBar position="sticky" sx={{ bgcolor: (theme) => theme.palette.grey[300], borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
          <Toolbar>
            {
              !hideBackNavigation && (
                <IconButton
                  size="large"
                  edge="start"
                  sx={{ mr: 2 }}
                  onClick={handleBackNavigation}
                >
                  <Iconify icon="solar:alt-arrow-left-line-duotone" />
                </IconButton>
              )
            }
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            {
              !hideCloseNavigation && (
                <IconButton onClick={handleCloseNavigation}>
                  <CloseIcon />
                </IconButton>
              )
            }
          </Toolbar>
        </AppBar>

        {children}

      </Box>
    </Box>
  )
}

export default WindowContainer
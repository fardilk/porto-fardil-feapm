import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { useMemo, type ReactNode } from "react"
import { useTranslate } from "src/locales"

type WindowContainerProps = {
  title: string,
  handleBackNavigation?: () => void,
  handleCloseNavigation?: () => void,
  children?: ReactNode
  hideBackNavigation?: boolean;
  hideCloseNavigation?: boolean
  size?: "medium" | "large" | "superLarge" | "superSmall"
}

const WindowContainer = (props: WindowContainerProps) => {
  const { title, children, size = "superLarge", hideBackNavigation, hideCloseNavigation, handleBackNavigation, handleCloseNavigation } = props
  const { t } = useTranslate()

  const containerWidth = useMemo(() => {
    if (size === "medium") {
      return { xs: "90%", md: "65%", lg: "55%" }
    }

    if (size === "superLarge") {
      return { xs: "90%", md: "95%", lg: "85%" }
    }

    if (size === "superSmall") {
      return { xs: "40%", md: "20%", lg: "10%" }
    }

    return { xs: "90%", md: "70%", lg: "65%" }
  }, [size])

  return (
    <Box sx={{ display: "flex", placeContent: "center", px: 4, width: "100%", maxHeight: '80vh' }}>
      <Box sx={{ width: containerWidth, overflowY: "auto", bgcolor: (theme) => theme.palette.background.paper, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
        <AppBar position="sticky" sx={{ bgcolor: (theme) => theme.palette.grey[300], borderTopLeftRadius: 8, borderTopRightRadius: 8, top: 0 }}>
          <Toolbar>
            {
              !hideBackNavigation && (
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: (theme) => theme.palette.grey[400],
                    color: "black",
                    mr: 2
                  }}
                  onClick={handleBackNavigation}
                >
                  {t("global.back")}
                </Button>
              )
            }
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            {
              !hideCloseNavigation && (
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: (theme) => theme.palette.grey[400],
                    color: "black"
                  }}
                  onClick={handleCloseNavigation}
                >
                  {t("global.cancel")}
                </Button>
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

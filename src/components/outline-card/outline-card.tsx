import { CardContentProps, SxProps, Theme, Card, CardContent, useTheme, CardProps } from "@mui/material";
import { ReactNode } from "react";

const OutlineCard = ({
  cardHeader,
  children,
  sx,
  cardContentProps,
  cardProps
}: {
  cardHeader?: ReactNode
  children?: any,
  sx?: SxProps<Theme>,
  cardContentProps?: CardContentProps
  cardProps?: CardProps
}) => {

  const theme = useTheme()

  const styles = {
    boxShadow: 0,
    borderWidth: 2,
    borderColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[300]
  }

  return (
    <Card variant="outlined" {...cardProps} sx={{ borderRadius: 1, ...sx, ...styles }} >
      {cardHeader}
      <CardContent
        {...cardContentProps}
        sx={{
          p: 1,
          "&:last-child": {
            paddingBottom: 1
          },
          ...cardContentProps?.sx
        }}
      >
        {children}
      </CardContent>
    </Card>
  )
}
export default OutlineCard

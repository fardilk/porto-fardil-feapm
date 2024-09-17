import { Box, ButtonBase, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { Iconify } from "../iconify";
import type { ButtonBaseOverrideProps, CardBannerContentCardProps, CardBannerProps } from "./types";

export const ButtonBaseOverride = ({ clickable, onClick, children, disabled }: ButtonBaseOverrideProps & { children?: ReactNode }) => {

  if (clickable) {
    return (
      <ButtonBase onClick={onClick} sx={{ width: '100%', height: '100%' }} disabled={disabled}>
        {children}
      </ButtonBase>
    )
  }

  return children
}

export const HorizontalItem = (props: CardBannerContentCardProps) => {
  const { body, bodyProps, icon, localIcon, title, titleProps, iconProps } = props
  return (
    <List>
      <ListItem>
        <ListItemIcon><Iconify icon={icon} localIcon={localIcon} sxIcon={{ width: 52, ...iconProps?.sx }}  {...iconProps} /></ListItemIcon>
        <ListItemText
          primary={<Typography variant="h5" color="secondary.dark" {...titleProps}>{title}</Typography>}
          secondary={<Typography color="grey" {...bodyProps}>{body}</Typography>}
        />
      </ListItem>
    </List>
  )
}

export const VerticalItem = (props: CardBannerContentCardProps) => {
  const { body, bodyProps, icon, title, localIcon, titleProps, iconProps } = props

  return (
    <CardContent>
      <Box sx={{ display: "flex", placeContent: "center", mb: 2 }} >
        <Iconify icon={icon} localIcon={localIcon} sxIcon={{ width: 52, ...iconProps?.sx }} {...iconProps} />
      </Box>
      <Typography variant="h5" color="secondary.dark" textAlign="center" {...titleProps}>{title}</Typography>
      <Typography color="grey" textAlign="center" {...bodyProps}>{body}</Typography>
    </CardContent>
  )
}

const CardBanner = (props: CardBannerProps) => {
  const { cardProps, clickable, onClick, orientation = "horizontal", disabled, ...contentProps } = props

  return (
    <ButtonBaseOverride clickable={clickable} onClick={onClick} disabled={disabled}>
      <Card {...cardProps} sx={{ height: "100%", width: '100%', alignItems: "center", bgcolor: disabled ? (theme) => theme.palette.grey[300] : undefined, ...cardProps?.sx }}>
        {
          orientation === "horizontal" && <HorizontalItem {...contentProps} />
        }
        {
          orientation === "vertical" && <VerticalItem {...contentProps} />
        }
      </Card>
    </ButtonBaseOverride>
  )
}

export default CardBanner

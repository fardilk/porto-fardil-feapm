import { Card, CardProps, List, ListItem, ListItemIcon, ListItemText, Typography, TypographyProps } from "@mui/material"
import { Image } from "../image"

export type ItemCardProps = {
  icon?: string,
  title?: string,
  body?: string,
  cardProps?: CardProps,
  titleProps?: TypographyProps,
  bodyProps?: TypographyProps
}

const ItemCard = (props: ItemCardProps) => {
  const { bodyProps, cardProps, titleProps, body, title, icon } = props

  return (
    <Card {...cardProps} sx={{ height: "100%", alignItems: "center", ...cardProps?.sx }}>
      <List>
        <ListItem>
          <ListItemIcon><Image src={icon} /></ListItemIcon>
          <ListItemText
            primary={<Typography variant="h5" color="secondary.dark" {...titleProps}>{title}</Typography>}
            secondary={<Typography color="grey" {...bodyProps}>{body}</Typography>}
          />
        </ListItem>
      </List>
    </Card>
  )
}

export default ItemCard
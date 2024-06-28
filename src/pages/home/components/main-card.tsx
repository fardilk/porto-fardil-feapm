import { ButtonBase, Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { Image } from "src/components/image"
import { MainCardType } from "../model/types"


const MainCard = (props: MainCardType) => {
  const { icon, body, title, handleClick } = props

  return (
    <ButtonBase sx={{ height: "100%" }} onClick={handleClick}>
      <Card sx={{ height: "100%", alignItems: "center" }}>
        <List>
          <ListItem>
            <ListItemIcon><Image src={icon} /></ListItemIcon>
            <ListItemText primary={<Typography variant="h5" color="secondary.dark">{title}</Typography>} secondary={body} />
          </ListItem>
        </List>
      </Card>
    </ButtonBase>
  )
}

export default MainCard
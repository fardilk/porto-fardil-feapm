import { Box, Grid } from "@mui/material"
import { SelectEncounterTypeProps } from "../model/types"
import { ItemCard } from "src/components/item-card"

const SelectEncounterType = (props: SelectEncounterTypeProps) => {
  const { items } = props

  return (
    <Grid container spacing={2}>
      {
        items.map((row, index) => {
          return (
            <Grid item xs={12} md={3} key={index}>
              <ItemCard {...row} cardProps={{ variant: 'outlined' }} clickable orientation="vertical" />
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default SelectEncounterType
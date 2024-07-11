import { Grid } from "@mui/material"
import { CardBanner } from "src/components/card-banner"
import type { SelectEncounterTypeProps } from "../model/types"

const SelectEncounterType = (props: SelectEncounterTypeProps) => {
  const { items } = props

  return (
    <Grid container spacing={2}>
      {
        items.map((row, index) => {
          return (
            <Grid item xs={12} md={3} key={index}>
              <CardBanner
                {...row}
                cardProps={{ variant: 'outlined' }}
                iconProps={{ sx: { width: 68 } }}
                clickable
                orientation="vertical"
              />
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default SelectEncounterType
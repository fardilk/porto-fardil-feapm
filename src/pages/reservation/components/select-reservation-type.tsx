import { Grid } from "@mui/material"
import { CardBanner } from "src/components/card-banner"
import type { SelectReservationTypeProps } from "../model/types"
import { useEffect } from "react"
import { getGridLayoutMappedValue } from "src/utils/helper"

const SelectReservationType = (props: SelectReservationTypeProps) => {
  const { items, handleResetReservationType } = props

  useEffect(() => {
    handleResetReservationType()
  }, [handleResetReservationType])

  const md = getGridLayoutMappedValue(3)

  return (
    <Grid container spacing={2}>
      <Grid item xs={0} md={md} />
      {
        items.map((row, index) => {
          return (
            <Grid item xs={12} md={md} key={index}>
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

export default SelectReservationType

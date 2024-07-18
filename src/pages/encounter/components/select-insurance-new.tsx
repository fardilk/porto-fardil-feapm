import { Grid, Stack } from "@mui/material"
import { CardBanner } from "src/components/card-banner"
import { SelectInsuranceNewProps } from "../model/types"

const SelectInsuranceNew = (props: SelectInsuranceNewProps) => {
  const { handleSelect } = props

  return (
    <Stack>

      <Grid container spacing={2}>

        {
          listInsurance.map((row, index) => {

            return (
              <Grid item xs={12} md={4} key={index}>
                <CardBanner
                  clickable
                  localIcon="asuransi"
                  title={row.label}
                  cardProps={{ variant: "outlined" }}
                  onClick={handleSelect}
                />
              </Grid>
            )
          })
        }
      </Grid>

    </Stack>
  )
}

export default SelectInsuranceNew

const listInsurance = [
  { label: "Allianz Life Insurance" },
  { label: "AIA Insurance" },
  { label: "BRI Insurance" },
  { label: "AXA Insurance Indonesia" },
  { label: "Asuransi Jiwa Astra" },
  { label: "Chubb Life Insurance" },
  { label: "Manulife Indonesia" },
  { label: "Prudential Life Assurance" },
  { label: "Asuransi Sinar Mas" },
]
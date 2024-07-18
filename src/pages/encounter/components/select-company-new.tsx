import { Grid, Stack } from "@mui/material"
import { CardBanner } from "src/components/card-banner"
import { SelectCompanyNewProps } from "../model/types"

const SelectCompanyNew = (props: SelectCompanyNewProps) => {
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

export default SelectCompanyNew

const listInsurance = [
  { label: "PT PLN" },
  { label: "PT Pertamina" },
  { label: "PT Sismedika" },
  { label: "PT AXA Insurance Indonesia" },
  { label: "PT Asuransi Jiwa Astra" },
  { label: "PT Chubb Life Insurance" },
  { label: "PT Manulife Indonesia" },
  { label: "PT Prudential Life Assurance" },
  { label: "PT Asuransi Sinar Mas" },
]
import { Grid } from "@mui/material"
import { CardBannerProfile } from "src/components/card-banner"

const SelectPractitioner = () => {

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <CardBannerProfile
            heathcareServiceName="test"
            count="20/30"
            name="dr. Liliana Hana Sp.M"
            // icon="healthicons:doctor"
            slots="aaa"
          />
        </Grid>
      </Grid>
    </>
  )
}

export default SelectPractitioner
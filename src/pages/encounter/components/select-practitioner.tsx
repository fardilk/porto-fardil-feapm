import { Grid } from "@mui/material"
import PractitionerHealthcareServiceCard from "src/components/practitioner/practitioner-healthcare-service-card"

const SelectPractitioner = () => {

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <PractitionerHealthcareServiceCard
            heathcareServiceName="test"
            patientTotal="test a"
            practitionerName="name"
            slots="aaa"
          />
        </Grid>
      </Grid>
    </>
  )
}

export default SelectPractitioner
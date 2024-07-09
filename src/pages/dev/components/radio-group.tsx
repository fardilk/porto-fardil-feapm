import { Grid, Typography } from "@mui/material"
import { RHFRadioGroup } from "src/components/hook-form"

const RadioGroup = () => {

  const options = [
    { label: "Pindah Jadwal", value: "pindah_jadwal" },
    { label: "Batal Kunjungan", value: "batal_kunjungan" },
  ]

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <Typography variant="subtitle2">Radio Group</Typography>
      </Grid>
      <Grid item xs={12} md={9}>
        <RHFRadioGroup
          row
          disableOutline
          name="radioGroup"
          options={options}
        />
      </Grid>
    </Grid>
  )
}

export default RadioGroup
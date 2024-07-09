import { Button, Grid } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { RHFTimePils } from "src/components/hook-form"
import { TimePils } from "src/components/time-pils"
import TimePilsContainer from "src/components/time-pils/time-pils-container"

const TimePilsComponent = () => {

  const methods = useFormContext()

  const options = [
    {
      label: "10:00",
      value: "huruf_a"
    },
    {
      label: "11:30",
      value: "huruf_b"
    },
    {
      label: "12:45",
      value: "huruf_c"
    }
  ]

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TimePils text="TimePils Text Unselected" />
      </Grid>
      <Grid item xs={12}>
        <TimePils text="TimePils Text Selected" selected />
      </Grid>
      <Grid item xs={12}>
        <TimePilsContainer
          options={options}
          getIsSelected={(_opt) => false}
          getOptionLabel={(opt) => opt.label}
          onClick={(option) => console.log(option)}
        />
      </Grid>
      <Grid item xs={12}>
        <RHFTimePils
          options={options}
          getOptionEqualToValue={(opt, value) => opt.value === value?.value}
          getOptionLabel={(opt) => opt.label}
          name="timePils"
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="soft" fullWidth onClick={() => methods.setError("timePils", { message: "Isi yang bener" })}>Submit</Button>
      </Grid>
    </Grid>
  )
}

export default TimePilsComponent
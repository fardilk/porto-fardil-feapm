
import { Grid } from "@mui/material"
import { type FC, useMemo } from "react"
import { CardBanner } from "src/components/card-banner"
import type { CardBannerProps } from "src/components/card-banner/types"
import type { SelectRegistrationMethodProps } from "../model/types"

const SelectRegistrationMethod : FC<SelectRegistrationMethodProps> = ({handleByAnjungan, handleByPhone}) => {

  const registrationMethod : CardBannerProps[] = useMemo(() => [{
    title: "Melalui Ponsel Anda",
    body: "Pendaftaran profile baru dengan melalui ponsel anda",
    localIcon: "phone",
    onClick: handleByPhone
  },
  {
    title: "Melalui Anjungan",
    body: "Pendaftaran profile baru melalui anjungan ini",
    localIcon: "apm",
    onClick: handleByAnjungan
  }],[handleByAnjungan, handleByPhone])

  return (
    <Grid container spacing={2}>
        {registrationMethod.map((option, index) => (
            <Grid item xs={12} md={6} key={index}>
              <CardBanner {...option} cardProps={{ sx: { py: 4 }, variant: "outlined" }} clickable onClick={option.onClick} />
            </Grid>
        ))}
    </Grid>
  )
}

export default SelectRegistrationMethod


import { Grid } from "@mui/material"
import { type FC, useMemo } from "react"
import { CardBanner } from "src/components/card-banner"
import type { CardBannerProps } from "src/components/card-banner/types"
import type { SelectRegistrationMethodProps } from "../model/types"
import { useTranslate } from "src/locales"

const SelectRegistrationMethod : FC<SelectRegistrationMethodProps> = ({handleByAnjungan, handleByPhone}) => {

  const {t} = useTranslate()

  const registrationMethod : CardBannerProps[] = useMemo(() => [{
    title: t("registration.via_phone"),
    body: t("registration.via_phone_desc"),
    localIcon: "phone",
    onClick: handleByPhone
  },
  {
    title: t("registration.via_platform"),
    body: t("registration.via_platform_desc"),
    localIcon: "apm",
    onClick: handleByAnjungan
  }],[handleByAnjungan, handleByPhone, t])

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

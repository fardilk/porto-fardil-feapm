import { Grid } from "@mui/material"
import { useMemo, useState } from "react"
import { CardBanner } from "src/components/card-banner"
import type { CardBannerProps } from "src/components/card-banner/types"
import { useTranslate } from "src/locales"
import type { PaymentMethodProps } from "../model/types"

const PaymentMethod = (props: PaymentMethodProps) => {
  const { handleAssurance, handleGeneral, reservationType } = props

  const [openAssurance, setOpenAssurance] = useState(false)
  const { t } = useTranslate()

  const paymentMethod: CardBannerProps[] = useMemo(() => [
    {
      title: t("appointment.payment.general.title"),
      body: t("appointment.payment.general.description"),
      localIcon: "pembayaran-umum",
      onClick: () => { handleGeneral() }
    },
    {
      title: t("appointment.payment.assurance.title"),
      body: t("appointment.payment.assurance.description"),
      localIcon: "jaminan",
      onClick: () => { setOpenAssurance(true) },
    }
  ], [t, handleGeneral, setOpenAssurance])

  const assurancePaymentMethod: CardBannerProps[] = useMemo(() => [
    // ...reservationType === "RJ" ? [{
    //   title: t("appointment.payment.assurance.bpjs.title"),
    //   body: t("appointment.payment.assurance.bpjs.description"),
    //   localIcon: "bpjs",
    //   onClick: () => { handleAssurance("bpjs") }
    // }] : [],
    {
      title: t("appointment.payment.assurance.insurance.title"),
      body: t("appointment.payment.assurance.insurance.description"),
      localIcon: "asuransi",
      onClick: () => { handleAssurance("insurance") }
    },
    {
      title: t("appointment.payment.assurance.company.title"),
      body: t("appointment.payment.assurance.company.description"),
      localIcon: "perusahaan",
      onClick: () => { handleAssurance("company") }
    },
  ], [t, handleAssurance, reservationType])

  return (
    <Grid container spacing={2}>
      {
        !openAssurance && paymentMethod.map((row, index) => {

          return (
            <Grid item xs={12} md={6} key={index}>
              <CardBanner {...row} cardProps={{ sx: { py: 4 }, variant: "outlined" }} clickable onClick={row.onClick} />
            </Grid>
          )
        })
      }

      {
        openAssurance && assurancePaymentMethod.map((row, index) => {

          return (
            <Grid item xs={12} md={12 / assurancePaymentMethod.length} key={index}>
              <CardBanner {...row} cardProps={{ sx: { py: 4 }, variant: "outlined" }} clickable onClick={row.onClick} />
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default PaymentMethod

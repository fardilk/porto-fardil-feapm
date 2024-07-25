import { Grid } from "@mui/material"
import { useState } from "react"
import { CardBanner } from "src/components/card-banner"
import type { CardBannerProps } from "src/components/card-banner/types"
import type { PaymentMethodProps } from "../model/types"

const PaymentMethod = (props: PaymentMethodProps) => {
  const { handleAssurance, handleGeneral, encounterType } = props

  const [openAssurance, setOpenAssurance] = useState(false)

  const [paymentMethod, _setPaymentMethod] = useState<CardBannerProps[]>([
    {
      title: "UMUM",
      body: "Pendaftaran Pasien Umum",
      localIcon: "pembayaran-umum",
      onClick: () => { handleGeneral() }
    },
    {
      title: "JAMINAN",
      body: "Pendaftaran Pasien dengan Jaminan Asuransi, Perusahaan atau BPJS",
      localIcon: "jaminan",
      onClick: () => { setOpenAssurance(true) }
    }
  ])

  const [assurancePaymentMethod, _setAssurancePaymentMethod] = useState<CardBannerProps[]>([
    ... encounterType === "RJ" ? [{
      title: "BPJS",
      body: "Pendaftaran Pasien BPJS",
      localIcon: "bpjs",
      onClick: () => { handleAssurance("bpjs") }
    }] : [],
    {
      title: "Asuransi",
      body: "Pendaftaran pasien asuransi",
      localIcon: "asuransi",
      onClick: () => { handleAssurance("insurance") }
    },
    {
      title: "Perusahaan",
      body: "Pendaftaran pasien asuransi perusahaan",
      localIcon: "perusahaan",
      onClick: () => { handleAssurance("company") }
    },
  ])

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
            <Grid item xs={12} md={12/assurancePaymentMethod.length} key={index}>
              <CardBanner {...row} cardProps={{ sx: { py: 4 }, variant: "outlined" }} clickable onClick={row.onClick} />
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default PaymentMethod

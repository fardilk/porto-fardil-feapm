import { Grid } from "@mui/material"
import { useState } from "react"
import ItemCard, { ItemCardProps } from "src/components/item-card/item-card"
import { PaymentMethodProps } from "../model/types"

const PaymentMethod = (props: PaymentMethodProps) => {
  const { handleNext } = props

  const [paymentMethod, _setPaymentMethod] = useState<ItemCardProps[]>([
    {
      title: "UMUM",
      body: "Pendaftaran Pasien Umum",
      icon: "assets/app/icons/checkin-general.svg",
      onClick: () => { }
    },
    {
      title: "JAMINAN",
      body: "Pendaftaran Pasien dengan Jaminan Asuransi, Perusahaan atau BPJS",
      icon: "assets/app/icons/encounter-payment.svg",
      onClick: () => { }
    }
  ])

  return (
    <Grid container spacing={2}>
      {
        paymentMethod.map((row, index) => {

          return (
            <Grid item xs={12} md={6} key={index}>
              <ItemCard {...row} cardProps={{ sx: { py: 4 }, variant: "outlined" }} clickable onClick={() => {

                handleNext()
              }} />
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default PaymentMethod
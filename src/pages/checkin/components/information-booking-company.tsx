import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { AlertInformation } from "src/components/alert-information"
import { ItemCard } from "src/components/item-card"
import { LabelTextContainer } from "src/components/label-text"
import { LabelTextProps } from "src/components/label-text/types"
import { fDate } from "src/utils/format-time"
import { fAsterisk } from "src/utils/helper"

const InformationBookingInsurance = () => {

  const [headerData, _setHeaderData] = useState<LabelTextProps[]>([
    { title: "NIK", body: fAsterisk("100200300400") },
    { title: "Nama Lengkap", body: "Hello World" },
    { title: "Tanggal Lahir", body: fDate("04-05-2001", "DD-MM-YYYY") },
    { title: "No Telpon", body: fAsterisk("085157902550") },
    { title: "Golongan Darah", body: "B" },
    { title: "Rhesus", body: "Negatif" },
    { title: "Email", body: "helloworld@gmail.com" },
    { title: "Alamat", body: "Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan" },
  ])

  const [detailData, _setDetailData] = useState([
    { title: "Tujuan Layanan", body: "Poli Mata", icon: "assets/app/icons/checkin-poli.svg" },
    { title: "Dokter Pemeriksa", body: "dr. Inas Shabrina,Sp.M", icon: "assets/app/icons/checkin-doctor.svg" },
    { title: "Tipe Pembayaran", body: "Perusahaan", icon: "assets/app/icons/checkin-company.svg" },
    { title: "Waktu Pelayanan", body: "Senin, 30-01-2022 10:00-14:00", icon: "assets/app/icons/checkin-calendar.svg" },
  ])

  return (
    <Stack gap={4}>
      <AlertInformation
        title="Pendaftaran Anda telah kami terima."
        body="Silakan menuju ke counter jaminan untuk mengkonfirmasi benefit jaminan."
      />

      <Box>
        <Typography variant="h5" gutterBottom>Detail Pasien</Typography>

        <LabelTextContainer
          listText={headerData}
        />
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>Detail Kunjungan</Typography>

        <Grid container spacing={1}>
          {
            detailData.map((it, index) => {
              return (
                <Grid item xs={12} md={3}>
                  <ItemCard
                    key={index}
                    icon={it.icon}
                    cardProps={{ variant: "outlined" }}
                    body={it.body}
                    title={it.title}
                    titleProps={{ variant: "subtitle2", color: "grey" }}
                    bodyProps={{ variant: "subtitle2", color: "secondary.darker" }}
                  />
                </Grid>
              )
            })
          }
        </Grid>

      </Box>

      <Button variant="contained" color="secondary" size="large">Cetak Bukti Daftar</Button>
    </Stack>
  )
}

export default InformationBookingInsurance
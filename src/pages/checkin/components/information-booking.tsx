import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { AlertInformation } from "src/components/alert-information"
import { CardBanner } from "src/components/card-banner"
import { LabelTextContainer } from "src/components/label-text"
import type { LabelTextProps } from "src/components/label-text/types"
import { fDate } from "src/utils/format-time"
import { fAsterisk } from "src/utils/helper"

const InformationBooking = () => {

  const [headerData, _setHeaderData] = useState<LabelTextProps[]>([
    { title: "NIK", body: fAsterisk("100200300400") },
    { title: "Nama Lengkap", body: "Hello World" },
    { title: "Tanggal Lahir", body: fDate("04-05-2001", "DD-MM-YYYY") },
    { title: "No Telpon", body: fAsterisk("085157902550") },
    { title: "Email", body: "helloworld@gmail.com" },
    { title: "Alamat", body: "Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan", colSpan: 2 },
  ])

  const [detailData, _setDetailData] = useState([
    { title: "Tujuan Layanan", body: "Poli Mata", icon: "assets/app/icons/checkin-poli.svg" },
    { title: "Dokter Pemeriksa", body: "dr. Inas Shabrina,Sp.M", icon: "assets/app/icons/checkin-doctor.svg" },
    { title: "Tipe Pembayaran", body: "Umum", icon: "assets/app/icons/checkin-general.svg" },
    { title: "Waktu Pelayanan", body: "Senin, 30-01-2022 10:00-14:00", icon: "assets/app/icons/checkin-calendar.svg" },
  ])

  return (
    <Stack gap={4}>
      <AlertInformation
        title="Pendaftaran Anda telah kami terima."
        body="Silakan menuju ke nurse station untuk melaporkan kehadiran Anda."
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
                  <CardBanner
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

export default InformationBooking
import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { AlertInformation } from "src/components/alert-information"
import { CardBanner } from "src/components/card-banner"
import { LabelTextContainer } from "src/components/label-text"
import type { LabelTextProps } from "src/components/label-text/types"
import { fAsterisk } from "src/utils/helper"

const SuccessOutpatientGeneral = () => {

  const [detailData, _setDetailData] = useState<LabelTextProps[]>([
    { title: "NIK", body: fAsterisk("100200300400") },
    { title: "Nama Lengkap", body: "Anisa Redina" },
    { title: "Tempat, Tanggal Lahir", body: "Malaysia, 11-04-2000" },
    { title: "No Telpon", body: fAsterisk("085157902550") },
    { title: "Golongan Darah", body: "B" },
    { title: "Rhesus", body: "Negatif" },
    { title: "Email", body: "anisa@gmail.com" },
    { title: "Alamat", body: "Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan" },
  ])

  const listCard = [
    {
      title: "Tujuan Pelayanan",
      body: "Poli Mata",
      icon: "/assets/app/icons/home-registration.svg",
    },
    {
      title: "Dokter Pemeriksa",
      body: "dr. Inas Shabrina,Sp.M",
      icon: "/assets/app/icons/home-patient.svg",
    },
    {
      title: "Tipe Pembayaran",
      body: "Umum",
      icon: "/assets/app/icons/home-reservation.svg",
    },
    {
      title: "Waktu Pelayanan",
      body: "Senin, 30-01-2022, 10:00-14:00",
      icon: "/assets/app/icons/home-newuser.svg",
    },
  ]

  return (
    <Stack gap={4}>
      <AlertInformation
        title="Pendaftaran Anda telah kami terima."
        body="Silakan menuju ke poli Anda."
      />

      <Box>
        <Typography variant="h5" color="primary.darker" gutterBottom>Detail Pasien</Typography>
        <LabelTextContainer listText={detailData} />
      </Box>

      <Box>
        <Typography variant="h5" color="primary.darker" gutterBottom>Detail Kunjungan</Typography>
        <Grid container spacing={2}>
          {
            listCard.map((row, index) => {
              return (
                <Grid item xs={12} md={3} key={index}>
                  <CardBanner
                    key={index}
                    {...row}
                    cardProps={{ variant: "outlined" }}
                    titleProps={{ variant: "subtitle2", sx: { color: "grey" } }}
                    bodyProps={{ variant: "subtitle2", sx: { color: "primary.darker" } }}
                  />
                </Grid>
              )
            })
          }
        </Grid>
      </Box>

      <Box>
        <Button variant="contained" size="large" fullWidth color="secondary">Cetak Bukti Daftar</Button>
      </Box>
    </Stack>
  )
}

export default SuccessOutpatientGeneral
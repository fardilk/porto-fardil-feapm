import { useNavigate } from "react-router"

import { Box, Grid, Stack } from "@mui/material"

import { Header_Height } from "src/utils/variables"

import { CardBanner } from "src/components/card-banner"
import { Image } from "src/components/image"


const HomePage = () => {
  const navigate = useNavigate()

  const listCard = [
    {
      title: "CHECK-IN",
      body: "Siapkan Kode Booking yang sudah didapat melalui website booking online.",
      icon: "medical-checkup",
      handleClick: () => { navigate("checkin") }
    },
    {
      title: "KUNJUNGAN DOKTER",
      body: "Pendaftaran kunjungan pasien lama, siapkan nomor NIK.",
      icon: "doctor",
      handleClick: () => { navigate("encounter") }
    },
    {
      title: "RESERVASI",
      body: "Pesan jadwal kunjungan Anda, siapkan data-data Anda.",
      icon: "medical-appointment",
      handleClick: () => { navigate("reservation")}
    },
    {
      title: "REGISTRASI PASIEN BARU",
      body: "Registrasi Pasien Baru, siapkan data-data Anda.",
      icon: "health-insurance",
      handleClick: () => { navigate("registration") }
    },
  ]

  return (
    <Stack sx={{ px: 8, gap: 2, height: `calc(100vh - ${Header_Height}px)`, pb: 2 }}>
      <Image
        src="/assets/app/Banner-Medical-Check-Up-Primaya-Hospital.png"
        sx={{
          display: "block",
          mx: "auto",
          // height: `calc(100vh - ${Header_Height + height}px)`
        }} />

      <Box>
        <Grid container spacing={2}>
          {
            listCard.map((row, index) => {
              return (
                <Grid item xs={12} md={3} key={index}>
                  <CardBanner
                    key={index}
                    clickable
                    title={row.title}
                    body={row.body}
                    onClick={row.handleClick}
                    localIcon={row.icon}
                  />
                </Grid>
              )
            })
          }
        </Grid>
      </Box>
    </Stack>
  )
}

export default HomePage
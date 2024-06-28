import { useNavigate } from "react-router"

import { Grid, Stack } from "@mui/material"
import { Image } from "src/components/image"
import { MainCard } from "./components"

const HomePage = () => {
  const navigate = useNavigate()

  const listCard = [
    {
      title: "CHECK-IN",
      body: "Siapkan Kode Booking yang sudah didapat melalui website booking online.",
      icon: "/assets/app/icons/TM_136. Registration Report.svg",
      handleClick: () => { navigate("registration") }
    },
    {
      title: "KUNJUNGAN DOKTER",
      body: "Pendaftaran kunjungan pasien lama, siapkan nomor NIK.",
      icon: "/assets/app/icons/TM_173. Patient.svg",
      handleClick: () => { }
    },
    {
      title: "RESERVASI",
      body: "Pesan jadwal kunjungan Anda, siapkan data-data Anda.",
      icon: "/assets/app/icons/TM_136. Registration Report.svg",
      handleClick: () => { }
    },
    {
      title: "REGISTRASI PASIEN BARU",
      body: "Registrasi Pasien Baru, siapkan data-data Anda.",
      icon: "/assets/app/icons/TM_136. Registration Report.svg",
      handleClick: () => { navigate("registration") }
    },
  ]

  return (
    <Stack sx={{ px: 8, gap: 2, mb: 2 }}>
      <Image src="/assets/app/Banner-Medical-Check-Up-Primaya-Hospital.png" sx={{ display: "block", mx: "auto" }} />

      <Grid container spacing={2}>
        {
          listCard.map((row, index) => {

            return (
              <Grid item xs={12} md={3} key={index}>
                <MainCard {...row} />
              </Grid>
            )
          })
        }
      </Grid>
    </Stack>
  )
}

export default HomePage
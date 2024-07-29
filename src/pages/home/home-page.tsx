import { useNavigate } from "react-router"

import { Box, Grid, Stack } from "@mui/material"

import { Header_Height } from "src/utils/variables"

import { CardBanner } from "src/components/card-banner"
import { Image } from "src/components/image"
import { useSelector } from "src/store/store"
import { useTranslate } from "src/locales"
import { useEffect } from "react"


const HomePage = () => {

  const navigate = useNavigate()
  const config = useSelector((root) => root.config)
  const {t, onChangeLang} = useTranslate()

  const listCard = [
    {
      id: "check_in",
      show: config.checkin,
      title: t("home.menu.checkin.title")?.toUpperCase(),
      body: t("home.menu.checkin.description"),
      icon: "medical-checkup",
      handleClick: () => { navigate("checkin") }
    },
    {
      id: "kunjungan_dokter",
      show: config.encounter,
      title: t("home.menu.doctor_visit.title")?.toUpperCase(),
      body: t("home.menu.doctor_visit.description"),
      icon: "doctor",
      handleClick: () => { navigate("encounter") }
    },
    {
      id: "reservasi",
      show: config.reservation,
      title: t("home.menu.reservation.title")?.toUpperCase(),
      body: t("home.menu.reservation.description"),
      icon: "medical-appointment",
      handleClick: () => { navigate("reservation") }
    },
    {
      id: "registrasi_pasien_baru",
      show: config.registration,
      title: t("home.menu.registration.title")?.toUpperCase(),
      body: t("home.menu.registration.description"),
      icon: "health-insurance",
      handleClick: () => { navigate("registration") }
    },
  ]

  useEffect(() => {
    onChangeLang("id")
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack sx={{ px: 8, gap: 2, height: `calc(100vh - ${Header_Height}px)`, pb: 2 }}>
      <Image
        src="/assets/app/Banner-Medical-Check-Up-Primaya-Hospital.png"
        sx={{
          display: "block",
          mx: "auto",
        }} />

      <Box>
        <CardWrapper listCard={listCard} mode={config.mode} />
      </Box>
    </Stack>
  )
}

export default HomePage

const CardWrapper = ({ mode, listCard }: { mode: string, listCard: any[] }) => {

  const activeCard = listCard.filter((row) => row.show === true)

  const width = 100 / activeCard.length

  if (mode === "fixed") {
    return (
      <Grid container spacing={2} sx={{ placeContent: "center" }}>
        {
          activeCard.map((row, index) => {
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
    )
  }

  return (
    <Box sx={{ display: "flex", placeItems: "center", placeContent: "center", gap: 2, height: "100%", }}>
      {
        activeCard.map((row, index) => {
          return (
            <Box sx={{ height: "100%", width: `${width}%` }}>
              <CardBanner
                key={index}
                clickable
                title={row.title}
                body={row.body}
                onClick={row.handleClick}
                localIcon={row.icon}
              />
            </Box>
          )
        })
      }
    </Box>
  )
}

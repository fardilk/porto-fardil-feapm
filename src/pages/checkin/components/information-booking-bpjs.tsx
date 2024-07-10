import { Box, Grid, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { AlertInformation } from "src/components/alert-information"
import { CardBanner } from "src/components/card-banner"
import { LabelTextContainer } from "src/components/label-text"
import type { LabelTextProps } from "src/components/label-text/types"
import { fDate } from "src/utils/format-time"
import { fAsterisk } from "src/utils/helper"

const InformationBookingBPJS = () => {

  const [headerData, _setHeaderData] = useState<LabelTextProps[]>([
    { title: "Nama Lengkap", body: "Hello World" },
    { title: "NIK", body: fAsterisk("100200300400") },
    { title: "Jenis Kelamin", body: "Perempuan" },
    { title: "Tempat, Tanggal Lahir", body: `Malaysia, ${fDate("04-05-2001", "DD-MM-YYYY")}` },
    { title: "Nomor Kartu", body: "1001010101001010" },
    { title: "Kelas", body: "Kelas III" },
    { title: "Faskes Pertama", body: "Klinik Surya Medika" },
    { title: "Jenis Peserta", body: "Pekerja Mandiri" },
    { title: "Status Peserta", body: "Aktif" },
  ])

  const [referenceData, _setReferenceData] = useState<LabelTextProps[]>([
    { title: "No Rujukan", body: fAsterisk("50040503009874") },
    { title: "Tgl Rujukan", body: fDate("04-05-2001", "DD-MM-YYYY") },
    { title: "Poliklinik", body: "Poli Saraf" }
  ])

  const [detailData, _setDetailData] = useState([
    { title: "Tujuan Layanan", body: "Poli Mata", icon: "assets/app/icons/checkin-poli.svg" },
    { title: "Dokter Pemeriksa", body: "dr. Inas Shabrina,Sp.M", icon: "assets/app/icons/checkin-doctor.svg" },
    { title: "Tipe Pembayaran", body: "BPJS", icon: "assets/app/icons/checkin-bpjs.svg" },
    { title: "Waktu Pelayanan", body: "Senin, 30-01-2022 10:00-14:00", icon: "assets/app/icons/checkin-calendar.svg" },
  ])

  return (
    <Stack gap={4}>
      <AlertInformation
        title="Check-in Berhasil"
        body="Silakan menuju ke counter BPJS."
      />

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>

            <Typography variant="h5" gutterBottom>Detail Rujukan</Typography>

            <LabelTextContainer
              col={1}
              listText={referenceData}
            />

          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>Detail Pasien</Typography>

            <LabelTextContainer
              listText={headerData}
            />
          </Grid>
        </Grid>
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
    </Stack>
  )
}

export default InformationBookingBPJS
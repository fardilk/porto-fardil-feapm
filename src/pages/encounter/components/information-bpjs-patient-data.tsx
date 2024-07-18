import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { LabelTextCard, LabelTextCardProps, LabelTextContainer, LabelTextProps } from "src/components/label-text"
import { fAsterisk } from "src/utils/helper"
import { InformationBPJSPatientDataProps } from "../model/types"
import { fDate } from "src/utils/format-time"
import { Iconify } from "src/components/iconify"

const InformationBPJSPatientData = (props: InformationBPJSPatientDataProps) => {

  const { handleBack, handleSelect } = props

  const [detailData, _setDetailData] = useState<LabelTextProps[]>([
    { title: "Nomor BPJS", body: fAsterisk("100200300400") },
    { title: "Nama Peserta", body: "Anisa Redina" },
    { title: "Tempat, Tanggal Lahir", body: "Malaysia, 11-04-2000" },
    { title: "PPK TK. 1", body: "Klinik Ketampanan Abadi" },
    { title: "Kelas Rawat", body: "1" },
    { title: "Jenis Peserta", body: "Pekerja Mandiri" }
  ])

  const referenceList: LabelTextCardProps[] = [
    {
      listText: [
        {
          title: "Nomor Rujukan",
          body: fAsterisk("100200300102019431")
        },
        {
          title: "Tanggal",
          body: fDate("04-05-2001", "DD-MM-YYYY")
        },
        {
          title: "Asal Faskes Perujuk",
          body: "RS Kesehatan Sentosa"
        },
        {
          title: "Sub/Spesialis",
          body: "Saraf"
        }
      ],
      buttonAction: [
        {
          action: () => { handleSelect() },
          label: "Pilih"
        }
      ]
    },
    {
      listText: [
        {
          title: "Nomor Rujukan",
          body: fAsterisk("100200300102019431")
        },
        {
          title: "Tanggal",
          body: fDate("04-05-2001", "DD-MM-YYYY")
        },
        {
          title: "Asal Faskes Perujuk",
          body: "RS Kesehatan Sentosa"
        },
        {
          title: "Sub/Spesialis",
          body: "Saraf"
        }
      ],
      buttonAction: [
        {
          action: () => { handleSelect() },
          label: "Pilih"
        }
      ]
    },
    {
      listText: [
        {
          title: "Nomor Rujukan",
          body: fAsterisk("100200300102019431")
        },
        {
          title: "Tanggal",
          body: fDate("04-05-2001", "DD-MM-YYYY")
        },
        {
          title: "Asal Faskes Perujuk",
          body: "RS Kesehatan Sentosa"
        },
        {
          title: "Sub/Spesialis",
          body: "Saraf"
        }
      ],
      buttonAction: [
        {
          action: () => { handleSelect() },
          label: "Pilih"
        }
      ]
    }
  ]

  return (
    <Stack gap={2}>

      <Typography variant="h5" color="secondary.darker">Detail Data Pasien BPJS</Typography>

      <LabelTextContainer listText={detailData} />

      <Box sx={{ display: "flex", placeItems: "end", gap: 1 }}>
        <Button
          size="large"
          variant="outlined"
          color="secondary"
          onClick={() => { }}
        >
          <Iconify icon="fluent:chevron-left-12-regular" />
        </Button>
        <Grid container spacing={2}>
          {
            referenceList.map((row, index) => {

              return (
                <Grid item xs={12} md={4} key={index}>
                  <LabelTextCard {...row} orientation="vertical" />
                </Grid>
              )
            })
          }
        </Grid>
        <Button
          size="large"
          variant="outlined"
          color="secondary"
          onClick={() => { }}
        >
          <Iconify icon="fluent:chevron-right-12-regular" />
        </Button>
      </Box>

      <Box sx={{ display: "flex", placeContent: "space-between", gap: 2 }}>
        <Button fullWidth color="secondary" variant="outlined" size="large" onClick={handleBack}>Data Salah, Isi ulang nomor polis</Button>
      </Box>
    </Stack>
  )
}

export default InformationBPJSPatientData
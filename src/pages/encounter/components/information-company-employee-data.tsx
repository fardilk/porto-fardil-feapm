import { Box, Button, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { LabelTextContainer, type LabelTextProps } from "src/components/label-text"
import { fAsterisk } from "src/utils/helper"
import { type InformationCompanyEmployeeDataProps } from "../model/types"

const InformationCompanyEmployeeData = (props: InformationCompanyEmployeeDataProps) => {

  const { handleBack, handleNext } = props

  const [detailData, _setDetailData] = useState<LabelTextProps[]>([
    { title: "Nomor Karyawan", body: fAsterisk("100200300400") },
    { title: "Nama Pemegang Polis", body: "Anisa Redina" },
    { title: "Jenis Penjamin", body: "Asuransi Kesehatan" },
    { title: "Perusahaan Asuransi", body: "Allianz Life Insurance" },
    { title: "Alamat", body: "Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan" },
    { title: "Tempat, Tanggal Lahir", body: "Malaysia, 11-04-2000" },
    { title: "No Telpon", body: fAsterisk("085157902550") },
  ])

  return (
    <Stack gap={2}>

      <Typography variant="h5" color="secondary.darker">Detail Data Karyawan</Typography>

      <LabelTextContainer listText={detailData} />

      <Box sx={{ display: "flex", placeContent: "space-between", gap: 2 }}>
        <Button fullWidth color="secondary" variant="outlined" size="large" onClick={handleBack}>Data Salah, Isi ulang nomor polis</Button>
        <Button fullWidth color="secondary" variant="contained" size="large" onClick={handleNext}>Data Sudah Benar, Lanjutkan</Button>
      </Box>
    </Stack>
  )
}

export default InformationCompanyEmployeeData
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> edd438e (feature: error alert on form booking)
=======
>>>>>>> 0a88b18 (feature: error alert on form booking)

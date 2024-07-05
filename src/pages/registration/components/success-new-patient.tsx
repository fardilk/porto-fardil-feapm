import { useState } from "react"

import { Box, Stack, Button, Typography } from "@mui/material"

import { fAsterisk } from "src/utils/helper"
import { fDate } from "src/utils/format-time"

import { Iconify } from "src/components/iconify"
import { LabelTextContainer } from "src/components/label-text"

import type { SuccessNewPatientProps } from "../model/types"
import { AlertInformation } from "src/components/alert-information"

const SuccessNewPatient = (props: SuccessNewPatientProps) => {

  const { handleFinish } = props

  const [headerData, _setHeaderData] = useState<{ title: string, body: string }[]>([
    { title: "NIK", body: fAsterisk("100200300400") },
    { title: "Nama Lengkap", body: "Hello World" },
    { title: "Tanggal Lahir", body: fDate("04-05-2001", "DD-MM-YYYY") },
    { title: "No Telpon", body: fAsterisk("085157902550") },
    { title: "Email", body: "helloworld@gmail.com" },
    { title: "Alamat", body: "Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan" },
  ])

  return (
    <Stack spacing={2}>
      <AlertInformation
        title="Pendaftaran Anda telah kami terima."
        body="Silakan menuju ke bagian administrasi untuk mengaktifkan rekam medis Anda."
      />

      <Typography variant="h5" gutterBottom>Detail Pasien</Typography>

      <LabelTextContainer row={3} listText={headerData} />

      <Button size="large" variant="outlined" color="secondary" onClick={handleFinish}>Selesai</Button>
    </Stack>
  )
}

export default SuccessNewPatient
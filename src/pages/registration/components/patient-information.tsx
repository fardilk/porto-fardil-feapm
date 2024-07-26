import { Alert, Box, Button, TableCell, TableContainer, Typography } from "@mui/material"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { LabelTextContainer, LabelTextProps } from "src/components/label-text"
import { fAsterisk } from "src/utils/helper"
import type { PatientInformationProps } from "../model/types"

const PatientInformation = (props: PatientInformationProps) => {
  const { leftButtonProps, rightButtonProps, leftTextButton, rigthTextButton } = props

  const { watch } = useFormContext()
  const isForeign = watch("citizenship")

  const [detailData, _setDetailData] = useState<LabelTextProps[]>([
    { title: isForeign ? "Passport" : "NIK/Medrec", body: fAsterisk("100200300400") },
    { title: "Nama Lengkap", body: "Anisa Redina" },
    { title: "Jenis Kelamin", body: "Perempuan" },
    { title: "Tempat, Tanggal Lahir", body: "Malaysia, 11-04-2000" },
    { title: "Alamat", body: "Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan" },
    { title: "No Telpon", body: fAsterisk("085157902550") },
    { title: "Email", body: "anisa@gmail.com" },
    { title: "Golongan Darah", body: "B" },
    { title: "Agama", body: "Islam" },
    { title: "Pendidikan", body: "Sarjana" },
    { title: "Status Perkawinan", body: "Belum menikah" },
    { title: "Pekerjaan", body: "Karyawan Swasta" },
    { title: "Bahasa Sehari-hari", body: "Bahasa Indonesia" },
  ])

  return (
    <>
      <Alert color="warning" severity="warning">Anda sudah terdaftar sebagai pasien di RS Primaya Tangerang dengan data sebagai berikut :</Alert>
      <TableContainer sx={{ my: 2 }}>
        <LabelTextContainer
          disableOutline
          orientation="horizontal"
          listText={detailData}
          col={1}
        />
      </TableContainer>

      <Box sx={{ display: "flex", placeContent: "space-between", gap: 2 }}>
        <Button size="large" variant="outlined" fullWidth color="secondary" {...leftButtonProps}>{leftTextButton}</Button>
        <Button size="large" variant="contained" fullWidth color="secondary" {...rightButtonProps}>{rigthTextButton}</Button>
      </Box>
    </>
  )
}

export default PatientInformation

const TableCellBody = ({ titleText, bodyText }: { titleText?: string, bodyText?: string }) => {
  return (
    <TableCell borderbottom="noborder">
      <Typography variant={titleText ? "subtitle1" : undefined} color={titleText ? "grey.600" : undefined}>
        {titleText} {bodyText}
      </Typography>
    </TableCell>
  )
}

import { useFormContext } from "react-hook-form"

import { Box, Alert, Table, Button, TableRow, TableBody, TableCell, Typography, TableContainer } from "@mui/material"

import { fAsterisk } from "src/utils/helper"

import type { InformationProps } from "../model/types"
import { LabelTextContainer, LabelTextProps } from "src/components/label-text"
import { useState } from "react"

const InformationOutpatientGeneral = (props: InformationProps) => {
  const { leftButtonProps, rightButtonProps, leftTextButton, rightTextButton } = props

  const { watch } = useFormContext()
  const isForeign = watch("citizenship")

  const [detailData, _setDetailData] = useState<LabelTextProps[]>([
    { title: isForeign ? "Passport" : "NIK/Medrec", body: fAsterisk("100200300400") },
    { title: "Nama Lengkap", body: "Anisa Redina" },
    { title: "Tempat, Tanggal Lahir", body: "Malaysia, 11-04-2000" },
    { title: "Golongan Darah", body: "B" },
    { title: "Rhesus", body: "Negatif" },
    { title: "Alamat", body: "Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan" },
    { title: "No Telpon", body: fAsterisk("085157902550") },
    { title: "Email", body: "anisa@gmail.com" },
  ])

  return (
    <>
      <Alert severity="info">Untuk update data Anda, silahkan ke counter medical record.</Alert>
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
        <Button size="large" variant="contained" fullWidth color="secondary" {...rightButtonProps}>{rightTextButton}</Button>
      </Box>
    </>
  )
}

export default InformationOutpatientGeneral

const TableCellBody = ({ titleText, bodyText }: { titleText?: string, bodyText?: string }) => {
  return (
    <TableCell borderbottom="noborder">
      <Typography variant={titleText ? "subtitle1" : undefined} color={titleText ? "grey.600" : undefined}>
        {titleText} {bodyText}
      </Typography>
    </TableCell>
  )
}
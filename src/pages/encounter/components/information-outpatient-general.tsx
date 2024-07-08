import { useFormContext } from "react-hook-form"

import { Box, Alert, Table, Button, TableRow, TableBody, TableCell, Typography, TableContainer } from "@mui/material"

import { fAsterisk } from "src/utils/helper"

import type { InformationProps } from "../model/types"

const InformationOutpatientGeneral = (props: InformationProps) => {
  const { leftButtonProps, rightButtonProps, leftTextButton, rightTextButton } = props

  const { watch } = useFormContext()
  const isForeign = watch("citizenship")

  return (
    <>
      <Alert severity="info">Untuk update data Anda, silahkan ke counter medical record.</Alert>
      <TableContainer sx={{ my: 2 }}>
        <Table>
          <colgroup>
            <col width="30%" />
            <col width="70%" />
          </colgroup>
          <TableBody>
            <TableRow>
              <TableCellBody titleText={isForeign ? "Passport" : "NIK/Medrec"} />
              <TableCellBody bodyText={fAsterisk("1002003004005006008")} />
            </TableRow>
            <TableRow>
              <TableCellBody titleText={isForeign ? "FullName" : "Nama Lengkap"} />
              <TableCellBody bodyText="Anisa Redina" />
            </TableRow>
            <TableRow>
              <TableCellBody titleText={isForeign ? "Place and Date of Birth" : "Tempat, Tanggal Lahir"} />
              <TableCellBody bodyText="Malaysia, 11-04-2000" />
            </TableRow>
            {
              !isForeign && (
                <>
                  <TableRow>
                    <TableCellBody titleText="Golongan Darah" />
                    <TableCellBody bodyText="B" />
                  </TableRow>
                  <TableRow>
                    <TableCellBody titleText="Rhesus" />
                    <TableCellBody bodyText="Negatif" />
                  </TableRow>
                </>
              )
            }
            <TableRow>
              <TableCellBody titleText={isForeign ? "Address" : "Alamat"} />
              <TableCellBody bodyText="Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan" />
            </TableRow>
            <TableRow>
              <TableCellBody titleText={isForeign ? "Phone Number" : "No Telpon"} />
              <TableCellBody bodyText={fAsterisk("085157902550")} />
            </TableRow>
            <TableRow>
              <TableCellBody titleText="Email" />
              <TableCellBody bodyText="anisa@gmail.com" />
            </TableRow>
          </TableBody>
        </Table>
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
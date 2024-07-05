import type { ReactNode } from "react";

import { useRef, useState } from "react"
import { useFormContext } from "react-hook-form"

import { Box, Table, Button, TableRow, TableBody, TableCell, Typography, TableContainer } from "@mui/material"

import { Keyboard } from "src/components/keyboard"
import { RHFTextField, RHFDatePicker, RHFRadioGroup } from "src/components/hook-form"

import type { NewPatientProps } from "../model/types"

const NewPatient = (props: NewPatientProps) => {
  const { handleNextPage, handlePreviousPage } = props

  const [elementName, setElementName] = useState("")
  const [keyboardType, setKeyboardType] = useState("")
  const inputRef = useRef<any>({})

  const { watch } = useFormContext()
  const isForeign = watch("citizenship")

  return (
    <>
      <TableContainer sx={{ my: 2 }}>
        <Table>
          <colgroup>
            <col width="30%" />
            <col width="70%" />
          </colgroup>
          <TableBody>
            <TableRow>
              <TableCellBody titleText={isForeign ? "Passport" : "NIK/Medrec"} />
              <TableCellBody>
                <RHFTextField
                  name="nik"
                  disabled
                  placeholder={isForeign ? "Passport" : "NIK/Medrec"}
                  inputRef={(ref) => { inputRef.current.nik = ref }}
                  onClick={() => { setElementName("nik"); setKeyboardType("text") }}
                />
              </TableCellBody>
            </TableRow>
            <TableRow>
              <TableCellBody titleText={isForeign ? "FullName" : "Nama Lengkap"} />
              <TableCellBody>
                <RHFTextField
                  name="name"
                  placeholder={isForeign ? "FullName" : "Nama Lengkap"}
                  inputRef={(ref) => { inputRef.current.name = ref }}
                  onClick={() => { setElementName("name"); setKeyboardType("text") }}
                />
              </TableCellBody>
            </TableRow>
            <TableRow>
              <TableCellBody titleText={isForeign ? "Gender" : "Jenis Kelamin"} />
              <TableCellBody>
                <RHFRadioGroup
                  id="gender"
                  name="gender"
                  row
                  options={[{ label: "Laki - Laki", value: "male" }, { label: "Perempuan", value: "female" }]}
                  onClick={() => { setElementName(""); setKeyboardType("") }}
                />
              </TableCellBody>
            </TableRow>
            <TableRow>
              <TableCellBody titleText={isForeign ? "Place of Birth" : "Tempat Lahir"} />
              <TableCellBody>
                <RHFTextField
                  id="birthPlace"
                  name="birthPlace"
                  placeholder={isForeign ? "Place of Birth" : "Tempat Lahir"}
                  inputRef={(ref) => { inputRef.current.birthPlace = ref }}
                  onClick={() => { setElementName("birthPlace"); setKeyboardType("text") }}
                />
              </TableCellBody>
            </TableRow>
            <TableRow>
              <TableCellBody titleText={isForeign ? "Date of Birth" : "Tanggal Lahir"} />
              <TableCellBody>
                <RHFDatePicker
                  name="birthDate"
                  inputRef={(ref) => { inputRef.current.birthDate = ref }}
                  slotProps={{ textField: { fullWidth: true, onClick: () => { setElementName(""); setKeyboardType("") } } }}
                  onOpen={() => { setElementName(""); setKeyboardType("") }}
                />
              </TableCellBody>
            </TableRow>
            <TableRow>
              <TableCellBody titleText={isForeign ? "Phone Number" : "No Telp"} />
              <TableCellBody>
                <RHFTextField
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder={isForeign ? "Phone Number" : "No Telp"}
                  inputRef={(ref) => { inputRef.current.phoneNumber = ref }}
                  onClick={() => { setElementName("phoneNumber"); setKeyboardType("number") }}
                />
              </TableCellBody>
            </TableRow>
            <TableRow>
              <TableCellBody titleText="Email" />
              <TableCellBody>
                <RHFTextField
                  id="email"
                  name="email"
                  placeholder="Email"
                  inputRef={(ref) => { inputRef.current.email = ref }}
                  onClick={() => { setElementName("email"); setKeyboardType("email") }}
                />
              </TableCellBody>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer >

      <Box sx={{ display: "flex", placeContent: "space-between", gap: 2 }}>
        <Button size="large" variant="outlined" fullWidth color="secondary" onClick={handlePreviousPage}>{isForeign ? "Back" : "Kembali"}</Button>
        <Button size="large" variant="contained" fullWidth color="secondary" onClick={handleNextPage}>{isForeign ? "Next" : "Selanjutnya"}</Button>
      </Box>

      {
        elementName && (
          <Keyboard
            ref={inputRef.current}
            elementName={elementName}
            inputType={keyboardType}
          />
        )
      }
    </>
  )
}

export default NewPatient

const TableCellBody = ({ titleText, children }: { titleText?: string, children?: ReactNode }) => {
  return (
    <TableCell borderbottom="noborder">
      {
        titleText && (
          <Typography variant="subtitle1" color="grey.600">
            {titleText}
          </Typography>
        )
      }

      {children && children}
    </TableCell>
  )
}
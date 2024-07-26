import type { ReactNode } from "react";

import { useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

import { RHFMobileDatePicker, RHFRadioGroup, RHFTextField, RHFTimePils } from "src/components/hook-form";
import { Keyboard } from "src/components/keyboard";

import type { NewPatientProps } from "../model/types";
import { label } from "yet-another-react-lightbox";

const NewPatient = (props: NewPatientProps) => {
  const { handleNextPage, handlePreviousPage } = props

  const [elementName, setElementName] = useState("")
  const [keyboardType, setKeyboardType] = useState("")
  const inputRef = useRef<any>({})

  const { watch } = useFormContext()
  const isForeign = watch("citizenship")

  const listReligion = useMemo(() => [
    {
      label: "Islam",
      value: "islam"
    },
    {
      label: "Kristen Protestan",
      value: "kristen_protestan"
    },
    {
      label: "Katholik",
      value: "katholik"
    },
    {
      label: "Hindu",
      value: "hindu"
    },
    {
      label: "Budha",
      value: "budha"
    },
    {
      label: "Konghucu",
      value: "konghucu"
    },
    {
      label: "Lainnya",
      value: "lainnya"
    },
  ],[])

  const listGender = useMemo(() => [
    {
      label: "Laki-laki",
      value: "laki-laki"
    },
    {
      label: "Perempuan",
      value: "perempuan"
    }
  ],[])

  const listMarriage = useMemo(() => [
    {
      label: "Cerai",
      value: "cerai"
    },
    {
      label: "Menikah",
      value: "menikah"
    },
    {
      label: "Belum Menikah",
      value: "belum_menikah"
    }
  ],[])

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
              <TableCellBody titleText="Nama Lengkap" />
              <TableCellBody>
                <RHFTextField
                  name="name"
                  placeholder="Nama Lengkap"
                  inputRef={(ref) => { inputRef.current.name = ref }}
                  onClick={() => { setElementName("name"); setKeyboardType("text") }}
                />
              </TableCellBody>
            </TableRow>
            <TableRow>
              <TableCellBody titleText="Jenis Kelamin" />
              <TableCellBody>
                <RHFTimePils
                  name="gender"
                  options={listGender}
                  getOptionLabel={opt => opt.label}
                  getOptionEqualToValue={(opt, value) => opt.value === value?.value}
                />
              </TableCellBody>
            </TableRow>
            <TableRow>
              <TableCellBody titleText="Tempat Lahir" />
              <TableCellBody>
                <RHFTextField
                  id="birthPlace"
                  name="birthPlace"
                  placeholder="Tempat Lahir"
                  inputRef={(ref) => { inputRef.current.birthPlace = ref }}
                  onClick={() => { setElementName("birthPlace"); setKeyboardType("text") }}
                />
              </TableCellBody>
            </TableRow>
            <TableRow>
              <TableCellBody titleText="Tanggal Lahir" />
              <TableCellBody>
                {/* <RHFDatePicker
                  name="birthDate"
                  inputRef={(ref) => { inputRef.current.birthDate = ref }}
                  slotProps={{ textField: { fullWidth: true, onClick: () => { setElementName(""); setKeyboardType("") } } }}
                  onOpen={() => { setElementName(""); setKeyboardType("") }}
                /> */}
                <RHFMobileDatePicker
                  name="birthDate"
                  format="DD/MM/YYYY"
                />
              </TableCellBody>
            </TableRow>
            <TableRow>
              <TableCellBody titleText="Agama"/>
              <TableCellBody>
                <RHFTimePils
                  name="agama"
                  options={listReligion}
                  getOptionLabel={opt => opt.label}
                  getOptionEqualToValue={(opt, value) => opt.value === value?.value}
                />
              </TableCellBody>
            </TableRow>
            <TableRow>
              <TableCellBody titleText="Status Perkawinan"/>
              <TableCellBody>
                <RHFTimePils
                  name="marriage"
                  options={listMarriage}
                  getOptionLabel={opt => opt.label}
                  getOptionEqualToValue={(opt, value) => opt.value === value?.value}
                />
              </TableCellBody>
            </TableRow>
            <TableRow>
              <TableCellBody titleText="No Telp" />
              <TableCellBody>
                <RHFTextField
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="No Telp"
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
        <Button size="large" variant="outlined" fullWidth color="secondary" onClick={handlePreviousPage}>Kembali</Button>
        <Button size="large" variant="contained" fullWidth color="secondary" onClick={handleNextPage}>Selanjutnya</Button>
      </Box>

      {
        elementName && (
          <Keyboard
            withDialog
            open={Boolean(elementName)}
            onClose={() => setElementName("")}
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

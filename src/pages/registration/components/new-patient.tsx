import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { NewPatientProps } from "../model/types"
import { RHFDatePicker, RHFRadioGroup, RHFTextField } from "src/components/hook-form"
import { ReactNode, useRef, useState } from "react"
import { Keyboard } from "src/components/keyboard"
import { useFormContext } from "react-hook-form"

const NewPatient = (props: NewPatientProps) => {
  const { handleNextPage, handlePreviousPage } = props

  const [elementName, setElementName] = useState("")
  const [keyboardType, setKeyboardType] = useState("")
  const inputRef = useRef<any>({})

  const { watch } = useFormContext()
  const isForeign = watch("citizenship")

  const TableRowKeyboardWrapper = ({ children, name }: { children?: ReactNode, name?: string }) => {

    return (
      <>
        <TableRow>
          {children}
        </TableRow>

        <TableRow>
          <TableCell colSpan={2} borderbottom="noborder">
            {
              elementName === name && (
                <Keyboard
                  ref={inputRef.current}
                  elementName={elementName}
                  inputType={keyboardType}
                />
              )
            }
          </TableCell>
        </TableRow>
      </>
    )
  }

  return (
    <>
      <TableContainer sx={{ my: 2 }}>
        <Table>
          <colgroup>
            <col width="30%" />
            <col width="70%" />
          </colgroup>
          <TableBody>
            <TableRowKeyboardWrapper name="nik">
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
            </TableRowKeyboardWrapper>
            <TableRowKeyboardWrapper name="name">
              <TableCellBody titleText={isForeign ? "FullName" : "Nama Lengkap"} />
              <TableCellBody>
                <RHFTextField
                  name="name"
                  placeholder={isForeign ? "FullName" : "Nama Lengkap"}
                  inputRef={(ref) => { inputRef.current.name = ref }}
                  onClick={() => { setElementName("name"); setKeyboardType("text") }}
                />
              </TableCellBody>
            </TableRowKeyboardWrapper>
            <TableRowKeyboardWrapper>
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
            </TableRowKeyboardWrapper>
            <TableRowKeyboardWrapper name="birthPlace">
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
            </TableRowKeyboardWrapper>
            <TableRowKeyboardWrapper name="birthDate">
              <TableCellBody titleText={isForeign ? "Date of Birth" : "Tanggal Lahir"} />
              <TableCellBody>
                <RHFDatePicker
                  name="birthDate"
                  inputRef={(ref) => { inputRef.current.birthDate = ref }}
                  slotProps={{ textField: { fullWidth: true, onClick: () => { setElementName(""); setKeyboardType("") } } }}
                  onOpen={() => { setElementName(""); setKeyboardType("") }}
                />
              </TableCellBody>
            </TableRowKeyboardWrapper>
            <TableRowKeyboardWrapper name="phoneNumber">
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
            </TableRowKeyboardWrapper>
            <TableRowKeyboardWrapper name="email">
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
            </TableRowKeyboardWrapper>
          </TableBody>
        </Table>
      </TableContainer >

      <Box sx={{ display: "flex", placeContent: "space-between", gap: 2 }}>
        <Button variant="outlined" fullWidth color="secondary" onClick={handlePreviousPage}>{isForeign ? "Back" : "Kembali"}</Button>
        <Button variant="contained" fullWidth color="secondary" onClick={handleNextPage}>{isForeign ? "Next" : "Selanjutnya"}</Button>
      </Box>
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
import { Alert, Box, Button, TableContainer } from "@mui/material"
import { useMemo } from "react"
import type { LabelTextProps } from "src/components/label-text";
import { LabelTextContainer } from "src/components/label-text"
import { fAsterisk } from "src/utils/helper"
import type { InformationProps } from "../model/types"
import { useTranslate } from "src/locales"

const InformationOutpatientGeneral = (props: InformationProps) => {
  const { leftButtonProps, rightButtonProps, leftTextButton, rightTextButton } = props
  const { t } = useTranslate()

  const detailData : LabelTextProps[] = useMemo(() => [
    { title: t("appointment.patient.nik"), body: fAsterisk("100200300400") },
    { title: t("appointment.patient.fullname"), body: "Anisa Redina" },
    { title: t("appointment.patient.birthdateplace"), body: "Malaysia, 11-04-2000" },
    { title: t("appointment.patient.blood_type"), body: "B" },
    { title: t("appointment.patient.blood_rhesus"), body: "Negatif" },
    { title: t("appointment.patient.address"), body: "Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan" },
    { title: t("appointment.patient.phone"), body: fAsterisk("085157902550") },
    { title: t("appointment.patient.email"), body: "anisa@gmail.com" },
  ],[t])

  return (
    <>
      <Alert severity="info">{t("appointment.patient.actions.update_msg")}</Alert>
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

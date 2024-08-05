import { Alert, Box, Button, TableCell, TableContainer, Typography } from "@mui/material"
import { useState } from "react"
import { LabelTextContainer, LabelTextProps } from "src/components/label-text"
import { fAsterisk } from "src/utils/helper"
import type { InformationProps } from "../model/types"
import { useTranslate } from "src/locales"

const InformationOutpatientGeneral = (props: InformationProps) => {
  const { t } = useTranslate()

  console.log("informasi outpatient")

  const { leftButtonProps, rightButtonProps, leftTextButton, rightTextButton, data } = props

  const detailData = [
    { title: t("appointment.patient.nik"), body: fAsterisk(data.nik ?? data.passportNumber ?? "-") },
    { title: t("appointment.patient.fullname"), body: data.name },
    { title: t("appointment.patient.birthdateplace"), body: `${data.birthPlace}, ${data.birthDttm}` },
    { title: t("appointment.patient.blood_type"), body: data.additional.bloodType },
    { title: t("appointment.patient.blood_rhesus"), body: data.additional.bloodRhesus },
    { title: t("appointment.patient.address"), body: data.address },
    { title: t("appointment.patient.phone"), body: fAsterisk(data.phone) },
    { title: t("appointment.patient.email"), body: data.email },
  ]

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

import { Alert, Box, Button, TableContainer } from "@mui/material"
import { useMemo } from "react"
import type { LabelTextProps } from "src/components/label-text";
import { LabelTextContainer } from "src/components/label-text"
import { fAsterisk } from "src/utils/helper"
import type { InformationProps } from "../model/types"
import { useTranslate } from "src/locales"
import { fDate, formatStr } from "src/utils/format-time";

const InformationOutpatientGeneral = (props: InformationProps) => {
  const { leftButtonProps, rightButtonProps, leftTextButton, rightTextButton, data } = props
  const { t } = useTranslate()

  const detailData: LabelTextProps[] = useMemo(() => [
    { title: t("appointment.patient.nik"), body: fAsterisk(data?.identifierValue) },
    { title: t("appointment.patient.fullname"), body: data?.name },
    { title: t("appointment.patient.birthdateplace"), body: `${data?.birthPlace} ${fDate(data?.birthDttm, formatStr.paramCase.mysqlDate)}` },
    { title: t("appointment.patient.blood_type"), body: data?.additional.bloodTypeDisplay || "-" },
    { title: t("appointment.patient.blood_rhesus"), body: data?.additional.bloodRhesusDisplay || "-" },
    { title: t("appointment.patient.address"), body: data?.address || '-' },
    { title: t("appointment.patient.phone"), body: fAsterisk(data?.phone) },
    { title: t("appointment.patient.email"), body: data?.email || "-" },
  ], [t, data])

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

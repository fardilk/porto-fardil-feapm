
import { Box, Button, Stack, Typography } from "@mui/material"

import { fDate } from "src/utils/format-time"
import { fAsterisk } from "src/utils/helper"

import { LabelTextContainer } from "src/components/label-text"

import { useWatch } from "react-hook-form"
import { useNavigate } from "react-router"
import { AlertInformation } from "src/components/alert-information"
import { OutlineCard } from "src/components/outline-card"
import { useTranslate } from "src/locales"
import type { SuccessNewPatientProps } from "../model/types"

const SuccessNewPatient = (props: SuccessNewPatientProps) => {

  const { handleFinish } = props

  const { t } = useTranslate()

  const navigate = useNavigate()

  const values = useWatch()

  const headerData = [
    { title: values.citizenship ? 'Passport' : 'NIK', body: fAsterisk(values.nik) },
    { title: t("registration.fullname"), body: values.name },
    { title: t("registration.born_place_date"), body: `${values.birthPlace} ${fDate(values.birthDate, "DD-MM-YYYY")}` },
    { title: t("registration.phone_number"), body: fAsterisk(values.phoneNumber) },
    { title: t("registration.email"), body: values.email },
    { title: t("registration.address_label"), body: values.address, },
  ]

  return (
    <Stack spacing={2}>
      <AlertInformation
        title={(t("registration.registration_received"))}
      // body={(t("registration.activate_medical_record"))}
      />

      <Typography variant="h5" gutterBottom>{(t("registration.patient_details"))}</Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <LabelTextContainer col={3} listText={headerData} orientation="horizontal" />
        <OutlineCard sx={{ width: 1 }} cardContentProps={{ sx: { height: 1 } }}>
          <Stack spacing={1} sx={{ height: 1 }}>
            <Typography variant='subtitle1'>{t('registration.select_service')}</Typography>
            <Button variant="contained" color="secondary" sx={{ height: 1 }} onClick={() => { navigate('/reservation', { state: { nik: values.nik, fromRegistration: true } }) }}>
              {t('home.menu.reservation.title')}
            </Button>
            <Button variant="contained" color="secondary" sx={{ height: 1 }} onClick={() => { navigate('/encounter', { state: { nik: values.nik, fromRegistration: true } }) }}>
              {t("home.menu.doctor_visit.title")}
            </Button>
          </Stack>
        </OutlineCard>
      </Box>

      <Button size="large" variant="outlined" color="secondary" onClick={handleFinish}>{(t("registration.button.done"))}</Button>
    </Stack>
  )
}

export default SuccessNewPatient

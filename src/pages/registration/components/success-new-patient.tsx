
import { Button, Stack, Typography } from "@mui/material"

import { fDate } from "src/utils/format-time"
import { fAsterisk } from "src/utils/helper"

import { LabelTextContainer } from "src/components/label-text"

import { useWatch } from "react-hook-form"
import { AlertInformation } from "src/components/alert-information"
import { useTranslate } from "src/locales"
import type { SuccessNewPatientProps } from "../model/types"

const SuccessNewPatient = (props: SuccessNewPatientProps) => {

  const { handleFinish } = props

  const { t } = useTranslate()

  const values = useWatch()

  const headerData = [
    { title: values.citizenship ? 'Passport' : 'NIK', body: fAsterisk(values.nik) },
    { title: t("registration.fullname"), body: values.name },
    { title: t("registration.born_place_date"), body: `${values.birthPlace} ${fDate(values.birthDate, "DD-MM-YYYY")}` },
    { title: t("registration.phone_number"), body: fAsterisk(values.phoneNumber) },
    { title: t("registration.email"), body: values.email },
    { title: t("registration.address_label"), body: values.address },
  ]

  return (
    <Stack spacing={2}>
      <AlertInformation
        title={(t("registration.registration_received"))}
        body={(t("registration.activate_medical_record"))}
      />

      <Typography variant="h5" gutterBottom>{(t("registration.patient_details"))}</Typography>

      <LabelTextContainer col={3} listText={headerData} />

      <Button size="large" variant="outlined" color="secondary" onClick={handleFinish}>{(t("registration.button.done"))}</Button>
    </Stack>
  )
}

export default SuccessNewPatient

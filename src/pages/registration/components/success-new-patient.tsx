import { useState } from "react"

import { Button, Stack, Typography } from "@mui/material"

import { fDate } from "src/utils/format-time"
import { fAsterisk } from "src/utils/helper"

import { LabelTextContainer } from "src/components/label-text"

import { AlertInformation } from "src/components/alert-information"
import type { SuccessNewPatientProps } from "../model/types"
import { useTranslate } from "src/locales"

const SuccessNewPatient = (props: SuccessNewPatientProps) => {

  const { handleFinish } = props

  const {t} = useTranslate()

  const [headerData, _setHeaderData] = useState<{ title: string, body: string }[]>([
    { title: t("registration.nik"), body: fAsterisk("100200300400") },
    { title: t("registration.fullname"), body: "Hello World" },
    { title: t("registration.born_place_date"), body: fDate("04-05-2001", "DD-MM-YYYY") },
    { title: t("registration.phone_number"), body: fAsterisk("085157902550") },
    { title: t("registration.email"), body: "helloworld@gmail.com" },
    { title: t("registration.address_label"), body: t("registration.address") },
  ])

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

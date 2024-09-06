import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { useMemo } from "react"
import { LabelTextCard, type LabelTextCardProps, LabelTextContainer } from "src/components/label-text"
import { fAsterisk } from "src/utils/helper"
import type { InformationBPJSPatientDataProps } from "../model/types"
import { fDate } from "src/utils/format-time"
import { Iconify } from "src/components/iconify"
import { useTranslate } from "src/locales"

const InformationBPJSPatientData = (props: InformationBPJSPatientDataProps) => {

  const { handleBack, handleSelect } = props
  const { t } = useTranslate()
  const detailData = useMemo(() => [
    { title: t("appointment.payment.assurance.bpjs.detail.bpjs_number"), body: fAsterisk("100200300400") },
    { title: t("appointment.payment.assurance.bpjs.detail.participant_name"), body: "Anisa Redina" },
    { title: `${t("global.location")}, ${t("global.birthdate")}`, body: "Malaysia, 11-04-2000" },
    { title: "PPK TK. 1", body: "Klinik Ketampanan Abadi" },
    { title: t("appointment.payment.assurance.bpjs.detail.class"), body: "1" },
    { title: t("global.user_type"), body: "Pekerja Mandiri" }
  ],[t])

  const referenceList: LabelTextCardProps[] = [
    {
      listText: [
        {
          title: t("global.referral_num"),
          body: fAsterisk("100200300102019431")
        },
        {
          title: t("global.date"),
          body: fDate("04-05-2001", "DD-MM-YYYY")
        },
        {
          title: t("appointment.payment.assurance.bpjs.detail.ref_origin"),
          body: "RS Kesehatan Sentosa"
        },
        {
          title: t("global.specialist"),
          body: "Saraf"
        }
      ],
      buttonAction: [
        {
          action: () => { handleSelect() },
          label: t("global.choose")
        }
      ]
    },
    {
      listText: [
        {
          title: t("global.referral_num"),
          body: fAsterisk("100200300102019431")
        },
        {
          title: t("global.date"),
          body: fDate("04-05-2001", "DD-MM-YYYY")
        },
        {
          title: t("appointment.payment.assurance.bpjs.detail.ref_origin"),
          body: "RS Kesehatan Sentosa"
        },
        {
          title: t("global.specialist"),
          body: "Saraf"
        }
      ],
      buttonAction: [
        {
          action: () => { handleSelect() },
          label: t("global.choose")
        }
      ]
    },
    {
      listText: [
        {
          title: t("global.referral_num"),
          body: fAsterisk("100200300102019431")
        },
        {
          title: t("global.date"),
          body: fDate("04-05-2001", "DD-MM-YYYY")
        },
        {
          title: t("appointment.payment.assurance.bpjs.detail.ref_origin"),
          body: "RS Kesehatan Sentosa"
        },
        {
          title: t("global.specialist"),
          body: "Saraf"
        }
      ],
      buttonAction: [
        {
          action: () => { handleSelect() },
          label: t("global.choose")
        }
      ]
    }
  ]

  return (
    <Stack gap={2}>

      <Typography variant="h5" color="secondary.darker">{t("appointment.payment.assurance.bpjs.detail.title")}</Typography>

      <LabelTextContainer listText={detailData} />

      <Box sx={{ display: "flex", placeItems: "end", gap: 1 }}>
        <Button
          size="large"
          variant="outlined"
          color="secondary"
          onClick={() => { }}
        >
          <Iconify icon="fluent:chevron-left-12-regular" />
        </Button>
        <Grid container spacing={2}>
          {
            referenceList.map((row, index) => {

              return (
                <Grid item xs={12} md={4} key={index}>
                  <LabelTextCard {...row} orientation="vertical" />
                </Grid>
              )
            })
          }
        </Grid>
        <Button
          size="large"
          variant="outlined"
          color="secondary"
          onClick={() => { }}
        >
          <Iconify icon="fluent:chevron-right-12-regular" />
        </Button>
      </Box>

      <Box sx={{ display: "flex", placeContent: "space-between", gap: 2 }}>
        <Button fullWidth color="secondary" variant="outlined" size="large" onClick={handleBack}>{t("appointment.payment.assurance.bpjs.detail.wrong_num")}</Button>
      </Box>
    </Stack>
  )
}

export default InformationBPJSPatientData

import { Box, Button, Stack, Typography } from "@mui/material";
import { type FC } from "react";
import { LabelTextContainer } from "src/components/label-text";
import { useTranslate } from "src/locales";
import { type InformationPatientProps } from "../model/types";

const InformationPatient: FC<InformationPatientProps> = ({ detailData, handleBack, handleNext, title }) => {

  const { t } = useTranslate();

  return (
    <Stack gap={2}>

      <Typography variant="h5" color="secondary.darker">{title}</Typography>

      <LabelTextContainer listText={detailData} />

      <Box sx={{ display: "flex", placeContent: "space-between", gap: 2 }}>
        <Button fullWidth color="secondary" variant="outlined" size="large" onClick={handleBack}>{t('assurance.button.incorrect_data')}</Button>
        <Button fullWidth color="secondary" variant="contained" size="large" onClick={handleNext}>{t('assurance.button.correct_data')}</Button>
      </Box>
    </Stack>
  )
}

export default InformationPatient

import { Box, Stack, Typography, Button } from "@mui/material";
import { type FC } from "react";
import { LabelTextContainer } from "src/components/label-text";
import { type InformationPatientProps} from "../model/types"

const InformationPatient : FC<InformationPatientProps> = ({detailData, handleBack, handleNext, title}) => {

  return (
    <Stack gap={2}>

      <Typography variant="h5" color="secondary.darker">{title}</Typography>

      <LabelTextContainer listText={detailData} />

      <Box sx={{ display: "flex", placeContent: "space-between", gap: 2 }}>
        <Button fullWidth color="secondary" variant="outlined" size="large" onClick={handleBack}>Data Salah, Isi ulang nomor polis</Button>
        <Button fullWidth color="secondary" variant="contained" size="large" onClick={handleNext}>Data Sudah Benar, Lanjutkan</Button>
      </Box>
    </Stack>
  )
}

export default InformationPatient

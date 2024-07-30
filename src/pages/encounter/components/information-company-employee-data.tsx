import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { LabelTextContainer, type LabelTextProps } from 'src/components/label-text';
import { fAsterisk } from 'src/utils/helper';
import { type InformationCompanyEmployeeDataProps } from '../model/types';
import { useTranslate } from 'src/locales';

const InformationCompanyEmployeeData = (props: InformationCompanyEmployeeDataProps) => {
  const { t } = useTranslate();
  const { handleBack, handleNext } = props;

  const [detailData, _setDetailData] = useState<LabelTextProps[]>([
    { title: t('assurance.employee_number'), body: fAsterisk('100200300400') },
    { title: t('assurance.policy_holder_name'), body: 'Anisa Redina' },
    { title: t('assurance.guarantor_type'), body: 'Asuransi Kesehatan' },
    { title: t('assurance.insurance_company'), body: 'Allianz Life Insurance' },
    {
      title: t('assurance.address'),
      body: 'Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan',
    },
    { title: t('assurance.place_date_of_birth'), body: 'Malaysia, 11-04-2000' },
    { title: t('assurance.phone_number'), body: fAsterisk('085157902550') },
  ]);

  return (
    <Stack gap={2}>
      <Typography variant="h5" color="secondary.darker">
        {t('assurance.subtitle.detail_data_employee')}
      </Typography>

      <LabelTextContainer listText={detailData} />

      <Box sx={{ display: 'flex', placeContent: 'space-between', gap: 2 }}>
        <Button fullWidth color="secondary" variant="outlined" size="large" onClick={handleBack}>
          {t('assurance.button.incorrect_data')}
        </Button>
        <Button fullWidth color="secondary" variant="contained" size="large" onClick={handleNext}>
          {t('assurance.button.correct_data')}
        </Button>
      </Box>
    </Stack>
  );
};

export default InformationCompanyEmployeeData;

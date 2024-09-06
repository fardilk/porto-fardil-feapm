import { Alert, Box, Button, TableContainer } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { LabelTextProps } from 'src/components/label-text';
import { LabelTextContainer } from 'src/components/label-text';
import { fAsterisk } from 'src/utils/helper';
import type { PatientInformationProps } from '../model/types';
import { useTranslate } from 'src/locales';
import { useSelector } from 'src/store/store';

const PatientInformation = (props: PatientInformationProps) => {
  const { leftButtonProps, leftTextButton, rigthTextButton } = props;

  const isSimplify = useSelector((root) => root.config.simplify);

  const { t } = useTranslate();
  const { watch } = useFormContext();
  const isForeign = watch('citizenship');

  const [detailData, _setDetailData] = useState<LabelTextProps[]>([]);

  const [initData, setInitData] = useState<LabelTextProps[]>([
    { title: isForeign ? 'Passport' : 'NIK/Medrec', body: fAsterisk('100200300400') },
    { title: t('registration.fullname'), body: 'Anisa Redina' },
    { title: t('registration.gender'), body: 'Perempuan' },
    { title: t('registration.born_place_date'), body: 'Malaysia, 11-04-2000' },
    { title: t('registration.address_label'), body: t('registration.address') },
    { title: t('registration.phone_number'), body: fAsterisk('085157902550') },
    { title: t('registration.email'), body: 'anisa@gmail.com' },
  ]);

  const [moreData, setMoreData] = useState<LabelTextProps[]>([
    { title: t('registration.blood_type'), body: 'B' },
    { title: t('registration.religion'), body: 'Islam' },
    { title: t('registration.education'), body: t('registration.bachelor_degree') },
    { title: t('registration.marital_status'), body: t('registration.single') },
    { title: t('registration.occupation'), body: t('registration.private_employee') },
    { title: t('registration.daily_language'), body: t('registration.indonesian_language') },
  ]);

  useEffect(() => {
    if (!isSimplify) {
      _setDetailData([...initData, ...moreData]);
    }
    else{
      _setDetailData([...initData])
    }
  }, [isSimplify, initData, moreData]);

  return (
    <>
      <Alert color="warning" severity="warning">
        {t('registration.registered_patient')}
      </Alert>
      <TableContainer sx={{ my: 2 }}>
        <LabelTextContainer disableOutline orientation="horizontal" listText={detailData} col={1} />
      </TableContainer>

      <Box sx={{ display: 'flex', placeContent: 'space-between', gap: 2 }}>
        <Button size="large" variant="outlined" fullWidth color="secondary" {...leftButtonProps}>
          {leftTextButton}
        </Button>
        <Button size="large" variant="contained" fullWidth color="secondary" type='submit'>
          {rigthTextButton}
        </Button>
      </Box>
    </>
  );
};

export default PatientInformation;

import { Alert, Box, Button, TableContainer } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { LabelTextProps } from 'src/components/label-text';
import { LabelTextContainer } from 'src/components/label-text';
import { useTranslate } from 'src/locales';
import { useSelector } from 'src/store/store';
import { fAsterisk } from 'src/utils/helper';
import type { PatientInformationProps, RegistrationIForm } from '../model/types';
import { terminologyCodeMapper } from 'src/utils/terminology';
import { LoadingButton } from '@mui/lab';

const PatientInformation = (props: PatientInformationProps) => {
  const { leftButtonProps, leftTextButton, rigthTextButton } = props;

  const isSimplify = useSelector((root) => root.config.simplify);

  const { t } = useTranslate();
  const { watch, formState: { isSubmitting } } = useFormContext<RegistrationIForm>();
  const values = watch()
  const isForeign = watch('citizenship');

  const [detailData, setDetailData] = useState<LabelTextProps[]>([]);

  const initData = useMemo(() => {
    return [
      { title: isForeign ? 'Passport' : 'NIK/Medrec', body: fAsterisk(values.nik) },
      { title: t('registration.fullname'), body: values.name },
      { title: t('registration.gender'), body: terminologyCodeMapper({ code: values.gender?.value || '', key: 'terminology.gender' }) },
      { title: t('registration.born_place_date'), body: values.birthPlace },
      { title: t('registration.address_label'), body: values.address },
      { title: t('registration.phone_number'), body: fAsterisk(values.phoneNumber) },
      { title: t('registration.email'), body: values.email },
    ]
  }, [values, isForeign])

  const moreData = useMemo(() => {
    return [
      { title: t('registration.blood_type'), body: terminologyCodeMapper({ code: values.bloodType?.value || '', key: 'terminology.bloodType' }) },
      { title: t('registration.religion'), body: terminologyCodeMapper({ code: values.religion?.value || '', key: 'terminology.religion' }) },
      { title: t('registration.education'), body: terminologyCodeMapper({ code: values.study?.value || '', key: 'terminology.education' }) },
      { title: t('registration.marital_status'), body: terminologyCodeMapper({ code: values.marriage?.value || '', key: 'terminology.marital' }) },
      { title: t('registration.occupation'), body: terminologyCodeMapper({ code: values.job?.value || '', key: 'terminology.job' }) },
      { title: t('registration.daily_language'), body: terminologyCodeMapper({ code: values.language?.value || '', key: 'terminology.language' }) },
    ]
  }, [values])

  useEffect(() => {
    if (!isSimplify) {
      setDetailData([...initData, ...moreData]);
    }
    else {
      setDetailData([...initData])
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
        <LoadingButton
          loading={isSubmitting}
          size="large"
          variant="contained"
          fullWidth
          color="secondary"
          type='submit'
        >
          {rigthTextButton}
        </LoadingButton>
      </Box>
    </>
  );
};

export default PatientInformation;

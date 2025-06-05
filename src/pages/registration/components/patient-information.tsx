import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Stack, TableContainer, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { LabelTextContainer } from 'src/components/label-text';
import { OutlineCard } from 'src/components/outline-card';
import { useTranslate } from 'src/locales';
import { useSelector } from 'src/store/store';
import { fDate } from 'src/utils/format-time';
import { fAsterisk } from 'src/utils/helper';
import { terminologyCodeMapper } from 'src/utils/terminology';
import type { PatientInformationProps, RegistrationIForm } from '../model/types';
import { useNavigate } from 'react-router';

const PatientInformation = (props: PatientInformationProps) => {
  const { leftButtonProps, leftTextButton, rigthTextButton, showButtonRegist } = props;

  const isSimplify = useSelector((root) => root.config.simplify);

  const navigate = useNavigate()

  const { t } = useTranslate();
  const { formState: { isSubmitting } } = useFormContext<RegistrationIForm>();

  const values = useWatch()

  const isForeign = values?.citizenship === "WNA"

  const initData = useMemo(() => {
    const simple = [
      { title: isForeign ? 'Passport' : 'NIK', body: fAsterisk(values.nik) },
      { title: t('registration.fullname'), body: values.name },
      { title: t('registration.gender'), body: (terminologyCodeMapper({ defaultDisplay: values.gender?.label || '', code: values.gender?.value || '', key: 'terminology.gender' })) || '-' },
      { title: t('registration.born_place_date'), body: `${values.birthPlace}, ${fDate(values.birthDate)}` },
      { title: t('registration.address_label'), body: values.address },
      { title: t('registration.phone_number'), body: fAsterisk(values.phoneNumber) },
      { title: t('registration.email'), body: values.email },
    ]
    if (isSimplify) {
      return simple
    }
    return [
      ...simple,
      { title: t('registration.blood_type'), body: terminologyCodeMapper({ defaultDisplay: values.bloodType?.label || '', code: values.bloodType?.value || '', key: 'terminology.bloodType' }) || '-' },
      { title: t('registration.religion'), body: terminologyCodeMapper({ defaultDisplay: values.religion?.label || '', code: values.religion?.value || '', key: 'terminology.religion' }) },
      { title: t('registration.education'), body: terminologyCodeMapper({ defaultDisplay: values.study?.label || '', code: values.study?.value || '', key: 'terminology.education' }) },
      { title: t('registration.marital_status'), body: terminologyCodeMapper({ defaultDisplay: values.marriage?.label || '', code: values.marriage?.value || '', key: 'terminology.marital' }) },
      { title: t('registration.occupation'), body: terminologyCodeMapper({ defaultDisplay: values.job?.label || '', code: values.job?.value || '', key: 'terminology.job' }) },
      { title: t('registration.daily_language'), body: terminologyCodeMapper({ defaultDisplay: values.language?.label || '', code: values.language?.value || '', key: 'terminology.language' }) },
    ]
  }, [values, isForeign, isSimplify, t])

  return (
    <Stack spacing={1}>
      <Alert color="warning" severity="warning">
        {values.isRegistered ? t('registration.registered_patient') : t('registration.unregistered_patient')}
      </Alert>
      <Box sx={{ display: 'flex', gap: 1, }}>
        <TableContainer sx={{ my: 2 }}>
          <LabelTextContainer disableOutline orientation="horizontal" listText={initData} col={1} />
        </TableContainer>

        {
          showButtonRegist && (
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
          )
        }
      </Box>

      <Box sx={{ display: 'flex', placeContent: 'space-between', placeItems: 'center', gap: 2 }}>
        <Box sx={{ width: 1, display: 'flex', gap: 1 }}>
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
            sx={{ textWrap: 'nowrap' }}
          >
            {rigthTextButton}
          </LoadingButton>
        </Box>
      </Box>
    </Stack>
  );
};

export default PatientInformation;

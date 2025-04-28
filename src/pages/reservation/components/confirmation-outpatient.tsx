import { Box, Button, Checkbox, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CardBanner } from 'src/components/card-banner';
import { LabelTextContainer, type LabelTextProps } from 'src/components/label-text';
import { ModalInfoAndAction } from 'src/components/modal-info-and-action';
import { useTranslate } from 'src/locales';
import { SelectedLabPackage, SelectedPractioner, SelectedRadiologyPackage } from 'src/pages/encounter/model/types';
import { Patient } from 'src/pages/patient/model/types';
import { Nullable } from 'src/types/common';
import { fCurrency } from 'src/utils/format-number';
import { fDate, formatStr } from 'src/utils/format-time';
import { fAsterisk } from 'src/utils/helper';
import type { OutpatientType } from '../model/types';
import { getPaymentType } from '../model/variables';

const ConfirmationOutpatient = ({
  handleBack,
  handleConfirm,
  type,
  doctorInfo,
  reservationType,
  labPackage,
  patientDetail,
  radPackage
}: {
  handleBack: () => void;
  handleConfirm: () => Promise<void>;
  type: OutpatientType;
  patientDetail: Nullable<Patient>;
  doctorInfo: Nullable<SelectedPractioner>;
  labPackage: Nullable<SelectedLabPackage>;
  radPackage: Nullable<SelectedRadiologyPackage>
  reservationType: string;
}) => {

  const [loadingCreate, setLoadingCreate] = useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [acceptedTerm, setAcceptedTerm] = useState(false);
  const { t, currentLang } = useTranslate()

  const { watch } = useFormContext()

  const values = watch()

  const detailData: LabelTextProps[] = useMemo(() => [
    {
      title: t('appointment.patient.nik'),
      body: fAsterisk(patientDetail?.identifierValue ?? '-'),
    },
    { title: t('appointment.patient.fullname'), body: patientDetail?.name },
    {
      title: t('appointment.patient.birthdateplace'),
      body: `${patientDetail?.birthPlace}, ${patientDetail?.birthDttm}`,
    },
    {
      title: t('appointment.patient.address'),
      body: patientDetail?.address,
    },
    { title: t('appointment.patient.phone'), body: fAsterisk(patientDetail?.phone) },
    { title: t('appointment.patient.email'), body: patientDetail?.email },
  ], [t])

  const listCard = [
    ...(reservationType === 'RJ' && doctorInfo
      ? [
        {
          title: t('appointment.encounter.healthcare_service'),
          body: doctorInfo.polyName,
          localIcon: 'stethoscope',
        },
        {
          title: t('appointment.encounter.practitioner'),
          body: doctorInfo.doctor,
          localIcon: 'doctor',
        },
      ]
      : reservationType === 'LAB' && labPackage
        ? [
          {
            title: t('appointment.encounter.healthcare_service'),
            body: 'Laboratorium',
            localIcon: 'blood-test',
          },
          {
            title: labPackage.name,
            body: fCurrency(labPackage.price),
            localIcon: 'blood-test',
            titleProps: { variant: 'subtitle1', sx: { color: 'primary.darker' } },
            bodyProps: {
              variant: 'subtitle2',
              sx: { color: 'primary.darker', fontWeight: '500' },
            },
          },
        ]
        : reservationType === 'RAD' && radPackage ? [{
          title: t('appointment.encounter.healthcare_service'),
          body: 'Radiologi',
          localIcon: 'x-rays',
        },
        {
          title: radPackage.name,
          body: fCurrency(radPackage.price),
          localIcon: 'x-rays',
          titleProps: { variant: 'subtitle1', sx: { color: 'primary.darker' } },
          bodyProps: {
            variant: 'subtitle2',
            sx: { color: 'primary.darker', fontWeight: '500' },
          },
        },] : []),
    { ...getPaymentType(type, t) },
    ...(reservationType === 'RJ' && doctorInfo
      ? [
        {
          title: t('appointment.encounter.schedule'),
          body: (
            <Box>
              <Typography>

                {fDate(values?.date, formatStr.paramCase.dayDate, currentLang.value)} - {values?.bookTime?.label}
              </Typography>
            </Box>
          ),
          localIcon: 'jadwal',
        },
      ]
      : []),
  ];

  const buttonAction = [
    {
      action: async () => {
        setOpenConfirmDialog(false);
      },
      label: t('appointment.confirmation.recheck'),
      buttonProps: { variant: 'outlined', size: 'large', color: 'secondary', fullWidth: true, disabled: loadingCreate },
    },
    {
      action: async () => {
        try {
          setLoadingCreate(true)
          await handleConfirm();
        } catch (error) {
          console.log(error)
        } finally {
          setLoadingCreate(false)
        }
      },
      label: t('appointment.confirmation.confirm'),
      buttonProps: { variant: 'contained', size: 'large', color: 'secondary', fullWidth: true, loading: loadingCreate },
    },
  ];

  return (
    <Stack gap={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom variant="h5" color="secondary.darker">
            {t('appointment.patient.title')}
          </Typography>
          <LabelTextContainer listText={detailData} orientation="horizontal" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography gutterBottom variant="h5" color="secondary.darker">
            {t('appointment.encounter.title')}
          </Typography>
          <Grid container spacing={1}>
            {listCard.map((row, index) => {
              return (
                <Grid item xs={12} lg={6} key={index}>
                  <CardBanner
                    key={index}
                    {...row}
                    cardProps={{ variant: 'outlined' }}
                    titleProps={{ variant: 'subtitle2', sx: { color: 'grey' } }}
                    bodyProps={{ variant: 'subtitle2', sx: { color: 'primary.darker' } }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={acceptedTerm}
                onChange={(event) => setAcceptedTerm(event.target.checked)}
                size="medium"
                color="secondary"
              />
            }
            label={t('appointment.data_statement')}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', placeContent: 'space-between', gap: 2 }}>
        <Button
          color="secondary"
          fullWidth
          variant="outlined"
          size="large"
          onClick={() => handleBack()}
        >
          {t('appointment.change_registration')}
        </Button>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          size="large"
          disabled={!acceptedTerm}
          onClick={() => setOpenConfirmDialog(true)}
        >
          {t('appointment.confirm_registration')}
        </Button>
      </Box>

      <ModalInfoAndAction
        disableHeader
        dialogProps={{ maxWidth: 'sm' }}
        open={openConfirmDialog}
        handleClose={() => setOpenConfirmDialog(false)}
        title={t('appointment.confirmation.title')}
        subtitle={t('appointment.confirmation.subtitle')}
        child={buttonAction as any}
      />
    </Stack>
  );
};

export default ConfirmationOutpatient;

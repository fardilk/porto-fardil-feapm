import { Box, Button, Checkbox, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { CardBanner } from 'src/components/card-banner';
import { LabelTextContainer, type LabelTextProps } from 'src/components/label-text';
import { ModalInfoAndAction } from 'src/components/modal-info-and-action';
import { fAsterisk } from 'src/utils/helper';
import type {
  EncounterType,
  GetPatientByNIKResponse,
  OutpatientType,
  SelectedLabPackage,
  SelectedPractioner,
} from '../model/types';
import { getPaymentType } from '../model/variables';
import { useTranslate } from 'src/locales';
import { Nullable } from 'src/types/common';
import { fCurrency } from 'src/utils/format-number';

const ConfirmationOutpatient = ({
  handleBack,
  handleConfirm,
  type,
  patientDetail,
  doctorInfo,
  encounterType,
  labPackage,
}: {
  handleBack: () => void;
  handleConfirm: () => void;
  type: OutpatientType;
  patientDetail: GetPatientByNIKResponse;
  doctorInfo: Nullable<SelectedPractioner>;
  labPackage: Nullable<SelectedLabPackage>;
  encounterType: EncounterType;
}) => {
  const { t } = useTranslate();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [acceptedTerm, setAcceptedTerm] = useState(false);

  const detailData: LabelTextProps[] = [
    {
      title: t('appointment.patient.nik'),
      body: fAsterisk(patientDetail.nik ?? patientDetail.passportNumber ?? '-'),
    },
    { title: t('appointment.patient.fullname'), body: patientDetail.name },
    {
      title: t('appointment.patient.birthdateplace'),
      body: `${patientDetail.birthPlace}, ${patientDetail.birthDttm}`,
    },
    { title: t('appointment.patient.blood_type'), body: patientDetail.additional.bloodType },
    { title: t('appointment.patient.blood_rhesus'), body: patientDetail.additional.bloodRhesus },
    {
      title: t('appointment.patient.address'),
      body: patientDetail.address,
    },
    { title: t('appointment.patient.phone'), body: fAsterisk(patientDetail.phone) },
    { title: t('appointment.patient.email'), body: patientDetail.email },
  ];

  const listCard = [
    ...(encounterType === 'RJ' && doctorInfo
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
      : encounterType === 'LAB' && labPackage
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
        : []),
    { ...getPaymentType(type, t) },
    ...(encounterType === 'RJ' && doctorInfo
      ? [
          {
            title: t('appointment.encounter.schedule'),
            body: doctorInfo.serviceTime,
            localIcon: 'jadwal',
          },
        ]
      : []),
  ];

  const buttonAction = [
    {
      action: () => {
        setOpenConfirmDialog(false);
      },
      label: t('appointment.confirmation.recheck'),
      buttonProps: { variant: 'outlined', size: 'large', color: 'secondary', fullWidth: true },
    },
    {
      action: () => {
        handleConfirm();
      },
      label: t('appointment.confirmation.confirm'),
      buttonProps: { variant: 'contained', size: 'large', color: 'secondary', fullWidth: true },
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
          <Grid container spacing={2}>
            {listCard.map((row, index) => {
              return (
                <Grid item xs={12} md={6} key={index}>
                  <CardBanner
                    key={index}
                    {...row}
                    cardProps={{ variant: 'outlined' }}
                    titleProps={
                      row.titleProps
                        ? (row.titleProps as any)
                        : { variant: 'subtitle2', sx: { color: 'grey' } }
                    }
                    bodyProps={
                      row.bodyProps
                        ? (row.bodyProps as any)
                        : { variant: 'subtitle2', sx: { color: 'primary.darker' } }
                    }
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

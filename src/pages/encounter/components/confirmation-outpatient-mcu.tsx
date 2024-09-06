import { Box, Button, Checkbox, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { CardBanner } from 'src/components/card-banner';
import { LabelTextContainer, type LabelTextProps } from 'src/components/label-text';
import { ModalInfoAndAction } from 'src/components/modal-info-and-action';
import { fAsterisk } from 'src/utils/helper';
import { useTranslate } from 'src/locales';
import { getPaymentType } from '../model/variables';
import type { GetPatientByNIKResponse } from '../model/types';

const ConfirmationOutpatientMCU = ({
  handleBack,
  handleConfirm,
  packageName,
  patientDetail,
}: {
  handleBack: () => void;
  handleConfirm: () => void;
  patientDetail: GetPatientByNIKResponse;
  packageName: string;
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
    {
      ...getPaymentType('general', t),
    },
    {
      title: t('appointment.encounter.schedule'),
      body: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      localIcon: 'jadwal',
    },
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
            <Grid item xs={12}>
              <CardBanner
                title={t('appointment.encounter.service_type')}
                body={packageName}
                localIcon="medical-checkup"
                cardProps={{ variant: 'outlined' }}
                titleProps={{ variant: 'subtitle2', sx: { color: 'grey' } }}
                bodyProps={{ variant: 'subtitle2', sx: { color: 'primary.darker' } }}
              />
            </Grid>
            {listCard.map((row, index) => {
              return (
                <Grid item xs={12} md={6} key={index}>
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

export default ConfirmationOutpatientMCU;

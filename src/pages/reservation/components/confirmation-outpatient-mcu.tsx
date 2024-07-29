import { Box, Button, Checkbox, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { CardBanner } from 'src/components/card-banner';
import { LabelTextContainer, type LabelTextProps } from 'src/components/label-text';
import { ModalInfoAndAction } from 'src/components/modal-info-and-action';
import { fAsterisk } from 'src/utils/helper';
import type { OutpatientType } from '../model/types';
import { useTranslate } from 'src/locales';
import { getPaymentType } from '../model/variables';

const ConfirmationOutpatientMCU = ({
  handleBack,
  handleConfirm,
}: {
  handleBack: () => void;
  handleConfirm: () => void;
}) => {
  const { t } = useTranslate();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [acceptedTerm, setAcceptedTerm] = useState(false);

  const detailData: LabelTextProps[] = [
    { title: t('appointment.patient.nik'), body: fAsterisk('100200300400') },
    { title: t('appointment.patient.fullname'), body: 'Anisa Redina' },
    { title: t('appointment.patient.birthdateplace'), body: 'Malaysia, 11-04-2000' },
    { title: t('appointment.patient.blood_type'), body: 'B' },
    { title: t('appointment.patient.blood_rhesus'), body: 'Negatif' },
    {
      title: t('appointment.patient.address'),
      body: 'Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan',
    },
    { title: t('appointment.patient.phone'), body: fAsterisk('085157902550') },
    { title: t('appointment.patient.email'), body: 'anisa@gmail.com' },
  ];

  const tipeLayanan = 'Paket Premarital Wanita';

  const listCard = [
    {
      ...getPaymentType("general"),
    },
    {
      title: t('appointment.encounter.schedule'),
      body: 'Senin, 30-01-2022, 10:00-14:00',
      localIcon: 'jadwal',
    },
  ];

  const buttonAction = [
    {
      action: () => {
        setOpenConfirmDialog(false);
      },
      label: 'Periksa Kembali',
      buttonProps: { variant: 'outlined', size: 'large', color: 'secondary', fullWidth: true },
    },
    {
      action: () => {
        handleConfirm();
      },
      label: 'Konfirmasi Pendaftaran',
      buttonProps: { variant: 'contained', size: 'large', color: 'secondary', fullWidth: true },
    },
  ];

  return (
    <Stack gap={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom variant="h5" color="secondary.darker">
            Detail Pasien
          </Typography>
          <LabelTextContainer listText={detailData} orientation="horizontal" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography gutterBottom variant="h5" color="secondary.darker">
            Detail Kunjungan
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CardBanner
                title={t("appointment.encounter.service_type")}
                body={tipeLayanan}
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

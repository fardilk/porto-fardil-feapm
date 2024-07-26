import { Box, Button, Checkbox, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { CardBanner } from 'src/components/card-banner';
import { LabelTextContainer, type LabelTextProps } from 'src/components/label-text';
import { ModalInfoAndAction } from 'src/components/modal-info-and-action';
import { fAsterisk } from 'src/utils/helper';
import type { OutpatientType } from '../model/types';

const ConfirmationOutpatientMCU = ({
  handleBack,
  handleConfirm,
}: {
  handleBack: () => void;
  handleConfirm: () => void;
}) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [acceptedTerm, setAcceptedTerm] = useState(false);

  const [detailData, _setDetailData] = useState<LabelTextProps[]>([
    { title: 'NIK', body: fAsterisk('100200300400') },
    { title: 'Nama Lengkap', body: 'Anisa Redina' },
    { title: 'Tempat, Tanggal Lahir', body: 'Malaysia, 11-04-2000' },
    { title: 'Golongan Darah', body: 'B' },
    { title: 'Rhesus', body: 'Negatif' },
    {
      title: 'Alamat',
      body: 'Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan',
    },
    { title: 'No Telpon', body: fAsterisk('085157902550') },
    { title: 'Email', body: 'anisa@gmail.com' },
  ]);

  const tipeLayanan = 'Paket Premarital Wanita';

  const listCard = [
    {
      title: 'Tipe Pembayaran',
      body: 'Umum',
      localIcon: 'pembayaran-umum',
    },
    {
      title: 'Waktu Pelayanan',
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
                title="Tipe Pelayanan"
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
            label="Saya menyatakan bahwa apa yang telah saya beritahukan di atas adalah benar dan lengkap"
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
          Ubah Pendaftaran
        </Button>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          size="large"
          disabled={!acceptedTerm}
          onClick={() => setOpenConfirmDialog(true)}
        >
          Konfirmasi Daftar
        </Button>
      </Box>

      <ModalInfoAndAction
        disableHeader
        dialogProps={{ maxWidth: 'sm' }}
        open={openConfirmDialog}
        handleClose={() => setOpenConfirmDialog(false)}
        title="Konfirmasi Pendaftaran?"
        subtitle="Pastikan seluruh data Anda telah benar dan lengkap."
        child={buttonAction as any}
      />
    </Stack>
  );
};

export default ConfirmationOutpatientMCU;

import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertInformation } from 'src/components/alert-information';
import { CardBanner } from 'src/components/card-banner';
import { LabelTextContainer } from 'src/components/label-text';
import type { LabelTextProps } from 'src/components/label-text/types';
import { useBoolean, useCountdownSeconds } from 'src/hooks';
import { getDummyData } from 'src/pages/registration/model/functions';
import { fDate } from 'src/utils/format-time';
import { fAsterisk } from 'src/utils/helper';
import { toast } from 'src/components/snackbar';
import { useNavigate } from 'react-router';
import { buttonStyle } from '../model/variables';
import { ModalInfoAndAction } from 'src/components/modal-info-and-action';

const InformationBooking = () => {
  const navigate = useNavigate();

  const {
    startCountdown: startCountdown15,
    countdown: countdown15,
    counting: counting15,
  } = useCountdownSeconds(15);

  const {
    startCountdown: startCountdown2min,
    countdown: countdown2min,
    counting: counting2min,
  } = useCountdownSeconds(2 * 60);

  const [openPrint, setOpenPrint] = useState(false);

  const [headerData, _setHeaderData] = useState<LabelTextProps[]>([
    { title: 'NIK', body: fAsterisk('100200300400') },
    { title: 'Nama Lengkap', body: 'Hello World' },
    { title: 'Tanggal Lahir', body: fDate('04-05-2001', 'DD-MM-YYYY') },
    { title: 'No Telpon', body: fAsterisk('085157902550') },
    { title: 'Email', body: 'helloworld@gmail.com' },
    {
      title: 'Alamat',
      body: 'Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan',
      colSpan: 2,
    },
  ]);

  const [detailData, _setDetailData] = useState([
    { title: 'Tujuan Layanan', body: 'Poli Mata', localIcon: 'stethoscope' },
    { title: 'Dokter Pemeriksa', body: 'dr. Inas Shabrina,Sp.M', localIcon: 'doctor' },
    { title: 'Tipe Pembayaran', body: 'Umum', localIcon: 'pembayaran-umum' },
    { title: 'Waktu Pelayanan', body: 'Senin, 30-01-2022 10:00-14:00', localIcon: 'jadwal' },
  ]);

  const getCountdown15 = useMemo(() => {
    if (!counting15) return '00:00';
    return countdown15 < 10 ? `00:0${countdown15}` : `00:${countdown15}`;
  }, [countdown15, counting15]);

  const getCountdown2min = useMemo(() => {
    if (!counting2min) return '00:00';

    const minutes = Math.floor(countdown2min / 60);
    const seconds = countdown2min % 60;

    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }, [countdown2min, counting2min]);

  const HeaderPrint = useCallback(() => {
    return (
      <Box sx={{ display: 'flex', gap: 1, placeContent: 'end' }}>
        <Typography variant="button">Kembali ke dashboard dalam : </Typography>
        <Typography variant="button" color="grey">
          {getCountdown2min}
        </Typography>
      </Box>
    );
  }, [getCountdown2min]);

  const actionList = [
    {
      label: 'Kembali Ke Dashboard',
      buttonProps: { ...buttonStyle },
      action: () => navigate('/', { replace: true }),
    },
    {
      label: 'Cetak Ulang',
      buttonProps: { ...buttonStyle, variant: 'outlined', disabled: counting15 },
      action: () => {
        startCountdown15();
      },
    },
  ];

  useEffect(() => {
    if (countdown2min === 5) {
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 5000);
    }
  }, [countdown2min, navigate]);

  return (
    <Stack gap={4}>
      <AlertInformation
        title="Pendaftaran Anda telah kami terima."
        body="Silakan menuju ke nurse station untuk melaporkan kehadiran Anda."
      />

      <Box>
        <Typography variant="h5" gutterBottom>
          Detail Pasien
        </Typography>

        <LabelTextContainer listText={headerData} />
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Detail Kunjungan
        </Typography>

        <Grid container spacing={1}>
          {detailData.map((it, index) => {
            return (
              <Grid item xs={12} md={3}>
                <CardBanner
                  key={index}
                  {...it}
                  cardProps={{ variant: 'outlined' }}
                  titleProps={{ variant: 'subtitle2', color: 'grey' }}
                  bodyProps={{ variant: 'subtitle2', color: 'secondary.darker' }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Button
        variant="contained"
        size="large"
        fullWidth
        color="secondary"
        onClick={() => {
          setOpenPrint(true);
          startCountdown15();
          startCountdown2min();
        }}
      >
        Cetak Bukti Daftar
      </Button>

      <ModalInfoAndAction
        open={openPrint}
        handleClose={() => {
          setOpenPrint(false);
        }}
        title="Bukti Daftar Cetak"
        titleProps={{ variant: 'h3' }}
        dialogProps={{ maxWidth: 'sm' }}
        disableClose
        header={<HeaderPrint />}
        child={actionList}
      >
        <Stack gap={2}>
          <Typography textAlign="center">
            Simpan bukti daftar dan scan barcode yang tertera sebagai panduan Anda selama berada di
            rumah sakit kami
          </Typography>
          <Box>
            <Typography variant="subtitle1" textAlign="center">
              Bukti daftar tidak tercetak ?
            </Typography>
            <Typography textAlign="center">{getCountdown15}</Typography>
          </Box>
        </Stack>
      </ModalInfoAndAction>
    </Stack>
  );
};

export default InformationBooking;

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertInformation } from 'src/components/alert-information';
import { CardBanner } from 'src/components/card-banner';
import { LabelTextContainer, type LabelTextProps } from 'src/components/label-text';
import { ModalInfoAndAction } from 'src/components/modal-info-and-action';
import { fAsterisk } from 'src/utils/helper';
import type { SuccessOutpatientType } from '../model/types';
import { buttonStyle, getPaymentType } from '../model/variables';
import { useCountdownSeconds } from 'src/hooks';
import { useNavigate } from 'react-router';
import { useTranslate } from 'src/locales';

const SuccessOutpatient = (props: SuccessOutpatientType) => {
  const navigate = useNavigate();
  const { type, encounterType } = props;
  const {
    startCountdown: startCountdown15,
    countdown: countdown15,
    counting: counting15,
  } = useCountdownSeconds(15);

  const {
    startCountdown: startCountdown2min,
    countdown: countdown2min,
    counting: counting2min,
  } = useCountdownSeconds(2*60);
  const { t } = useTranslate()

  const [openPrint, setOpenPrint] = useState(false)
  const [detailData, _setDetailData] = useState<LabelTextProps[]>([
    { title: 'NIK', body: fAsterisk('100200300400') },
    { title: 'Nama Lengkap', body: 'Anisa Redina' },
    { title: 'Tempat, Tanggal Lahir', body: 'Malaysia, 11-04-2000' },
    { title: 'No Telpon', body: fAsterisk('085157902550') },
    { title: 'Golongan Darah', body: 'B' },
    { title: 'Rhesus', body: 'Negatif' },
    { title: 'Email', body: 'anisa@gmail.com' },
    {
      title: 'Alamat',
      body: 'Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan',
    },
  ]);

  const listCard = [
    ... encounterType === "RJ" ? [
      {
        title: 'Tujuan Pelayanan',
        body: 'Poli Mata',
        localIcon: 'stethoscope',
      },
      {
        title: 'Dokter Pemeriksa',
        body: 'dr. Inas Shabrina,Sp.M',
        localIcon: 'doctor',
      }
    ] : encounterType === "MCU" ? [
      {
        title: "Tipe Layanan",
        body: "Paket Perimetal Wanita",
        localIcon: "medical-checkup"
      }
    ] : [],
    {
      ...getPaymentType(type, t),
    },
    {
      title: 'Waktu Pelayanan',
      body: 'Senin, 30-01-2022, 10:00-14:00',
      localIcon: 'jadwal',
    },
  ];

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
      action: () => navigate('/', { replace: true}),
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
    if(countdown2min === 5) {
      setTimeout(() => {
        navigate('/', { replace: true });
      },5000)
    }
  },[countdown2min, navigate])

  return (
    <Stack gap={4}>
      <AlertInformation
        title="Pendaftaran Anda telah kami terima."
        body="Silakan menuju ke poli Anda."
      />

      <Box>
        <Typography variant="h5" color="primary.darker" gutterBottom>
          Detail Pasien
        </Typography>
        <LabelTextContainer listText={detailData} />
      </Box>

      <Box>
        <Typography variant="h5" color="primary.darker" gutterBottom>
          Detail Kunjungan
        </Typography>
        <Grid container spacing={2}>
          {listCard.map((row, index) => {
            return (
              <Grid item xs={12} md={12 / listCard.length} key={index}>
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
      </Box>

      <Box>
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
      </Box>

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

export default SuccessOutpatient;

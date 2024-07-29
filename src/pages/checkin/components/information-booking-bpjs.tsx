import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertInformation } from 'src/components/alert-information';
import { CardBanner } from 'src/components/card-banner';
import { LabelTextContainer } from 'src/components/label-text';
import type { LabelTextProps } from 'src/components/label-text/types';
import { getDummyData } from 'src/pages/registration/model/functions';
import { fDate } from 'src/utils/format-time';
import { fAsterisk } from 'src/utils/helper';
import { toast } from 'src/components/snackbar';
import { useBoolean, useCountdownSeconds } from 'src/hooks';
import { LoadingButton } from '@mui/lab';
import { useTranslate } from 'src/locales';
import { useNavigate } from 'react-router';
import { buttonStyle } from '../model/variables';
import { ModalInfoAndAction } from 'src/components/modal-info-and-action';

const InformationBookingBPJS = () => {
  const navigate = useNavigate();

  const { value: isPrinted, onTrue: setPrintedSuccess } = useBoolean();
  const {t} = useTranslate()
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

  const headerData : LabelTextProps[] = [
    { title: t("global.complete_name"), body: 'Hello World' },
    { title: 'NIK', body: fAsterisk('100200300400') },
    { title: t("global.gender"), body: 'Perempuan' },
    { title: `${t("global.location")}, ${t("global.birthdate")}`, body: `Malaysia, ${fDate('04-05-2001', 'DD-MM-YYYY')}` },
    { title: t("global.card_number"), body: '1001010101001010' },
    { title: t("global.class"), body: 'Kelas III' },
    { title: t("global.first_faskes"), body: 'Klinik Surya Medika' },
    { title: t("global.user_type"), body: 'Pekerja Mandiri' },
    { title: t("global.user_status"), body: 'Aktif' },
  ]

  const referenceData : LabelTextProps[] = [
    { title: t("global.referral_num"), body: fAsterisk('50040503009874') },
    { title: t("global.referral_date"), body: fDate('04-05-2001', 'DD-MM-YYYY') },
    { title: t("global.poli"), body: 'Poli Saraf' },
  ]

  const detailData = [
    { title: t("appointment.service_destination"), body: 'Poli Mata', localIcon: 'stethoscope' },
    { title: t("appointment.examining_doctor"), body: 'dr. Inas Shabrina,Sp.M', localIcon: 'doctor' },
    { title: t("global.payment_type"), body: 'BPJS', localIcon: 'bpjs' },
    { title: t("global.service_time"), body: 'Senin, 30-01-2022 10:00-14:00', localIcon: 'jadwal' },
  ]

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
      <AlertInformation title="Check-in Berhasil" body="Silakan menuju ke counter BPJS." />

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              {t("global.referral_detail")}
            </Typography>

            <LabelTextContainer col={1} listText={referenceData} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              {t("global.patient_detail")}
            </Typography>

            <LabelTextContainer listText={headerData} />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          {t("appointment.visit_detail")}
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
      <LoadingButton
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
        {t("global.print_registration")}
      </LoadingButton>

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

export default InformationBookingBPJS;

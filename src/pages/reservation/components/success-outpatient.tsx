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
  const { t } = useTranslate();
  const { type, reservationType } = props;
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

  const [openPrint, setOpenPrint] = useState(false)
  const detailData = useMemo(() => [
    { title: 'NIK', body: fAsterisk('100200300400') },
    { title: t("global.complete_name"), body: 'Anisa Redina' },
    { title: `${t("global.location")}, ${t("global.birthdate")}`, body: 'Malaysia, 11-04-2000' },
    { title: t("global.phone_number"), body: fAsterisk('085157902550') },
    { title: t("global.blood_type"), body: 'B' },
    { title: 'Rhesus', body: 'Negatif' },
    { title: 'Email', body: 'anisa@gmail.com' },
    {
      title: t("global.address"),
      body: 'Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan',
    },
  ],[])

  const listCard = [
    ... reservationType === "RJ" ? [
      {
        title: t("appointment.service_destination"),
        body: 'Poli Mata',
        localIcon: 'stethoscope',
      },
      {
        title: t("appointment.examining_doctor"),
        body: 'dr. Inas Shabrina,Sp.M',
        localIcon: 'doctor',
      }
    ] : reservationType === "MCU" ? [
      {
        title: t("appointment.encounter.service_type"),
        body: "Paket Perimetal Wanita",
        localIcon: "medical-checkup"
      }
    ] : [],
    {
      ...getPaymentType(type, t),
    },
    {
      title: t("appointment.encounter.schedule"),
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
        <Typography variant="button">{t("global.back_to_dashboard")} : </Typography>
        <Typography variant="button" color="grey">
          {getCountdown2min}
        </Typography>
      </Box>
    );
  }, [getCountdown2min,t]);

  const actionList = [
    {
      label: t("global.back_to_dashboard"),
      buttonProps: { ...buttonStyle },
      action: () => navigate('/', { replace: true}),
    },
    {
      label: t("global.reprint"),
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
        title={t("checkin.title_success")}
        body="Silakan menuju ke poli Anda. (note)"
      />

      <Box>
        <Typography variant="h5" color="primary.darker" gutterBottom>
          {t("global.patient_detail")}
        </Typography>
        <LabelTextContainer listText={detailData} />
      </Box>

      <Box>
        <Typography variant="h5" color="primary.darker" gutterBottom>
          {t("checkin.visit_detail")}
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
          {t("global.print_registration")}
        </Button>
      </Box>

      <ModalInfoAndAction
        open={openPrint}
        handleClose={() => {
          setOpenPrint(false);
        }}
        title={t("checkin.saved_proof")}
        titleProps={{ variant: 'h3' }}
        dialogProps={{ maxWidth: 'sm' }}
        disableClose
        header={<HeaderPrint />}
        child={actionList}
      >
        <Stack gap={2}>
          <Typography textAlign="center">
            {t("checkin.save_proof")}
          </Typography>
          <Box>
            <Typography variant="subtitle1" textAlign="center">
              {t("checkin.not_printed")}
            </Typography>
            <Typography textAlign="center">{getCountdown15}</Typography>
          </Box>
        </Stack>
      </ModalInfoAndAction>
    </Stack>
  );
};

export default SuccessOutpatient;

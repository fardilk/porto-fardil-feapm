import { LoadingButton } from '@mui/lab';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AlertInformation } from 'src/components/alert-information';
import { CardBanner } from 'src/components/card-banner';
import { LabelTextContainer } from 'src/components/label-text';
import type { LabelTextProps } from 'src/components/label-text/types';
import { useCountdownSeconds } from 'src/hooks';
import { fDate } from 'src/utils/format-time';
import { fAsterisk } from 'src/utils/helper';
import { useNavigate } from 'react-router';
import { buttonStyle } from '../model/variables';
import { ModalInfoAndAction } from 'src/components/modal-info-and-action';
import { type InformationType } from '../model/types';
import { useTranslate } from 'src/locales';

const InformationBooking: FC<InformationType> = ({ type, data }) => {
  const navigate = useNavigate();
  const { t } = useTranslate();

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

  const headerData = useMemo(() => {
    if (data.booking.payplanClass === 'BPJS') {
      return [
        { title: 'NIK', body: fAsterisk(data.booking.patient.nik) },
        { title: t('global.complete_name'), body: data.booking.patient.name },
        { title: t('global.gender'), body: data.booking.patient.gender },
        {
          title: `${t('global.location')}, ${t('global.birthdate')}`,
          body: `${data.booking.patient.birthPlace}, ${fDate(data.booking.patient.birthDttm, 'DD-MM-YYYY')}`,
        },
        { title: t('global.card_number'), body: '1001010101001010' },
        { title: t('global.class'), body: 'Kelas III' },
        { title: t('global.first_faskes'), body: 'Klinik Surya Medika' },
        { title: t('global.user_type'), body: 'Pekerja Mandiri' },
        { title: t('global.user_status'), body: 'Aktif' },
      ];
    }

    if (type === 'company' || type === 'insurance') {
      return [
        { title: 'NIK', body: fAsterisk('100200300400') },
        { title: t('global.complete_name'), body: 'Hello World' },
        { title: t('global.birthdate'), body: fDate('04-05-2001', 'DD-MM-YYYY') },
        { title: t('global.phone_number'), body: fAsterisk('085157902550') },
        { title: t('global.blood_type'), body: 'B' },
        { title: 'Rhesus', body: 'Negatif' },
        { title: 'Email', body: 'helloworld@gmail.com' },
        {
          title: t('global.address'),
          body: 'Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan',
        },
      ];
    }

    return [
      { title: 'NIK', body: fAsterisk(data.booking.patient.nik) },
      { title: t('global.complete_name'), body: data.booking.patient.name },
      { title: t('global.birthdate'), body: fDate(data.booking.patient.birthDttm, 'DD-MM-YYYY') },
      { title: t('global.phone_number'), body: fAsterisk(data.booking.patient.phone) },
      { title: 'Email', body: data.booking.patient.email },
      {
        title: t('global.address'),
        body: data.booking.patient.address,
        colSpan: 2,
      },
    ];
  }, [t, type]);

  const detailData = useMemo(() => {
    return [
      {
        title: t('checkin.service_destination'),
        body: data.booking.encounter.healthcareServiceName,
        localIcon: 'stethoscope',
      },
      {
        title: t('checkin.examining_doctor'),
        body: data.booking.encounter.practitionerName,
        localIcon: 'doctor',
      },
      {
        title: t('global.payment_type'),
        body:
          data.booking.payplanClass === 'BPJS'
            ? 'BPJS'
            : data.booking.payplanClass === 'INSURANCE'
              ? 'asuransi'
              : data.booking.payplanClass === 'COMPANY'
                ? 'Perusahaan'
                : 'Umum',
        localIcon:
          data.booking.payplanClass === 'BPJS'
            ? 'bpjs'
            : data.booking.payplanClass === 'INSURANCE'
              ? 'asuransi'
              : data.booking.payplanClass === 'COMPANY'
                ? 'perusahaan'
                : 'pembayaran-umum',
      },
      {
        title: t('global.service_time'),
        body: `${data.booking.encounter.scheduleSlotDate}, ${data.booking.encounter.scheduleSlotStartTime}`,
        localIcon: 'jadwal',
      },
    ];
  }, [t, type]);

  const referenceData: LabelTextProps[] = [
    { title: t('global.referral_num'), body: fAsterisk('50040503009874') },
    { title: t('global.referral_date'), body: fDate('04-05-2001', 'DD-MM-YYYY') },
    { title: t('global.poli'), body: 'Poli Saraf' },
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
        <Typography variant="button">{t('global.back_to_dashboard')} : </Typography>
        <Typography variant="button" color="grey">
          {getCountdown2min}
        </Typography>
      </Box>
    );
  }, [getCountdown2min, t]);

  const actionList = [
    {
      label: t('global.back_to_dashboard'),
      buttonProps: { ...buttonStyle },
      action: () => navigate('/', { replace: true }),
    },
    {
      label: t('global.reprint'),
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
        title={t('checkin.title_success')}
        body={data.booking.notes}
      />
      <Grid container spacing={2}>
        {type === 'bpjs' && (
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              {t('global.referral_detail')}
            </Typography>

            <LabelTextContainer col={1} listText={referenceData} />
          </Grid>
        )}
        <Grid item xs={12} md={type === 'bpjs' ? 8 : 12}>
          <Typography variant="h5" gutterBottom>
            {t('global.patient_detail')}
          </Typography>

          <LabelTextContainer listText={headerData} />
        </Grid>
      </Grid>

      <Box>
        <Typography variant="h5" gutterBottom>
          {t('checkin.visit_detail')}
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
        {t('global.print_registration')}
      </LoadingButton>

      <ModalInfoAndAction
        open={openPrint}
        handleClose={() => {
          setOpenPrint(false);
        }}
        title={t('checkin.saved_proof')}
        titleProps={{ variant: 'h3' }}
        dialogProps={{ maxWidth: 'sm' }}
        disableClose
        header={<HeaderPrint />}
        child={actionList}
      >
        <Stack gap={2}>
          <Typography textAlign="center">{t('checkin.save_proof')}</Typography>
          <Box>
            <Typography variant="subtitle1" textAlign="center">
              {t('checkin.not_printed')}
            </Typography>
            <Typography textAlign="center">{getCountdown15}</Typography>
          </Box>
        </Stack>
      </ModalInfoAndAction>
    </Stack>
  );
};

export default InformationBooking;

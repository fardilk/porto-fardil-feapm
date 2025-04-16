import { LoadingButton } from '@mui/lab';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { AlertInformation } from 'src/components/alert-information';
import { CardBanner } from 'src/components/card-banner';
import type { LabelTextProps } from 'src/components/label-text/types';
import { ModalInfoAndAction } from 'src/components/modal-info-and-action';
import { useCountdownSeconds } from 'src/hooks';
import { useTranslate } from 'src/locales';
import { printBarcode } from 'src/pages/appointment/model/functions';
import { fDate } from 'src/utils/format-time';
import { fAsterisk } from 'src/utils/helper';
import { BookingType } from '../model/types';
import { buttonStyle } from '../model/variables';
import { useSelector } from 'src/store/store';

const InformationBooking = ({ data }: { data: BookingType }) => {

  const { apmID } = useSelector((root) => root.config)

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

  const detailData = useMemo(() => {
    return [
      {
        title: t('checkin.service_destination'),
        body: data.encounter.healthcareServiceName,
        localIcon: 'stethoscope',
      },
      {
        title: t('checkin.examining_doctor'),
        body: data.encounter.practitionerName,
        localIcon: 'doctor',
      },
      {
        title: t('global.payment_type'),
        body:
          // data.booking.payplanClass === 'BPJS'
          //   ? 'BPJS'
          //   : data.booking.payplanClass === 'INSURANCE'
          //     ? 'Asuransi'
          //     : data.booking.payplanClass === 'COMPANY'
          //       ? 'Perusahaan'
          //       :
          'Umum',
        localIcon:
          // data.booking.payplanClass === 'BPJS'
          //   ? 'bpjs'
          //   : data.booking.payplanClass === 'INSURANCE'
          //     ? 'asuransi'
          //     : data.booking.payplanClass === 'COMPANY'
          //       ? 'perusahaan'
          //       :
          'pembayaran-umum',
      },
      {
        title: t('global.service_time'),
        body: (
          <Box>
            <Typography>
              {fDate(data.encounter.scheduleSlotDate, "dddd")}
            </Typography>

            <Typography>
              {fDate(data.encounter.scheduleSlotDate, "DD-MM-YYYY")}
            </Typography>
          </Box>
        ),
        localIcon: 'jadwal',
      },
    ];
  }, [t, data]);

  const referenceData: LabelTextProps[] = [
    { title: t('global.referral_num'), body: fAsterisk(data.bpjs?.referralNumber ?? '-') },
    {
      title: t('global.referral_date'),
      body: fDate(data.bpjs?.referralDate ?? '-', 'DD-MM-YYYY'),
    },
    { title: t('global.poli'), body: data.bpjs?.performerServiceName ?? '-' },
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
      action: async () => {
        // openDirectPrint(printUrlBuilder('encounters', ['apm-print-barcode', data?.bookingID || "-", 'QUEUE']))
        printBarcode({ dataType: 'QUEUE', encounterID: data?.bookingID || '', apmID })
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
      <AlertInformation title={t('checkin.title_success')} body={data.notes} />
      {/* <Grid container spacing={2}>
        {data.booking.payplanClass === 'BPJS' && (
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              {t('global.referral_detail')}
            </Typography>

            <LabelTextContainer col={1} listText={referenceData} />
          </Grid>
        )}
        <Grid item xs={12} md={data.booking.payplanClass === 'BPJS' ? 8 : 12}>
          <Typography variant="h5" gutterBottom>
            {t('global.patient_detail')}
          </Typography>

          <LabelTextContainer listText={headerData} />
        </Grid>
      </Grid> */}

      <Box>
        <Typography variant="h5" gutterBottom>
          {t('checkin.visit_detail')}
        </Typography>

        <Grid container spacing={1}>
          {detailData.map((it, index) => {
            return (
              <Grid item xs={12} md={3} key={index}>
                <CardBanner
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
          printBarcode({ dataType: 'QUEUE', encounterID: data?.bookingID || '', apmID })
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

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { AlertInformation } from 'src/components/alert-information';
import { CardBanner } from 'src/components/card-banner';
import { LabelTextContainer } from 'src/components/label-text';
import { ModalInfoAndAction } from 'src/components/modal-info-and-action';
import { useCountdownSeconds } from 'src/hooks';
import { useTranslate } from 'src/locales';
import { printBarcode } from 'src/pages/appointment/model/functions';
import { useSelector } from 'src/store/store';
import { fCurrency } from 'src/utils/format-number';
import { fDate, formatStr } from 'src/utils/format-time';
import { fAsterisk } from 'src/utils/helper';
import type { SuccessOutpatientType } from '../model/types';
import { buttonStyle, getPaymentType } from '../model/variables';

const SuccessOutpatient = (props: SuccessOutpatientType) => {
  const { type, reservationType, patientDetail, doctorInfo, labPackage, radPackage } = props;

  const navigate = useNavigate();
  const { t, currentLang } = useTranslate();
  const { watch } = useFormContext()
  const { apmID } = useSelector((root) => root.config)

  const values = watch()

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

  const [openPrint, setOpenPrint] = useState(false)
  const detailData = useMemo(() => [
    {
      title: t('appointment.patient.nik'),
      body: fAsterisk(patientDetail?.identifierValue ?? '-'),
    },
    { title: t('appointment.patient.fullname'), body: patientDetail?.name },
    {
      title: t('appointment.patient.birthdateplace'),
      body: `${patientDetail?.birthPlace}, ${patientDetail?.birthDttm}`,
    },
    {
      title: t('appointment.patient.address'),
      body: patientDetail?.address,
    },
    { title: t('appointment.patient.phone'), body: fAsterisk(patientDetail?.phone) },
    { title: t('appointment.patient.email'), body: patientDetail?.email },
  ], [t])

  const listCard = [
    ...(reservationType === 'RJ' && doctorInfo
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
      : reservationType === 'LAB' && labPackage
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
        : reservationType === 'RAD' && radPackage ? [{
          title: t('appointment.encounter.healthcare_service'),
          body: 'Radiologi',
          localIcon: 'x-rays',
        },
        {
          title: radPackage.name,
          body: fCurrency(radPackage.price),
          localIcon: 'x-rays',
          titleProps: { variant: 'subtitle1', sx: { color: 'primary.darker' } },
          bodyProps: {
            variant: 'subtitle2',
            sx: { color: 'primary.darker', fontWeight: '500' },
          },
        },] : []),
    { ...getPaymentType(type, t) },
    ...(reservationType === 'RJ' && doctorInfo
      ? [
        {
          title: t('appointment.encounter.schedule'),
          body: (
            <Box>
              <Typography>

                {fDate(values?.date, formatStr.paramCase.dayDate, currentLang.value)} - {values?.bookTime?.label}
              </Typography>
            </Box>
          ),
          localIcon: 'jadwal',
        },
      ]
      : []),
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
  }, [getCountdown2min, t]);

  const actionList = [
    {
      label: t("global.back_to_dashboard"),
      buttonProps: { ...buttonStyle },
      action: () => navigate('/', { replace: true }),
    },
    {
      label: t("global.reprint"),
      buttonProps: { ...buttonStyle, variant: 'outlined', disabled: counting15 },
      action: () => {
        // printIt(printUrlBuilder('struk-kunjungan-apm', [values?.resBookingID || "-"]))
        printBarcode({ dataType: 'BOOKING', encounterID: values?.resBookingID || '', apmID })
        startCountdown15();
      },
    },
  ];

  useEffect(() => {
    if (countdown2min === 5) {
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 5000)
    }
  }, [countdown2min, navigate])

  return (
    <Stack gap={4}>
      <AlertInformation
        title={t("appointment.accepted")}
        body={t("appointment.accepted_body")}
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
            // axiosInstance({ url: `/struk-kunjungan-apm/${values?.resBookingID || "-"}` })
            // printIt(printUrlBuilder('struk-kunjungan-apm', [values?.resBookingID || "-"]))
            printBarcode({ dataType: 'BOOKING', encounterID: values?.resBookingID || '', apmID })
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

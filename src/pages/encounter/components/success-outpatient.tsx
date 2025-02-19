import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { AlertInformation } from 'src/components/alert-information';
import { CardBanner } from 'src/components/card-banner';
import { LabelTextContainer } from 'src/components/label-text';
import { ModalInfoAndAction } from 'src/components/modal-info-and-action';
import { useCountdownSeconds } from 'src/hooks';
import { useTranslate } from 'src/locales';
import { fCurrency } from 'src/utils/format-number';
import { birtUrlBuilder, fAsterisk, openPrint as printIt } from 'src/utils/helper';
import type { SuccessOutpatientType } from '../model/types';
import { buttonStyle, getPaymentType } from '../model/variables';
import { useFormContext } from 'react-hook-form';

const SuccessOutpatient = ({
  type,
  encounterType,
  patientData,
  MCUPackageName,
  practitioner,
  labPackage,
  radiologyPackage,
}: SuccessOutpatientType) => {
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
  const { t } = useTranslate();

  const { watch } = useFormContext()

  const values = watch()

  const [openPrint, setOpenPrint] = useState(false);

  const detailData = useMemo(
    () => [
      { title: 'NIK', body: fAsterisk(patientData.identifierValue ?? '-') },
      { title: t('global.complete_name'), body: patientData.name },
      {
        title: `${t('global.location')}, ${t('global.birthdate')}`,
        body: `${patientData.birthPlace}, ${patientData.birthDttm}`,
      },
      { title: t('global.phone_number'), body: fAsterisk(patientData.phone) },
      { title: t('global.blood_type'), body: patientData.additional.bloodTypeDisplay || '' },
      { title: 'Rhesus', body: patientData.additional.bloodRhesusDisplay || '' },
      { title: 'Email', body: patientData.email },
      {
        title: t('global.address'),
        body: patientData.address,
      },
    ],
    [t, patientData]
  );

  const listCard = [
    ...(encounterType === 'RJ' && practitioner
      ? [
        {
          title: t('appointment.service_destination'),
          body: practitioner.polyName,
          localIcon: 'stethoscope',
        },
        {
          title: t('appointment.examining_doctor'),
          body: practitioner.doctor,
          localIcon: 'doctor',
        },
      ]
      : encounterType === 'MCU' && MCUPackageName
        ? [
          {
            title: t('appointment.encounter.service_type'),
            body: MCUPackageName,
            localIcon: 'medical-checkup',
          },
        ]
        : encounterType === 'LAB'
          ? [
            {
              title: t('appointment.service_destination'),
              body: 'Laboratorium',
              localIcon: 'blood-test',
            },
          ]
          : encounterType === 'RAD'
            ? [
              {
                title: t('appointment.service_destination'),
                body: 'Radiologi',
                localIcon: 'x-rays',
              },
            ]
            : []),
    {
      ...getPaymentType(type, t),
    },
    ...(encounterType === 'LAB' && labPackage
      ? [
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
      : encounterType === 'RAD' && radiologyPackage
        ? [
          {
            title: radiologyPackage.name,
            body: fCurrency(radiologyPackage.price),
            localIcon: 'x-rays',
            titleProps: { variant: 'subtitle1', sx: { color: 'primary.darker' } },
            bodyProps: {
              variant: 'subtitle2',
              sx: { color: 'primary.darker', fontWeight: '500' },
            },
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
        printIt(birtUrlBuilder('struk-kunjungan-apm', [values?.resBookingID || "-"]))
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
      <AlertInformation title={t('checkin.title_success')} body="Silakan menuju ke poli Anda." />

      <Box>
        <Typography variant="h5" color="primary.darker" gutterBottom>
          {t('global.patient_detail')}
        </Typography>
        <LabelTextContainer listText={detailData} />
      </Box>

      <Box>
        <Typography variant="h5" color="primary.darker" gutterBottom>
          {t('checkin.visit_detail')}
        </Typography>
        <Grid container spacing={2}>
          {listCard.map((row, index) => {
            return (
              <Grid item xs={12} md={12 / listCard.length} key={index}>
                <CardBanner
                  key={index}
                  {...row}
                  cardProps={{ variant: 'outlined' }}
                  titleProps={
                    row.titleProps
                      ? (row.titleProps as any)
                      : { variant: 'subtitle2', sx: { color: 'grey' } }
                  }
                  bodyProps={
                    row.bodyProps
                      ? (row.bodyProps as any)
                      : { variant: 'subtitle2', sx: { color: 'primary.darker' } }
                  }
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
            printIt(birtUrlBuilder('struk-kunjungan-apm', [values?.resBookingID || "-"]))
            setOpenPrint(true);
            startCountdown15();
            startCountdown2min();
          }}
        >
          {t('global.print_registration')}
        </Button>
      </Box>

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

export default SuccessOutpatient;

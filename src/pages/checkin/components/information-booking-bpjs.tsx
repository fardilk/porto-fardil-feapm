import { Box, Grid, Stack, Typography } from '@mui/material';
import { AlertInformation } from 'src/components/alert-information';
import { CardBanner } from 'src/components/card-banner';
import { LabelTextContainer } from 'src/components/label-text';
import type { LabelTextProps } from 'src/components/label-text/types';
import { getDummyData } from 'src/pages/registration/model/functions';
import { fDate } from 'src/utils/format-time';
import { fAsterisk } from 'src/utils/helper';
import { toast } from 'src/components/snackbar';
import { useBoolean } from 'src/hooks';
import { LoadingButton } from '@mui/lab';
import { useTranslate } from 'src/locales';

const InformationBookingBPJS = () => {
  const {
    value: isLoadingPrint,
    onFalse: stopLoadingPrint,
    onTrue: startLoadingPrint,
  } = useBoolean();

  const { value: isPrinted, onTrue: setPrintedSuccess } = useBoolean();
  const {t} = useTranslate()

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
    { title: t("doctor_visit.service_destination"), body: 'Poli Mata', localIcon: 'stethoscope' },
    { title: t("doctor_visit.examining_doctor"), body: 'dr. Inas Shabrina,Sp.M', localIcon: 'doctor' },
    { title: t("global.payment_type"), body: 'BPJS', localIcon: 'bpjs' },
    { title: t("global.service_time"), body: 'Senin, 30-01-2022 10:00-14:00', localIcon: 'jadwal' },
  ]

  const handleClickPrint = async () => {
    startLoadingPrint();
    await getDummyData('success');
    toast.success('Bukti daftar berhasil dicetak');
    setPrintedSuccess();
    stopLoadingPrint();
  };

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
          {t("doctor_visit.visit_detail")}
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
        loading={isLoadingPrint}
        onClick={handleClickPrint}
        disabled={isPrinted}
        variant="contained"
        color="secondary"
        size="large"
      >
        {t("global.print_registration")}
      </LoadingButton>
    </Stack>
  );
};

export default InformationBookingBPJS;

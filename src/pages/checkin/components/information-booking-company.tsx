import { LoadingButton } from "@mui/lab"
import { Box, Grid, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { AlertInformation } from "src/components/alert-information"
import { CardBanner } from "src/components/card-banner"
import { LabelTextContainer } from "src/components/label-text"
import type { LabelTextProps } from "src/components/label-text/types"
import { useBoolean } from "src/hooks"
import { fDate } from "src/utils/format-time"
import { fAsterisk } from "src/utils/helper"
import { toast } from 'src/components/snackbar';
import { getDummyData } from "src/pages/registration/model/functions"

const InformationBookingInsurance = () => {

  const {
    value: isLoadingPrint,
    onFalse: stopLoadingPrint,
    onTrue: startLoadingPrint,
  } = useBoolean();


  const { value: isPrinted, onTrue: setPrintedSuccess } = useBoolean();

  const [headerData, _setHeaderData] = useState<LabelTextProps[]>([
    { title: "NIK", body: fAsterisk("100200300400") },
    { title: "Nama Lengkap", body: "Hello World" },
    { title: "Tanggal Lahir", body: fDate("04-05-2001", "DD-MM-YYYY") },
    { title: "No Telpon", body: fAsterisk("085157902550") },
    { title: "Golongan Darah", body: "B" },
    { title: "Rhesus", body: "Negatif" },
    { title: "Email", body: "helloworld@gmail.com" },
    { title: "Alamat", body: "Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan" },
  ])

  const [detailData, _setDetailData] = useState([
    { title: "Tujuan Layanan", body: "Poli Mata", localIcon: "stethoscope" },
    { title: "Dokter Pemeriksa", body: "dr. Inas Shabrina,Sp.M", localIcon: "doctor" },
    { title: "Tipe Pembayaran", body: "Perusahaan", localIcon: "perusahaan" },
    { title: "Waktu Pelayanan", body: "Senin, 30-01-2022 10:00-14:00", localIcon: "jadwal" },
  ])

  const handleClickPrint = async () => {
    startLoadingPrint();
    await getDummyData('success');
    toast.success('Bukti daftar berhasil dicetak');
    setPrintedSuccess();
    stopLoadingPrint();
  };

  return (
    <Stack gap={4}>
      <AlertInformation
        title="Pendaftaran Anda telah kami terima."
        body="Silakan menuju ke counter jaminan untuk mengkonfirmasi benefit jaminan."
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

      <LoadingButton
        loading={isLoadingPrint}
        disabled={isPrinted}
        onClick={handleClickPrint}
        variant="contained"
        color="secondary"
        size="large"
      >
        Cetak Bukti Daftar
      </LoadingButton>
    </Stack>
  );
}

export default InformationBookingInsurance
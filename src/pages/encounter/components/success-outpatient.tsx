import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { useCallback, useState } from "react"
import { AlertInformation } from "src/components/alert-information"
import { CardBanner } from "src/components/card-banner"
import { LabelTextContainer, LabelTextProps } from "src/components/label-text"
import { ModalInfoAndAction } from "src/components/modal-info-and-action"
import { fAsterisk } from "src/utils/helper"
import { OutpatientType } from "../model/types"
import { buttonStyle, getPaymentType } from "../model/variables"

const SuccessOutpatient = (props: { type: OutpatientType }) => {

  const { type } = props

  const [openPrint, setOpenPrint] = useState(false)
  const [detailData, _setDetailData] = useState<LabelTextProps[]>([
    { title: "NIK", body: fAsterisk("100200300400") },
    { title: "Nama Lengkap", body: "Anisa Redina" },
    { title: "Tempat, Tanggal Lahir", body: "Malaysia, 11-04-2000" },
    { title: "No Telpon", body: fAsterisk("085157902550") },
    { title: "Golongan Darah", body: "B" },
    { title: "Rhesus", body: "Negatif" },
    { title: "Email", body: "anisa@gmail.com" },
    { title: "Alamat", body: "Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan" },
  ])

  const listCard = [
    {
      title: "Tujuan Pelayanan",
      body: "Poli Mata",
      localIcon: "stethoscope",
    },
    {
      title: "Dokter Pemeriksa",
      body: "dr. Inas Shabrina,Sp.M",
      localIcon: "doctor",
    },
    {
      ...getPaymentType(type)
    },
    {
      title: "Waktu Pelayanan",
      body: "Senin, 30-01-2022, 10:00-14:00",
      localIcon: "jadwal",
    },
  ]

  const HeaderPrint = useCallback(() => {

    return (
      <Box sx={{ display: 'flex', gap: 1, placeContent: 'end' }}>
        <Typography variant="button">Kembali ke dashboard dalam : </Typography>
        <Typography variant="button" color="grey">02:00</Typography>
      </Box>
    )
  }, [])

  const actionList = [
    {
      label: "Kembali Ke Dashboard",
      buttonProps: { ...buttonStyle },
      action: () => { }
    },
    {
      label: "Cetak Ulang",
      buttonProps: { ...buttonStyle, variant: "outlined" },
      action: () => { }
    },
  ]

  return (
    <Stack gap={4}>
      <AlertInformation
        title="Pendaftaran Anda telah kami terima."
        body="Silakan menuju ke poli Anda."
      />

      <Box>
        <Typography variant="h5" color="primary.darker" gutterBottom>Detail Pasien</Typography>
        <LabelTextContainer listText={detailData} />
      </Box>

      <Box>
        <Typography variant="h5" color="primary.darker" gutterBottom>Detail Kunjungan</Typography>
        <Grid container spacing={2}>
          {
            listCard.map((row, index) => {
              return (
                <Grid item xs={12} md={3} key={index}>
                  <CardBanner
                    key={index}
                    {...row}
                    cardProps={{ variant: "outlined" }}
                    titleProps={{ variant: "subtitle2", sx: { color: "grey" } }}
                    bodyProps={{ variant: "subtitle2", sx: { color: "primary.darker" } }}
                  />
                </Grid>
              )
            })
          }
        </Grid>
      </Box>

      <Box>
        <Button variant="contained" size="large" fullWidth color="secondary" onClick={() => { setOpenPrint(true) }}>Cetak Bukti Daftar</Button>
      </Box>

      <ModalInfoAndAction
        open={openPrint}
        handleClose={() => { setOpenPrint(false) }}
        title="Bukti Daftar Cetak"
        titleProps={{ variant: "h3" }}
        dialogProps={{ maxWidth: "sm" }}
        disableClose
        header={<HeaderPrint />}
        child={actionList}
      >
        <Stack gap={2}>
          <Typography textAlign="center">
            Simpan bukti daftar dan scan barcode yang tertera sebagai panduan Anda selama berada di rumah sakit kami
          </Typography>
          <Box>
            <Typography variant="subtitle1" textAlign="center">
              Bukti daftar tidak tercetak ?
            </Typography>
            <Typography textAlign="center">
              00:15
            </Typography>
          </Box>
        </Stack>
      </ModalInfoAndAction>
    </Stack>
  )
}

export default SuccessOutpatient

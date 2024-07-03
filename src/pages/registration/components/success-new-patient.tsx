import { Box, Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material"
import { Iconify } from "src/components/iconify"
import { fDate } from "src/utils/format-time"
import { fAsterisk } from "src/utils/helper"
import { SuccessNewPatientProps } from "../model/types"

const SuccessNewPatient = (props: SuccessNewPatientProps) => {

  const { handleFinish } = props

  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex", placeItems: "center", gap: 3 }}>
        <Iconify icon="icon-park-solid:check-one" color="success.main" sx={{ width: 32, transform: 'scale(2.5)' }} />
        <Box>
          <Typography variant="h5">Pendaftaran Anda telah kami terima.</Typography>
          <Typography variant="h4" color="secondary.main">Silakan menuju ke bagian administrasi untuk mengaktifkan rekam medis Anda.</Typography>
        </Box>
      </Box>

      <Typography variant="h5" gutterBottom>Detail Pasien</Typography>

      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography color="grey" variant="subtitle2">NIK</Typography>
              <Typography variant="subtitle2">{fAsterisk("100200300400")}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography color="grey" variant="subtitle2">Nama Lengkap</Typography>
              <Typography variant="subtitle2">Hello World</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography color="grey" variant="subtitle2">Tanggal Lahir</Typography>
              <Typography variant="subtitle2">{fDate("04-05-2001", "DD-MM-YYYY")}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography color="grey" variant="subtitle2">No Telpon</Typography>
              <Typography variant="subtitle2">{fAsterisk("085157902550")}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography color="grey" variant="subtitle2">Email</Typography>
              <Typography variant="subtitle2">helloworld@gmail.com</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography color="grey" variant="subtitle2">Alamt</Typography>
              <Typography variant="subtitle2">Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Button variant="outlined" color="secondary" onClick={handleFinish}>Selesai</Button>
    </Stack>
  )
}

export default SuccessNewPatient
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Iconify } from "src/components/iconify";

const BarcodePhone: FC = () => {
  return (
		<Stack gap={2}>
			<Typography variant="h4" textAlign="center">Silahkan buka link yang kami kirim ke nomor Anda, atau scan barcode di bawah ini</Typography>
			<Divider/>
			<Iconify icon="bi:qr-code" width={200} mx="auto"/>
			<Box sx={{ display: 'flex', placeContent: 'space-between', gap: 2 }}>
        <Button color="secondary" fullWidth variant="outlined" size="large">
          Link tidak terkirim? Kirim ulang link
        </Button>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          size="large"
        >
          Selesai
        </Button>
      </Box>
		</Stack>	
  )
}

export default BarcodePhone

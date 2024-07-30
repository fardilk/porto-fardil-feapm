import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Iconify } from "src/components/iconify";
import { useTranslate } from "src/locales";

const BarcodePhone: FC = () => {
const {t} = useTranslate()
return (
		<Stack gap={2}>
			<Typography variant="h4" textAlign="center">{t("registration.open_link_scan")}</Typography>
			<Divider/>
			<Iconify icon="bi:qr-code" width={200} mx="auto"/>
			<Box sx={{ display: 'flex', placeContent: 'space-between', gap: 2 }}>
        <Button color="secondary" fullWidth variant="outlined" size="large">
          {t("registration.button.send_link")}
        </Button>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          size="large"
        >
          {t("registration.button.done")}
        </Button>
      </Box>
		</Stack>	
  )
}

export default BarcodePhone

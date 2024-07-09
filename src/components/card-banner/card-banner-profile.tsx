import { Box, Card, CardContent, CardProps, Stack, Typography } from "@mui/material";
import { Iconify } from "../iconify";
import { Label } from "../label";
import { Image } from "../image";

export type CardBannerProfileProps = {
  icon?: string,
  cardProps?: CardProps;
  name: string,
  heathcareServiceName: string,
  slots: string;
  count: string
}

const CardBannerProfile = (props: CardBannerProfileProps) => {
  const { heathcareServiceName, count, name, slots, icon, cardProps } = props

  return (
    <Card variant="outlined" {...cardProps}>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 1, placeContent: 'space-between' }}>
          <Box>
            {icon && <Iconify icon={icon} width={52} />}
            {!icon && <Image src="/assets/app/icons/icon-doctor.svg" width={52} />}
          </Box>
          <Stack sx={{ width: '100%', gap: 2 }}>
            <Box>
              <Typography gutterBottom variant="h5">{name}</Typography>
              <Box sx={{ display: 'flex', placeContent: 'space-between', gap: 1 }}>
                <Label
                  sx={{ width: '100%' }}
                  color="success"
                  startIcon={<Iconify icon="streamline:medical-cross-sign-healthcare" />}>{heathcareServiceName}</Label>
                <Label
                  sx={{ width: '100%' }}
                  color="success"
                  startIcon={<Iconify icon="mdi:clock-outline" />}>{slots}</Label>
              </Box>
            </Box>

            <Box>
              <Typography color="grey">Jumlah Pasien</Typography>
              <Typography variant="subtitle2">{count}</Typography>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardBannerProfile
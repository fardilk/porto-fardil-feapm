import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { Iconify } from "../iconify";
import { Label } from "../label";
import { Image } from "../image";
import { ButtonBaseOverride } from "./card-banner";
import type { CardBannerProfileProps } from "./types";
import { getIconsPath } from "src/utils/helper";

const CardBannerProfile = (props: CardBannerProfileProps) => {
  const { heathcareServiceName, count, name, slots, icon, cardProps, clickable, onClick } = props

  return (
    <ButtonBaseOverride clickable={clickable} onClick={onClick} >
      <Card variant="outlined" sx={{ width: '100%', borderRadius: 0.8, ...cardProps?.sx }} {...cardProps}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 1, placeContent: 'space-between' }}>
            <Box>
              {icon && <Iconify icon={icon} width={52} />}
              {!icon && <Image src={getIconsPath("doctor")} width={52} />}
            </Box>
            <Stack sx={{ width: '100%', gap: 2, placeItems: 'start' }}>
              <Box sx={{ width: '100%' }}>
                <Typography gutterBottom variant="h5" textAlign="start">{name}</Typography>
              </Box>
                <Box sx={{ display: 'flex', placeContent: 'space-between', gap: 1 }}>
                  <Label
                    sx={{ width: '100%' }}
                    color="success"
                    startIcon={<Iconify icon="streamline:medical-cross-sign-healthcare" />}
                  >
                    {heathcareServiceName}
                  </Label>
                  <Label
                    sx={{ width: '100%' }}
                    color="success"
                    startIcon={<Iconify icon="mdi:clock-outline" />}
                  >
                    {slots}
                  </Label>
                </Box>

              <Box>
                <Typography color="grey">Jumlah Pasien</Typography>
                <Typography variant="subtitle2">{count}</Typography>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </ButtonBaseOverride>
  )
}

export default CardBannerProfile
import { alpha, Box, Button, Card, CardContent, Stack, Typography, useTheme } from "@mui/material";
import { getIconsPath } from "src/utils/helper";
import { Iconify } from "../iconify";
import { Image } from "../image";
import { Label } from "../label";
import { ButtonBaseOverride } from "./card-banner";
import type { CardBannerProfileReservationProps } from "./types";

const CardBannerProfileReservation = (props: CardBannerProfileReservationProps) => {
  const { heathcareServiceName, name, icon, cardProps, clickable, isFull, slot, onClick } = props

  const theme = useTheme()

  return (
    <ButtonBaseOverride clickable={clickable} onClick={onClick} >
      <Card variant="outlined" sx={{ width: '100%', height: '100%', borderRadius: 0.8, ...cardProps?.sx }} {...cardProps}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 1, placeContent: 'space-between' }}>
            <Box>
              {icon && <Iconify icon={icon} width={52} />}
              {!icon && <Image src={getIconsPath("doctor")} width={52} />}
            </Box>
            <Stack spacing={1} sx={{ width: '100%', placeItems: 'start' }}>
              <Box sx={{ width: '100%' }}>
                <Typography variant="h5" textAlign="start">{name}</Typography>
              </Box>

              <Box sx={{ display: 'flex', placeContent: 'space-between', gap: 1, width: '100%' }}>

                <Box
                  sx={{
                    display: "flex",
                    width: '100%',
                    px: 1,
                    py: 0.8,
                    borderRadius: 0.4,
                    gap: 1,
                    placeItems: "center",
                    bgcolor: alpha(theme.palette.success.lighter, 0.3),
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                  <Iconify icon="streamline:medical-cross-sign-healthcare" sx={{ width: 14 }} />
                  <Typography variant="subtitle2" noWrap>{heathcareServiceName}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', placeItems: 'center', gap: 1 }}>
                {
                  slot && (
                    <Label color={isFull ? "error" : "success"}>
                      Slot: {slot}
                    </Label>
                  )
                }

                {
                  isFull && (
                    <Label color="error" startIcon={<Iconify icon="solar:danger-triangle-bold-duotone" />}>
                      Jadwal Penuh
                    </Label>
                  )
                }
              </Box>

              <Box>
                <Button variant="outlined"
                  size="small"
                  color="secondary"
                  startIcon={<Iconify icon="material-symbols:info-outline-rounded" />}
                  sx={{ textWrap: 'nowrap' }}
                  onClick={(event) => {
                    event.stopPropagation()
                    onClick?.()
                  }}
                >
                  Lihat Profile dan Jadwal Dokter
                </Button>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card >
    </ButtonBaseOverride >
  )
}

export default CardBannerProfileReservation

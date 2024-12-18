import { Box, Card, CardContent, Stack, Typography, useTheme } from "@mui/material";
import { getIconsPath } from "src/utils/helper";
import { Iconify } from "../iconify";
import { Image } from "../image";
import { ButtonBaseOverride } from "./card-banner";
import type { CardBannerProfileProps } from "./types";

const CardBannerProfile = (props: CardBannerProfileProps) => {
  const { heathcareServiceName, count, name, slots, icon, cardProps, clickable, onClick } = props

  const theme = useTheme()

  return (
    <ButtonBaseOverride clickable={clickable} onClick={onClick} >
      <Card variant="outlined" sx={{ width: '100%', borderRadius: 0.8, ...cardProps?.sx }} {...cardProps}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 1, placeContent: 'space-between' }}>
            <Box>
              {icon && <Iconify icon={icon} width={52} />}
              {!icon && <Image src={getIconsPath("doctor")} width={52} />}
            </Box>
            <Stack sx={{ width: '100%', spacing: 1, placeItems: 'start' }}>
              <Box sx={{ width: '100%' }}>
                <Typography gutterBottom variant="h5" textAlign="start">{name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', placeContent: 'space-between', gap: 1, width: '100%' }}>

                <Box
                  sx={{
                    display: "flex",
                    width: '100%',
                    px: 1,
                    py: 0.2,
                    borderRadius: 0.4,
                    gap: 1,
                    placeItems: "center",
                    bgcolor: theme.palette.success.lighter,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                  <Iconify icon="streamline:medical-cross-sign-healthcare" sx={{ width: 14 }} />
                  <Typography variant="subtitle2" noWrap>{heathcareServiceName}</Typography>
                </Box>
                {
                  slots && (
                    <Box
                      sx={{
                        display: "flex",
                        width: '100%',
                        px: 1,
                        py: 0.2,
                        borderRadius: 0.4,
                        gap: 1,
                        placeItems: "center",
                        bgcolor: theme.palette.success.lighter,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                      <Iconify icon="streamline:medical-cross-sign-healthcare" sx={{ width: 14 }} />
                      <Typography noWrap variant="subtitle2">{slots}</Typography>
                    </Box>
                  )
                }
              </Box>

              {
                count && (
                  <Box>
                    <Typography color="grey">Jumlah Pasien</Typography>
                    <Typography variant="subtitle2" textAlign="start">{count}</Typography>
                  </Box>
                )
              }
            </Stack>
          </Box>
        </CardContent>
      </Card >
    </ButtonBaseOverride >
  )
}

export default CardBannerProfile

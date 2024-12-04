import { Box, Grid, Stack, Typography } from "@mui/material"
import { CardBanner } from "src/components/card-banner"
import { CardBannerProps } from "src/components/card-banner/types"
import { fAsterisk, getGridLayoutMappedValue } from "src/utils/helper"

export const IdentifierNotFound = ({ identifier, handleClick }: { identifier: string, handleClick: (param: string) => void }) => {

  const listCard: CardBannerProps[] = [
    {
      title: "Cari Ulang",
      body: "Cari Ulang NIK",
      localIcon: "search",
      onClick: () => { handleClick("search") }
    },
    // {
    //   title: "Melalui Ponsel Anda",
    //   body: "Walk-in Profile Baru dengan melalui ponsel anda"
    // },
    {
      title: "Melalui Anjungan",
      body: "Walk-In Profile Baru dengan melalui Anjungan ini",
      localIcon: "apm",
      onClick: () => { handleClick("anjungan") }
    }
  ]

  const md = getGridLayoutMappedValue(2)

  return (
    <Stack spacing={2}>
      <Box>
        <Typography align="center" variant="subtitle1" color="secondary.darker">NIK dengan nomor {fAsterisk(identifier)} tidak ditemukan.</Typography>
        <Typography align="center" variant="subtitle1" color="secondary.darker">Cari NIK lain atau Mengisi Profile Baru</Typography>
      </Box>


      <Grid container spacing={2}>
        {
          listCard.map((row, index) => {
            return (
              <Grid item xs={12} md={md} key={index}>
                <CardBanner
                  {...row}
                  cardProps={{ variant: 'outlined' }}
                  iconProps={{ sx: { width: 68 } }}
                  clickable
                  orientation="horizontal"
                />
              </Grid>
            )
          })
        }
      </Grid>
    </Stack>
  )
}

export default IdentifierNotFound

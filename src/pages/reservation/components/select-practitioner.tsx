import { Alert, Box, Button, Grid, Stack, TextField } from "@mui/material"
import { useState } from "react"
import { CardBanner, CardBannerProfile } from "src/components/card-banner"
import { Iconify } from "src/components/iconify"
import type { SelectPractitionerProps } from "../model/types"

const SelectPractitioner = (props: SelectPractitionerProps) => {
  const { onCardSelect } = props

  const [isPractitioner, setIsPractitioner] = useState(true)
  const [searchInput, setSearchInput] = useState("")

  const [currentIndex, setCurrentIndex] = useState(0)

  const listPractitioner = Array.from({ length: 60 }, (index) => ({ name: `dr.Liliana Hana Sp.M ` }))

  const listPoli = [
    { name: "Poli Umum" },
    { name: "Poli Mata" },
    { name: "Poli Paru" },
    { name: "Poli Kecantikan" },
    { name: "Poli THT" },
    { name: "Poli Obgyn" },
    { name: "Poli Jiwa" },
    { name: "Poli Digestive" },
    { name: "Poli Gigi" },
    { name: "Poli Anak" },
    { name: "Poli Jantung" },
    { name: "Poli Saraf" },
  ]

  const handleChangePagination = ({ action }: { action: "prev" | "next" }) => {
    const nextIndex = isPractitioner ? 6 : 16
    setCurrentIndex(prev => action === "prev" ? prev - nextIndex : prev + nextIndex)
  }

  return (
    <Stack gap={2}>
      <Grid container spacing={2}>
        {!isPractitioner && (
        <Grid item xs={12}>
          <Alert severity="info" >Setelah memilih poli, dokter akan dipilihkan secara otomatis</Alert>
        </Grid>

        )}
        <Grid item xs={12}>
          <TextField
            fullWidth
            onChange={(event) => { setSearchInput(event.target.value) }}
            value={searchInput}
            autoComplete="off"
            placeholder={isPractitioner ? "Cari Dokter" : "Cari Poli"}
            InputProps={{ startAdornment: <Iconify icon="fluent:search-12-regular" /> }}
          />
        </Grid>
        {
          isPractitioner && listPractitioner.slice(currentIndex, currentIndex + 6).map((_row, index) => {
            return (
              <Grid item xs={12} md={4} key={index}>
                <CardBannerProfile
                  heathcareServiceName="test"
                  count="20/30"
                  name={_row.name}
                  slots="12:00 - 13:00"
                  clickable
                  onClick={() => { onCardSelect() }}
                />
              </Grid>
            )
          })
        }
        {
          !isPractitioner && listPoli.slice(currentIndex, currentIndex + 16).map((_row, index) => {
            return (
              <Grid item xs={12} md={4} key={index}>
                <CardBanner
                  title={_row.name}
                  icon="/assets/app/icons/icon-doctor.svg"
                  cardProps={{ variant: "outlined" }}
                  clickable
                  onClick={() => { onCardSelect() }}
                />
              </Grid>
            )
          })
        }
      </Grid>
      <Box sx={{ width: '100%', display: 'flex', placeContent: 'space-between', gap: '10%' }}>
        <Button
          size="large"
          variant="outlined"
          color="secondary"
          onClick={() => { handleChangePagination({ action: "prev" }) }}
        >
          <Iconify icon="fluent:chevron-left-12-regular" />
        </Button>

        <Button
          size="large"
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => { setIsPractitioner(prev => !prev); setCurrentIndex(0) }}
        >
          {
            isPractitioner ? "Belum tahu dokter? Pilih Poli & Temukan Dokter Terdekat" : "Sudah tahu dokter? Pilih dokter"
          }
        </Button>

        <Button
          size="large"
          variant="outlined"
          color="secondary"
          onClick={() => { handleChangePagination({ action: "next" }) }}
        >
          <Iconify icon="fluent:chevron-right-12-regular" />
        </Button>
      </Box>
    </Stack>
  )
}

export default SelectPractitioner
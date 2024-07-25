import { Alert, Box, Button, Grid, Stack, TextField } from "@mui/material"
import { useState } from "react"
import { CardBanner, CardBannerProfile } from "src/components/card-banner"
import { Iconify } from "src/components/iconify"
import type { SelectRadServiceProps } from "../model/types"
import { fCurrency } from "src/utils/format-number"

const SelectRadService = (props: SelectRadServiceProps) => {
  const { onCardSelect } = props

  const [searchInput, setSearchInput] = useState("")

  const [currentIndex, setCurrentIndex] = useState(0)

  const listRadService = Array.from({ length: 60 }, (index) => ({ name: `CT Scan Kepala` }))

  const handleChangePagination = ({ action }: { action: "prev" | "next" }) => {
    const nextIndex = listRadService ? 6 : 16
    setCurrentIndex(prev => action === "prev" ? prev - nextIndex : prev + nextIndex)
  }

  return (
    <Stack gap={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            onChange={(event) => { setSearchInput(event.target.value) }}
            value={searchInput}
            autoComplete="off"
            placeholder="Cari Radiologi"
            InputProps={{ startAdornment: <Iconify icon="fluent:search-12-regular" color="gray" marginRight={1} /> }}
          />
        </Grid>
        {
          listRadService.slice(currentIndex, currentIndex + 6).map((_row, index) => {
            return (
              <Grid item xs={12} md={3} key={index}>
                <CardBanner
                    key={index}
                    localIcon= "blood-test"
                    cardProps={{ variant: "outlined" }}
                    body={fCurrency(50000)}
                    title={"CT Scan Kepala"}
                    titleProps={{ variant: "subtitle1", color: "secondary.dark" }}
                    bodyProps={{ variant: "body2", color: "secondary.dark" }}
                    clickable
                    onClick={onCardSelect}
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
          onClick={() => { handleChangePagination({ action: "next" }) }}
        >
          <Iconify icon="fluent:chevron-right-12-regular" />
        </Button>
      </Box>
    </Stack>
  )
}

export default SelectRadService
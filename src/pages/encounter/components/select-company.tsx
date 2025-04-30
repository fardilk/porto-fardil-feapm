import { Box, Button, ButtonBase, Card, Grid, Stack } from "@mui/material"
import { useState } from "react"
import { Iconify } from "src/components/iconify"
import { LabelTextCard } from "src/components/label-text"
import type { LabelTextProps } from "src/components/label-text/types"
import { fDate } from "src/utils/format-time"
import type { SelectCompanyProps } from "../model/types"
import { useTranslate } from "src/locales"

const SelectCompany = (props: SelectCompanyProps) => {
  const { handleSelect, handleSelectNew } = props

  const [currentIndex, setCurrentIndex] = useState(1)
  const { t } = useTranslate();

  const listInsuranceToCard = (param: typeof listCompanyAvailable[0]): LabelTextProps[] => {
    const { namaPerusahaan, ...rest } = param

    function getLabel<K extends keyof typeof rest>(key: K) {
      const mapFromKeyToLabel = {
        skemaPembayaran: t('assurance.payment_scheme'),
        nama: t('assurance.name'),
        masaBerlaku: t('assurance.validity_period'),
        noPolis: t(('assurance.policy_no')),
      }

      return mapFromKeyToLabel[key]
    }

    return Object.keys(rest).map((key) => {
      return {
        titleProps: { color: "secondary.dark", },
        bodyProps: { color: "secondary.dark", variant: "body2" },
        title: getLabel(key as any),
        body: `${(rest as any)[key]}`
      }
    })
  }

  const handleChangePagination = ({ action }: { action: "prev" | "next" }) => {

    setCurrentIndex(prev => action === "prev" ? prev - 2 : prev + 2)
  }

  return (
    <Stack gap={1}>
      <Grid container spacing={1}>

        {
          listCompanyAvailable.slice(currentIndex, currentIndex + 2).map((row, index) => {
            const textData = listInsuranceToCard(row)

            return (
              <Grid item xs={12} md={4} key={index}>
                <LabelTextCard
                  listText={textData}
                  clickable
                  orientation="horizontal"
                  onClick={handleSelect}
                  headerLocalIcon="perusahaan"
                  headerText={row.namaPerusahaan}
                />
              </Grid>
            )
          })
        }
      </Grid>

      <Box>
        <Button onClick={handleSelectNew} variant="contained" color="secondary">
          <Iconify icon="fluent:add-12-regular" sx={{ width: 32 }} />
        </Button>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', placeContent: 'space-between', gap: '10%' }}>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          disabled={currentIndex === 1}
          onClick={() => { handleChangePagination({ action: "prev" }) }}
        >
          <Iconify icon="fluent:chevron-left-12-regular" />
        </Button>

        <Button
          size="large"
          variant="contained"
          color="secondary"
          disabled={(currentIndex + 3) >= listCompanyAvailable.length}
          onClick={() => { handleChangePagination({ action: "next" }) }}
        >
          <Iconify icon="fluent:chevron-right-12-regular" />
        </Button>
      </Box>

    </Stack >
  )
}

export default SelectCompany


const listCompanyAvailable = [
  {
    namaPerusahaan: "PT BRI Group",
    skemaPembayaran: "BRI LIFE Good",
    nama: "Anisa Redina",
    masaBerlaku: fDate(new Date(), "DD-MM-YYYY"),
    noPolis: "-",
  },
  {
    namaPerusahaan: "PT PLN",
    skemaPembayaran: "PLN",
    nama: "Anisa Redina",
    masaBerlaku: fDate(new Date(), "DD-MM-YYYY"),
    noPolis: "100200",
  },
]

import { Box, Button, ButtonBase, Card, Grid, Stack } from "@mui/material"
import { useState } from "react"
import { Iconify } from "src/components/iconify"
import { LabelTextCard } from "src/components/label-text"
import { LabelTextProps } from "src/components/label-text/types"
import { fDate } from "src/utils/format-time"
import { SelectInsuranceProps } from "../model/types"
import { useTranslate } from "src/locales"

const SelectInsurance = (props: SelectInsuranceProps) => {
  const { handleSelect, handleSelectNew } = props

  const { t } = useTranslate();
  const [currentIndex, setCurrentIndex] = useState(0)

  const listInsuranceToCard = (param: typeof listInsuranceAvailable[0]): LabelTextProps[] => {
    const { namaAsuransi, ...rest } = param

    function getLabel<K extends keyof typeof rest>(key: K) {
      const mapFromKeyToLabel = {
        nama: t('assurance.name'),
        namaBenefit: t('assurance.benefit_name'),
        masaBerlaku: t('assurance.validity_period'),
        noPolis: t('assurance.policy_no'),
        noJaminan: t('assurance.guarantee_number'),
        noInhealth: t('assurance.inhealth_number'),
        hakKelasInhealth: t('assurance.inhealth_class_rights')
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

    setCurrentIndex(prev => action === "prev" ? prev - 3 : prev + 3)
  }

  return (
    <Stack gap={4}>
      <Grid container spacing={2}>

        {
          listInsuranceAvailable.slice(currentIndex, currentIndex + 3).map((row, index) => {
            const textData = listInsuranceToCard(row)

            return (
              <Grid item xs={12} md={3} key={index}>
                <LabelTextCard
                  listText={textData}
                  clickable
                  orientation="horizontal"
                  onClick={handleSelect}
                  headerLocalIcon="asuransi"
                  headerText={row.namaAsuransi}
                />
              </Grid>
            )
          })
        }

        <Grid item xs={12} md={3}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <ButtonBase sx={{ width: "100%", height: "100%" }} onClick={handleSelectNew}>
              <Iconify icon="fluent:add-12-regular" color="secondary.dark" sx={{ width: 32 }} />
            </ButtonBase>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', display: 'flex', placeContent: 'space-between', gap: '10%' }}>
        <Button
          size="large"
          variant="outlined"
          color="secondary"
          disabled={currentIndex === 0}
          onClick={() => { handleChangePagination({ action: "prev" }) }}
        >
          <Iconify icon="fluent:chevron-left-12-regular" />
        </Button>

        <Button
          size="large"
          variant="outlined"
          color="secondary"
          disabled={(currentIndex + 3) >= listInsuranceAvailable.length}
          onClick={() => { handleChangePagination({ action: "next" }) }}
        >
          <Iconify icon="fluent:chevron-right-12-regular" />
        </Button>
      </Box>

    </Stack >
  )
}

export default SelectInsurance


const listInsuranceAvailable = [
  {
    namaAsuransi: "Mandiri Inhealth",
    nama: "Anisa Redina",
    namaBenefit: "Mandiri Inhealth Gold",
    masaBerlaku: fDate(new Date(), "DD-MM-YYYY"),
    noPolis: "-",
    noJaminan: "-",
    noInhealth: "10020011",
    hakKelasInhealth: "Gold"
  },
  {
    namaAsuransi: "Allianz Life Insurance",
    nama: "Anisa Redina",
    namaBenefit: "AlliSya Hospital and Surgical Care +",
    masaBerlaku: fDate(new Date(), "DD-MM-YYYY"),
    noPolis: "100200",
    noJaminan: "1002001",
    noInhealth: "-",
    hakKelasInhealth: "-"
  },
  {
    namaAsuransi: "Mandiri Inhealth",
    nama: "Anisa Redina",
    namaBenefit: "Mandiri Inhealth Gold",
    masaBerlaku: fDate(new Date(), "DD-MM-YYYY"),
    noPolis: "100200",
    noJaminan: "1002001",
    noInhealth: "10020011",
    hakKelasInhealth: "Gold"
  },
  {
    namaAsuransi: "Mandiri Inhealth II",
    nama: "Anisa Redina",
    namaBenefit: "Mandiri Inhealth Gold",
    masaBerlaku: fDate(new Date(), "DD-MM-YYYY"),
    noPolis: "-",
    noJaminan: "-",
    noInhealth: "10020011",
    hakKelasInhealth: "Gold"
  },


]

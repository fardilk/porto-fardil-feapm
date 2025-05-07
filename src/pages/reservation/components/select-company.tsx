import { Box, Button, CircularProgress, Grid, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import { Iconify } from "src/components/iconify"
import { LabelTextCard } from "src/components/label-text"
import type { LabelTextProps } from "src/components/label-text/types"
import { useFetch } from "src/hooks/use-fetch"
import { useTranslate } from "src/locales"
import { companyList } from "src/modules/payorapm/functions"
import { Company } from "src/modules/payorapm/types"
import type { SelectCompanyProps } from "../model/types"

const SelectCompany = (props: SelectCompanyProps) => {
  const { handleSelect, handleSelectNew } = props

  const [currentIndex, setCurrentIndex] = useState(1)

  const { t } = useTranslate();

  const { setValue } = useFormContext()
  const values = useWatch()

  const { data: listInsurance, isLoading: loadingList, refetch: executeGet } = useFetch({ display: 3, page: 1, patientID: values?.patientId || '', keywords: '' }, companyList)

  const listInsuranceToCard = (param: Company): LabelTextProps[] => {
    const { companyName, companyId, ...rest } = param

    function getLabel<K extends keyof typeof rest.patient>(key: K) {
      const mapFromKeyToLabel: Partial<Company['patient']> = {
        name: t('company.info.name'),
        dateStart: t('company.info.date_start'),
        dateExpired: t('company.info.date_end'),
        policyNo: t('company.info.policy_no'),
        subscribeWarrantyNumber: t('company.info.warranty_no'),
        // scheme: t('company.info.scheme'),
      }

      return mapFromKeyToLabel[key]
    }

    const tempPatient = { ...rest.patient }

    delete tempPatient.patientCoverageID
    delete tempPatient.scheme

    return Object.keys(tempPatient || {}).map((key) => {

      return {
        titleProps: { color: "secondary.dark", },
        bodyProps: { color: "secondary.dark", variant: "body2" },
        title: getLabel(key as never) || '-',
        body: `${(tempPatient as any)[key]}` || '-'
      }
    })
  }

  const handleChangePagination = async ({ action }: { action: "prev" | "next" }) => {
    const index = action === "next" ? currentIndex + 1 : currentIndex - 1

    const response = await executeGet({ display: 3, keywords: '', page: index, patientID: values?.patientId })

    if (response?.status) {
      setCurrentIndex(prev => action === "prev" ? prev - 1 : prev + 1)
    }
  }

  return (
    <Stack gap={1}>
      <Grid container spacing={1}>

        {
          listInsurance?.data.map((row, index) => {
            const textData = listInsuranceToCard(row)
            return (
              <Grid item xs={12} md={4} key={index}>
                <LabelTextCard
                  listText={textData}
                  clickable
                  orientation="horizontal"
                  onClick={() => { setValue("selectedCompany", row); handleSelect() }}
                  headerLocalIcon="asuransi"
                  headerText={row.companyName}
                />
              </Grid>
            )
          })
        }

      </Grid>


      {
        loadingList && <Box sx={{ display: 'flex', placeContent: 'center' }}> <CircularProgress color="secondary" /> </Box>
      }

      {
        !loadingList && (listInsurance?.data.length === 0) && (
          <Typography variant="h5" sx={{ textAlign: 'center' }}>{t('encounter.outpatient.company.no_patient_data')}</Typography>
        )
      }

      <Box>
        <Button color="secondary" onClick={() => { handleSelectNew() }} variant="contained">
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
          disabled={currentIndex === (listInsurance?.pagination.totalPage || 1)}
          onClick={() => { handleChangePagination({ action: "next" }); }}
        >
          <Iconify icon="fluent:chevron-right-12-regular" />
        </Button>
      </Box>

    </Stack >
  )
}

export default SelectCompany

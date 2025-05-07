import { Box, CircularProgress, Grid, InputAdornment, Stack, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CardBanner } from 'src/components/card-banner';
import { RHFTextField } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { Keyboard } from 'src/components/keyboard';
import { useFetch } from 'src/hooks/use-fetch';
import { useTranslate } from 'src/locales';
import { insuranceListAll } from 'src/modules/payorapm/functions';
import { Insurance } from 'src/modules/payorapm/types';
import type { SelectInsuranceNewProps } from '../model/types';

const SelectInsuranceNew = (props: SelectInsuranceNewProps) => {
  const { handleSelect } = props;

  const [elementName, setElementName] = useState('');

  // const [valInsurance] = useWatch({ name: ['searchInsurance'] })

  // const [{ currentPage }, setState] = usePartialState({ currentPage: 1 })

  const { setValue } = useFormContext()

  const { t } = useTranslate();
  const searchRef = useRef<any>({});

  const { data: insuranceList, refetch: executeList, isLoading: loadingList } = useFetch({ display: 9, keywords: '', page: 1 }, insuranceListAll)

  const onSelect = (param: Insurance) => {
    setValue("createNewInsurance", true);
    setValue("insurance", param)
    setValue("createInsuranceName", param.insuranceName)
    handleSelect()
  }

  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RHFTextField
            name="searchInsurance"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="fluent:search-12-regular" />
                </InputAdornment>
              ),
            }}
            autoComplete="off"
            placeholder={t('assurance.search_insurance')}
            inputRef={(ref) => {
              searchRef.current.searchInsurance = ref;
            }}
            onClick={() => {
              setElementName('searchInsurance');
            }}
            onKeyDown={async (event) => {
              if (event.key === "Enter") {
                await executeList({ display: 6, keywords: (event.target as any).value, page: 1 })
              }
            }}
          />
        </Grid>
        {insuranceList?.data?.map((row, index) => {
          return (
            <Grid item xs={12} md={6} key={index}>
              <CardBanner
                clickable
                localIcon="asuransi"
                title={row.insuranceName}
                cardProps={{ variant: 'outlined' }}
                onClick={() => { onSelect(row) }}
              />
            </Grid>
          );
        })}
      </Grid>
      {
        loadingList && <Box sx={{ display: 'flex', placeContent: 'center', my: 2 }}> <CircularProgress /> </Box>
      }
      {
        !loadingList && insuranceList?.data.length === 0 && (
          <Typography variant="h5" sx={{ textAlign: 'center' }}>No Data</Typography>
        )
      }
      {elementName && (
        <Keyboard
          withDialog
          elementName={elementName}
          open={Boolean(elementName)}
          onClose={() => setElementName('')}
          ref={searchRef.current}
          inputType="text"
        />
      )}
    </Stack>
  );
};

export default SelectInsuranceNew;
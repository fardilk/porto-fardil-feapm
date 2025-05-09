import { Box, CircularProgress, Grid, InputAdornment, Stack, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CardBanner } from 'src/components/card-banner';
import { RHFTextField } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { Keyboard } from 'src/components/keyboard';
import { useFetch } from 'src/hooks/use-fetch';
import { useTranslate } from 'src/locales';
import { companyListAll } from 'src/modules/payorapm/functions';
import { Company } from 'src/modules/payorapm/types';
import type { SelectCompanyNewProps } from '../model/types';

const SelectCompanyNew = (props: SelectCompanyNewProps) => {
  const { handleSelect } = props;

  const [elementName, setElementName] = useState('');

  const searchRef = useRef<any>({});
  const { t } = useTranslate();
  const { setValue } = useFormContext()

  const { data: insuranceList, refetch: executeList, isLoading: loadingList } = useFetch({ display: 9, keywords: '', page: 1, isHavingActiveContract: true }, companyListAll)

  const onSelect = (param: Company) => {
    setValue("createNewInsurance", true);
    setValue("company", param)
    setValue("createCompanyName", param.companyName)
    handleSelect()
  }

  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RHFTextField
            name="searchCompany"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="fluent:search-12-regular" />
                </InputAdornment>
              ),
            }}
            autoComplete="off"
            placeholder={t(('assurance.search_company'))}
            inputRef={(ref) => {
              searchRef.current.searchCompany = ref;
            }}
            onClick={() => {
              setElementName('searchCompany');
            }}
            onKeyDown={async (event) => {
              if (event.key === "Enter") {
                await executeList({ display: 6, keywords: (event.target as any).value, page: 1, isHavingActiveContract: true })
              }
            }}
          />
        </Grid>
        {insuranceList?.data?.map((row, index) => {
          return (
            <Grid item xs={12} md={6} key={index}>
              <CardBanner
                clickable
                localIcon="perusahaan"
                title={row.companyName}
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

export default SelectCompanyNew;

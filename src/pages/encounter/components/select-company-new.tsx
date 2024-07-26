import { Grid, InputAdornment, Stack } from '@mui/material';
import { CardBanner } from 'src/components/card-banner';
import { SelectCompanyNewProps } from '../model/types';
import { useRef, useState } from 'react';
import { RHFTextField } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { Keyboard } from 'src/components/keyboard';

const SelectCompanyNew = (props: SelectCompanyNewProps) => {
  const [elementName, setElementName] = useState('');

  const searchRef = useRef<any>({});

  const { handleSelect } = props;

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
            placeholder="Cari Perusahaan"
            inputRef={(ref) => {
              searchRef.current.searchCompany = ref;
            }}
            onClick={() => {
              setElementName('searchCompany');
            }}
          />
        </Grid>
        {listInsurance.map((row, index) => {
          return (
            <Grid item xs={12} md={4} key={index}>
              <CardBanner
                clickable
                localIcon="asuransi"
                title={row.label}
                cardProps={{ variant: 'outlined' }}
                onClick={handleSelect}
              />
            </Grid>
          );
        })}
      </Grid>
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

const listInsurance = [
  { label: 'PT PLN' },
  { label: 'PT Pertamina' },
  { label: 'PT Sismedika' },
  { label: 'PT AXA Insurance Indonesia' },
  { label: 'PT Asuransi Jiwa Astra' },
  { label: 'PT Chubb Life Insurance' },
  { label: 'PT Manulife Indonesia' },
  { label: 'PT Prudential Life Assurance' },
  { label: 'PT Asuransi Sinar Mas' },
];

import { Grid, InputAdornment, Stack } from '@mui/material';
import { CardBanner } from 'src/components/card-banner';
import { SelectInsuranceNewProps } from '../model/types';
import { useRef, useState } from 'react';
import { RHFTextField } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { Keyboard } from 'src/components/keyboard';

const SelectInsuranceNew = (props: SelectInsuranceNewProps) => {
  const { handleSelect } = props;

  const [elementName, setElementName] = useState('');

  const searchRef = useRef<any>({});

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
            placeholder="Cari Asuransi"
            inputRef={(ref) => {
              searchRef.current.searchInsurance = ref;
            }}
            onClick={() => {
              setElementName('searchInsurance');
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

export default SelectInsuranceNew;

const listInsurance = [
  { label: 'Allianz Life Insurance' },
  { label: 'AIA Insurance' },
  { label: 'BRI Insurance' },
  { label: 'AXA Insurance Indonesia' },
  { label: 'Asuransi Jiwa Astra' },
  { label: 'Chubb Life Insurance' },
  { label: 'Manulife Indonesia' },
  { label: 'Prudential Life Assurance' },
  { label: 'Asuransi Sinar Mas' },
];

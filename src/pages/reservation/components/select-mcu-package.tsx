import { Box, Grid, Typography, Button, InputAdornment } from '@mui/material';
import { useRef, useState, type FC } from 'react';
import { Iconify } from 'src/components/iconify';
import { type SelectMCUPackageProps } from '../model/types';
import LabelListTextCard from './label-list-text-card';
import { RHFTextField } from 'src/components/hook-form';
import { Keyboard } from 'src/components/keyboard';

const SelectMCUPackage: FC<SelectMCUPackageProps> = ({ handleSelect }) => {
  const [elementName, setElementName] = useState('');

  const searchRef = useRef<any>({});

  const handleChangePagination = ({ action }: { action: 'prev' | 'next' }) => {
    console.log(action);
  };

  const listPackage = [
    {
      name: 'Paket Prematerial Wanita',
      list: [
        'Darah lengkap + LED',
        'Golongan Darah + Rhesus',
        'Glukosa Puasa',
        'HBX',
        'Anti HIV',
        'Toxoplasma IgG',
        'Rubella IgG',
        'CMV IgG',
      ],
      price: 'Rp 720.000',
      action: handleSelect,
    },
    {
      name: 'Paket Prematerial Wanita',
      list: [
        'Darah lengkap + LED',
        'Golongan Darah + Rhesus',
        'Glukosa Puasa',
        'HBX',
        'Anti HIV',
        'Toxoplasma IgG',
        'Rubella IgG',
        'CMV IgG',
      ],
      price: 'Rp 720.000',
      action: handleSelect,
    },
    {
      name: 'Paket Prematerial Wanita',
      list: [
        'Darah lengkap + LED',
        'Golongan Darah + Rhesus',
        'Glukosa Puasa',
        'HBX',
        'Anti HIV',
        'Toxoplasma IgG',
        'Rubella IgG',
        'CMV IgG',
      ],
      price: 'Rp 720.000',
      action: handleSelect,
    },
    {
      name: 'Paket Prematerial Wanita',
      list: [
        'Darah lengkap + LED',
        'Golongan Darah + Rhesus',
        'Glukosa Puasa',
        'HBX',
        'Anti HIV',
        'Toxoplasma IgG',
        'Rubella IgG',
        'CMV IgG',
      ],
      price: 'Rp 720.000',
      action: handleSelect,
    },
  ];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RHFTextField
          name="searchMCUPackage"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="fluent:search-12-regular" />
              </InputAdornment>
            ),
          }}
          autoComplete="off"
          placeholder="Cari MCU"
          inputRef={(ref) => {
            searchRef.current.searchMCUPackage = ref;
          }}
          onClick={() => {
            setElementName('searchMCUPackage');
          }}
        />
      </Grid>
      {listPackage.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <LabelListTextCard
            action={item.action}
            headerText={item.name}
            listText={item.list}
            sectionBottom={
              <Box
                bgcolor="#28B87A1A"
                padding={0.8}
                justifyContent="center"
                alignItems="center"
                display="flex"
                marginTop={1}
              >
                <Typography variant="caption" color="secondary.dark" textAlign="center">
                  {item.price}
                </Typography>
              </Box>
            }
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Box sx={{ width: '100%', display: 'flex', placeContent: 'space-between', gap: '10%' }}>
          <Button
            size="large"
            variant="outlined"
            color="secondary"
            onClick={() => {
              handleChangePagination({ action: 'prev' });
            }}
          >
            <Iconify icon="fluent:chevron-left-12-regular" />
          </Button>

          <Button
            size="large"
            variant="outlined"
            color="secondary"
            onClick={() => {
              handleChangePagination({ action: 'next' });
            }}
          >
            <Iconify icon="fluent:chevron-right-12-regular" />
          </Button>
        </Box>
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
    </Grid>
  );
};

export default SelectMCUPackage;

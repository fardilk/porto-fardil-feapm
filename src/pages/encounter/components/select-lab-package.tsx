import { Box, Button, Grid, InputAdornment, Stack } from '@mui/material';
import { useRef, useState } from 'react';
import { CardBanner } from 'src/components/card-banner';
import { Iconify } from 'src/components/iconify';
import { fCurrency } from 'src/utils/format-number';
import { RHFTextField } from 'src/components/hook-form';
import { Keyboard } from 'src/components/keyboard';
import type { SelectLabPackageProps } from '../model/types';
import { useTranslate } from 'src/locales';

const SelectLabPackage = (props: SelectLabPackageProps) => {
  const { t } = useTranslate();

  const { onCardSelect } = props;

  const [elementName, setElementName] = useState('');

  const searchRef = useRef<any>({});

  const [currentIndex, setCurrentIndex] = useState(0);

  const listLabPackage = Array.from({ length: 60 }, (index) => ({
    name: `Paket Cek Kesehatan Umum`,
  }));

  const handleChangePagination = ({ action }: { action: 'prev' | 'next' }) => {
    const nextIndex = listLabPackage ? 6 : 16;
    setCurrentIndex((prev) => (action === 'prev' ? prev - nextIndex : prev + nextIndex));
  };

  return (
    <>
      <Stack gap={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name="searchLabPackage"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="fluent:search-12-regular" />
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              placeholder={t('encounter.laboratory.package_find')}
              inputRef={(ref) => {
                searchRef.current.searchLabPackage = ref;
              }}
              onClick={() => {
                setElementName('searchLabPackage');
              }}
            />
          </Grid>
          {listLabPackage.slice(currentIndex, currentIndex + 6).map((_row, index) => {
            return (
              <Grid item xs={12} md={3} key={index}>
                <CardBanner
                  key={index}
                  localIcon="blood-test"
                  cardProps={{ variant: 'outlined' }}
                  body={fCurrency(50000)}
                  title={'Paket Cek Kesehatan Umum'}
                  titleProps={{ variant: 'subtitle1', color: 'secondary.dark' }}
                  bodyProps={{ variant: 'body2', color: 'secondary.dark' }}
                  clickable
                  onClick={onCardSelect}
                />
              </Grid>
            );
          })}
        </Grid>
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
      </Stack>
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
    </>
  );
};

export default SelectLabPackage;

import { Alert, Box, Button, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { CardBanner, CardBannerProfile } from 'src/components/card-banner';
import { Iconify } from 'src/components/iconify';
import type { SelectRadServiceProps } from '../model/types';
import { fCurrency } from 'src/utils/format-number';
import { Keyboard } from 'src/components/keyboard';
import { RHFTextField } from 'src/components/hook-form';
import { useTranslate } from 'src/locales';

const SelectRadService = (props: SelectRadServiceProps) => {
  const { t } = useTranslate();
  
  const { onCardSelect } = props;

  const [elementName, setElementName] = useState('');

  const searchRef = useRef<any>({});

  const [currentIndex, setCurrentIndex] = useState(0);

  const listRadService = Array.from({ length: 60 }, (index) => ({ name: `CT Scan Kepala` }));

  const handleChangePagination = ({ action }: { action: 'prev' | 'next' }) => {
    const nextIndex = listRadService ? 6 : 16;
    setCurrentIndex((prev) => (action === 'prev' ? prev - nextIndex : prev + nextIndex));
  };

  return (
    <>
      <Stack gap={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name="searchRadiologi"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="fluent:search-12-regular" />
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              placeholder={t('encounter.radiology.package_find')}
              inputRef={(ref) => {
                searchRef.current.searchRadiologi = ref;
              }}
              onClick={() => {
                setElementName('searchRadiologi');
              }}
            />
          </Grid>
          {listRadService.slice(currentIndex, currentIndex + 6).map((_row, index) => {
            return (
              <Grid item xs={12} md={3} key={index}>
                <CardBanner
                  key={index}
                  localIcon="x-rays"
                  cardProps={{ variant: 'outlined' }}
                  body={fCurrency(50000)}
                  title={'CT Scan Kepala'}
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

export default SelectRadService;

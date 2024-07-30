import { Alert, Box, Button, Grid, Stack } from '@mui/material';
import { useRef, useState } from 'react';
import { CardBanner, CardBannerProfile } from 'src/components/card-banner';
import { Iconify } from 'src/components/iconify';
import type { SelectPractitionerProps } from '../model/types';
import { Keyboard } from 'src/components/keyboard';
import { RHFTextField } from 'src/components/hook-form';
import { useTranslate } from 'src/locales';

const SelectPractitioner = (props: SelectPractitionerProps) => {
  const { t } = useTranslate();

  const { onCardSelect } = props;

  const [isPractitioner, setIsPractitioner] = useState(true);
  const [elementName, setElementName] = useState('');

  const [currentIndex, setCurrentIndex] = useState(0);

  const searchRef = useRef<any>({});

  const listPractitioner = Array.from({ length: 60 }, (index) => ({
    name: `dr.Liliana Hana Sp.M `,
  }));

  const listPoli = [
    { name: 'Poli Umum' },
    { name: 'Poli Mata' },
    { name: 'Poli Paru' },
    { name: 'Poli Kecantikan' },
    { name: 'Poli THT' },
    { name: 'Poli Obgyn' },
    { name: 'Poli Jiwa' },
    { name: 'Poli Digestive' },
    { name: 'Poli Gigi' },
    { name: 'Poli Anak' },
    { name: 'Poli Jantung' },
    { name: 'Poli Saraf' },
  ];

  const handleChangePagination = ({ action }: { action: 'prev' | 'next' }) => {
    const nextIndex = isPractitioner ? 6 : 16;
    setCurrentIndex((prev) => (action === 'prev' ? prev - nextIndex : prev + nextIndex));
  };

  return (
    <>
      <Stack gap={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {!isPractitioner && (
              <Alert severity="info">
                Setelah memilih poli, dokter akan dipilihkan secara otomatis
              </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name="searchPoli"
              fullWidth
              InputProps={{
                startAdornment: <Iconify icon="fluent:search-12-regular" color="gray" marginRight={1} />,
              }}
              autoComplete="off"
              placeholder={isPractitioner ? t('encounter.outpatient.doctor_find') : t('encounter.outpatient.department_find')}
              inputRef={(ref) => {
                searchRef.current.searchPoli = ref;
              }}
              onClick={() => {
                setElementName('searchPoli');
              }}
            />
          </Grid>
          {isPractitioner &&
            listPractitioner.slice(currentIndex, currentIndex + 6).map((_row, index) => {
              return (
                <Grid item xs={12} md={4} key={index}>
                  <CardBannerProfile
                    heathcareServiceName="test"
                    count="20/30"
                    name={_row.name}
                    slots="12:00 - 13:00"
                    clickable
                    onClick={() => {
                      onCardSelect();
                    }}
                  />
                </Grid>
              );
            })}
          {!isPractitioner &&
            listPoli.slice(currentIndex, currentIndex + 16).map((_row, index) => {
              return (
                <Grid item xs={12} md={4} key={index}>
                  <CardBanner
                    title={_row.name}
                    localIcon="stethoscope"
                    cardProps={{ variant: 'outlined' }}
                    clickable
                    onClick={() => {
                      onCardSelect();
                    }}
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
            fullWidth
            onClick={() => {
              setIsPractitioner((prev) => !prev);
              setCurrentIndex(0);
            }}
          >
            {isPractitioner
              ? t('encounter.outpatient.doctor_unknown')
              : t('encounter.outpatient.doctor_known')}
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

export default SelectPractitioner;

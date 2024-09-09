import { Alert, Box, Button, Grid, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { CardBanner, CardBannerProfile } from 'src/components/card-banner';
import { RHFTextField } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { Keyboard } from 'src/components/keyboard';
import { useTranslate } from 'src/locales';
import type { SelectPractitionerProps } from '../model/types';
import { doctorAvailable } from 'src/pages/doctor/model/functions';

const SelectPractitioner = ({
  onCardSelect,
  handleGetDoctor,
  handleGetPoly,
  setSelectedPractitioner,
  listDoctor,
  listPoly,
  setFormValue,
  watchFormValue
}: SelectPractitionerProps) => {
  const { t } = useTranslate();

  const [isPractitioner, setIsPractitioner] = useState(true);
  const [afterFirstSearch, setAfterFirstSearch] = useState(false);
  const [elementName, setElementName] = useState('');

  const [_currentIndex, setCurrentIndex] = useState(1);

  const searchRef = useRef<any>({});

  const handleChangePagination = ({ action }: { action: 'prev' | 'next' }) => {
    setCurrentIndex((prev) => {
      const page = (action === 'prev' ? prev - 1 : prev + 1)

      handleGetDoctor(searchPractioner || "", page);

      return page
    });
  };

  const handleSelectedByPoly = async (id: string) => {
    try {
      const tempRes = await doctorAvailable({
        departmentID: id
      });

      const response = tempRes.data

      setFormValue('practionerId', response.doctorID);
      setFormValue('departmentId', id);
      setSelectedPractitioner({
        doctor: response.doctorName,
        polyName: response.departmentName,
        serviceTime: `${new Date().toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}, ${response.scheduleStart} - ${response.scheduleEnd}`,
      });

      onCardSelect();
    } catch (e) {
      console.log(e);
    }
  };

  const searchPractioner = watchFormValue('searchPractioner');

  useEffect(() => {
    if (searchPractioner || afterFirstSearch) {
      handleGetDoctor(searchPractioner, 1);
      handleGetPoly(searchPractioner, 1);
      setAfterFirstSearch(true);
    }
  }, [searchPractioner, handleGetDoctor, handleGetPoly, afterFirstSearch]);

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
              name="searchPractioner"
              fullWidth
              InputProps={{
                startAdornment: (
                  <Iconify icon="fluent:search-12-regular" color="gray" marginRight={1} />
                ),
              }}
              autoComplete="off"
              placeholder={
                isPractitioner
                  ? t('encounter.outpatient.doctor_find')
                  : t('encounter.outpatient.department_find')
              }
              inputRef={(ref) => {
                searchRef.current.searchPractioner = ref;
              }}
              onClick={() => {
                setElementName('searchPractioner');
              }}
            />
          </Grid>
          {isPractitioner &&
            listDoctor.map((doctor) => (
              <Grid item xs={12} md={4} key={doctor.doctorID}>
                <CardBannerProfile
                  heathcareServiceName={doctor.departmentName}
                  count={`${doctor.patientQueued}/${doctor.patientCapacity}`}
                  name={doctor.doctorName}
                  slots={`${doctor.scheduleStart}-${doctor.scheduleEnd}`}
                  clickable
                  onClick={() => {
                    setFormValue('practionerId', doctor.doctorID);
                    setFormValue('departmentId', doctor.departmentID);
                    setSelectedPractitioner({
                      doctor: doctor.doctorName,
                      polyName: doctor.departmentName,
                      serviceTime: `${new Date().toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })},${doctor.scheduleStart}-${doctor.scheduleEnd}`,
                    });
                    onCardSelect();
                  }}
                />
              </Grid>
            ))}
          {!isPractitioner &&
            listPoly.map((poly) => {
              return (
                <Grid item xs={12} md={4} key={poly.departmentID}>
                  <CardBanner
                    title={poly.departmentName}
                    localIcon="stethoscope"
                    cardProps={{ variant: 'outlined' }}
                    clickable
                    onClick={() => handleSelectedByPoly(poly.departmentID)}
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

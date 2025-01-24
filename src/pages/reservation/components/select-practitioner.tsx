import { Alert, Box, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { CardBanner } from 'src/components/card-banner';
import CardBannerProfileReservation from 'src/components/card-banner/card-banner-profile-reservation';
import { RHFTextField } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { Keyboard } from 'src/components/keyboard';
import { useFetch } from 'src/hooks/use-fetch';
import { useTranslate } from 'src/locales';
import { departmentList } from 'src/pages/department/model/functions';
import { doctorAvailable, doctorList } from 'src/pages/doctor/model/functions';
import { Doctor } from 'src/pages/doctor/model/types';
import { fDate, formatStr } from 'src/utils/format-time';
import type { SelectPractitionerProps } from '../model/types';

const SelectPractitioner = (props: SelectPractitionerProps) => {
  const { onCardSelect, setFormValue, setSelectedPractitioner, watchFormValue, } = props

  const { t } = useTranslate();

  const [isPractitioner, setIsPractitioner] = useState(true);
  const [elementName, setElementName] = useState('');

  const [currentIndex, setCurrentIndex] = useState(1);

  const searchRef = useRef<any>({});

  const { data, isLoading, refetch } = useFetch({ keyword: '', page: 1, take: 9 }, doctorList)

  const { data: dataPoly, isLoading: loadingPoly, refetch: refetchPoly } = useFetch({ keyword: '', page: 1, take: 9 }, departmentList)

  const handleChangePagination = ({ action }: { action: 'prev' | 'next' }) => {
    setCurrentIndex((prev) => {
      const page = (action === 'prev' ? prev - 1 : prev + 1)

      if (isPractitioner) {
        refetch({ keyword: searchPractioner, page, take: 9 });
      } else {
        refetchPoly({ keyword: searchPractioner, page, take: 9 })
      }

      return page === 0 ? prev : page
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
      setFormValue('scheduleID', response.scheduleID)
      setSelectedPractitioner({
        doctor: response.doctorName,
        polyName: response.departmentName,
        serviceTime: `${fDate(dayjs(), formatStr.paramCase.dayDate)}, ${response.scheduleStart} - ${response.scheduleEnd}`,
        person: response
      });

      onCardSelect();
    } catch (e) {
      toast.error(e?.message)
    }
  };

  const handleSelectedByPractitioner = (doctor: Doctor) => {
    setFormValue('practionerId', doctor.doctorID);
    setFormValue('departmentId', doctor.departmentID);
    setFormValue('scheduleID', doctor.scheduleID)
    setSelectedPractitioner({
      doctor: doctor.doctorName,
      polyName: doctor.departmentName,
      serviceTime: `${doctor.scheduleStart} - ${doctor.scheduleEnd}`,
      person: doctor
    });
    onCardSelect();
  }

  const searchPractioner = watchFormValue('searchPractioner');

  const handleResetSearch = () => {
    if (isPractitioner) {
      refetch({ keyword: searchPractioner, page: 1, take: 9 });
    } else {
      refetchPoly({ keyword: searchPractioner, page: 1, take: 9 });
    }
  }

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

          {
            isLoading && isPractitioner && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', placeContent: 'center' }}>
                  <CircularProgress color='secondary' />
                </Box>
              </Grid>
            )
          }

          {
            loadingPoly && !isPractitioner && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', placeContent: 'center' }}>
                  <CircularProgress color='secondary' />
                </Box>
              </Grid>
            )
          }

          {
            !isLoading && isPractitioner && data?.data.length === 0 && (
              <Grid item xs={12}>
                <Typography variant='button' textAlign="center">Data Tidak Ditemukan. Coba Dengan Kata Kunci Lain</Typography>
              </Grid>
            )
          }

          {
            !loadingPoly && !isPractitioner && dataPoly?.data.length === 0 && (
              <Grid item xs={12}>
                <Typography variant='button' textAlign="center">Data Tidak Ditemukan. Coba Dengan Kata Kunci Lain</Typography>
              </Grid>
            )
          }

          {isPractitioner &&
            data?.data.map((doctor) => (
              <Grid item xs={12} md={4} key={doctor.doctorID}>
                <CardBannerProfileReservation
                  heathcareServiceName={doctor.departmentName}
                  name={doctor.doctorName}
                  clickable
                  onClick={() => { handleSelectedByPractitioner(doctor) }}
                />
              </Grid>
            ))}
          {!isPractitioner &&
            dataPoly?.data.map((poly) => {
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
            disabled={currentIndex === 1}
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
              setFormValue("searchPractioner", "")
              handleResetSearch()
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
          onClose={() => {
            handleResetSearch()
            setCurrentIndex(0); setElementName('')
          }}
          ref={searchRef.current}
          inputType="text"
        />
      )}
    </>
  );
};

export default SelectPractitioner;

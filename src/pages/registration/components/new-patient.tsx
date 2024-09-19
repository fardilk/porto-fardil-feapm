
import { useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Box,
  Button,
  Grid,
  Typography
} from '@mui/material';

import {
  RHFMobileDatePicker,
  RHFTextField,
  RHFTimePils
} from 'src/components/hook-form';
import { Keyboard } from 'src/components/keyboard';

import { useTranslate } from 'src/locales';
import type { NewPatientProps } from '../model/types';
import { terminologyGet } from 'src/pages/terminology/model/functions';
import { useFetch } from 'src/hooks/use-fetch';
import { terminologyArrayMapper } from 'src/utils/terminology';

const NewPatient = (props: NewPatientProps) => {
  const { handlePreviousPage } = props;

  const [elementName, setElementName] = useState('');
  const [keyboardType, setKeyboardType] = useState('');
  const inputRef = useRef<any>({});

  const { watch, setError, formState: { errors } } = useFormContext();
  const isForeign = watch('citizenship');
  const { t } = useTranslate();

  const { data: dataGender } = useFetch({ attributePath: "", codeSystem: "", valueSet: "Patient.contact.gender" }, terminologyGet)

  const listGender = terminologyArrayMapper({ data: dataGender?.data, key: "terminology.gender" })

  const listReligion = useMemo(
    () => [
      {
        label: 'Islam',
        value: 'islam',
      },
      {
        label: t('registration.protestant'),
        value: 'kristen_protestan',
      },
      {
        label: t('registration.catholic'),
        value: 'katholik',
      },
      {
        label: 'Hindu',
        value: 'hindu',
      },
      {
        label: t('registration.buddhist'),
        value: 'budha',
      },
      {
        label: t('registration.confucian'),
        value: 'konghucu',
      },
      {
        label: t('registration.other'),
        value: 'lainnya',
      },
    ],
    [t]
  );

  // const listGender = useMemo(
  //   () => [
  //     {
  //       label: t('registration.male'),
  //       value: 'laki-laki',
  //     },
  //     {
  //       label: t('registration.female'),
  //       value: 'perempuan',
  //     },
  //   ],
  //   [t]
  // );

  return (
    <>
      <Grid container rowSpacing={2} my={2} columnSpacing={3}>
        <Grid item xs={2} display={'flex'} alignItems={'center'}>
          <Typography variant="subtitle1" color="grey.600">
            {isForeign ? 'Passport' : 'NIK/Medrec'}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="nik"
            disabled
            placeholder={isForeign ? 'Passport' : 'NIK/Medrec'}
            inputRef={(ref) => {
              inputRef.current.nik = ref;
            }}
            onClick={() => {
              setElementName('nik');
              setKeyboardType('text');
            }}
          />
        </Grid>
        <Grid item xs={2} display={'flex'} alignItems={'center'}>
          <Typography variant="subtitle1" color="grey.600">
            {t('registration.gender')}
          </Typography>
        </Grid>
        <Grid item xs={4} display={'flex'} alignItems={'center'}>
          <RHFTimePils
            name="gender"
            options={listGender}
            getOptionLabel={(opt) => opt.label}
            getOptionEqualToValue={(opt, value) => opt.value === value?.value}
          />
        </Grid>
        <Grid item xs={2} display={'flex'} alignItems={'center'}>
          <Typography variant="subtitle1" color="grey.600">
            {t('registration.fullname')}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <RHFTextField
            name="name"
            placeholder={t('registration.fullname')}
            inputRef={(ref) => {
              inputRef.current.name = ref;
            }}
            onClick={() => {
              setElementName('name');
              setKeyboardType('text');
            }}
          />
        </Grid>
        <Grid item xs={2} display={'flex'} alignItems={'center'}>
          <Typography variant="subtitle1" color="grey.600">
            {t('registration.born_place')}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            id="birthPlace"
            name="birthPlace"
            placeholder={t('registration.born_place')}
            inputRef={(ref) => {
              inputRef.current.birthPlace = ref;
            }}
            onClick={() => {
              setElementName('birthPlace');
              setKeyboardType('text');
            }}
          />
        </Grid>
        <Grid item xs={2} display={'flex'} alignItems={'center'}>
          <Typography variant="subtitle1" color="grey.600">
            {t('registration.born_date')}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <RHFMobileDatePicker
            name="birthDate"
            format="DD/MM/YYYY"
            disableFuture
          />
        </Grid>
        <Grid item xs={2} display={'flex'} alignItems={'center'}>
          <Typography variant="subtitle1" color="grey.600">
            {t('registration.religion')}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <RHFTimePils
            name="religion"
            options={listReligion}
            getOptionLabel={(opt) => opt.label}
            getOptionEqualToValue={(opt, value) => opt.value === value?.value}
          />
        </Grid>
        <Grid item xs={2} display={'flex'} alignItems={'center'}>
          <Typography variant="subtitle1" color="grey.600">
            {t('registration.phone_number')}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <RHFTextField
            id="phoneNumber"
            name="phoneNumber"
            placeholder={t('registration.phone_number')}
            inputRef={(ref) => {
              inputRef.current.phoneNumber = ref;
            }}
            onClick={() => {
              setElementName('phoneNumber');
              setKeyboardType('number');
            }}
          />
        </Grid>
        <Grid item xs={2} display={'flex'} alignItems={'center'}>
          <Typography variant="subtitle1" color="grey.600">
            {t('registration.email')}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <RHFTextField
            id="email"
            name="email"
            placeholder={t('registration.email')}
            inputRef={(ref) => {
              inputRef.current.email = ref;
            }}
            onClick={() => {
              setElementName('email');
              setKeyboardType('email');
            }}
          />
        </Grid>
        <Grid item xs={2} display={'flex'} alignItems={'center'}>
          <Typography variant="subtitle1" color="grey.600">
            {t('registration.address_label')}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <RHFTextField
            id="address"
            name="address"
            multiline
            rows={4}
            placeholder={t('registration.address_label')}
            inputRef={(ref) => {
              inputRef.current.address = ref;
            }}
            onClick={() => {
              setElementName('address');
              setKeyboardType('text');
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', placeContent: 'space-between', gap: 2 }}>
        <Button
          size="large"
          variant="outlined"
          fullWidth
          color="secondary"
          onClick={handlePreviousPage}
        >
          {t('global.back')}
        </Button>
        <Button
          size="large"
          variant="contained"
          fullWidth
          color="secondary"
          type="submit"
        >
          {t('global.next')}
        </Button>
      </Box>

      {elementName && (
        <Keyboard
          withDialog
          open={Boolean(elementName)}
          onClose={() => setElementName('')}
          ref={inputRef.current}
          elementName={elementName}
          inputType={keyboardType}
        />
      )}
    </>
  );
};

export default NewPatient;

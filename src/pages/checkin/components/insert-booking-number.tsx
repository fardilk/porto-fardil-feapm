import { Divider, Stack, Typography, useTheme, Box } from '@mui/material';
import { type FC, useRef, useState } from 'react';
import { RHFTextField } from 'src/components/hook-form';
import { Keyboard } from 'src/components/keyboard';
import { typography } from 'src/theme/core';
import { ErrorAlert } from 'src/components/error-alert';
import { type InsertBookingProps } from '../model/types';

const InsertBookingNumber: FC<InsertBookingProps> = ({ errorMessage }) => {
  const theme = useTheme();
  const [elementName, _setElementName] = useState('booking_number');

  const inputRef = useRef<any>({});

  return (
    <Stack gap={2}>
      <Box>
        <Typography variant="h4" textAlign="center">
          Masukkan/Scan Nomor Booking Anda
        </Typography>
        {errorMessage && <ErrorAlert message={errorMessage} />}
      </Box>
      <RHFTextField
        id="nik"
        name="nik"
        placeholder={'Masukkan Nomor Booking Anda'}
        variant="filled"
        inputRef={(ref) => {
          inputRef.current.booking_number = ref;
        }}
        inputProps={{
          style: {
            textAlign: 'center',
            backgroundColor: theme.palette.background.paper,
            ...typography.h3,
          },
        }}
      />
      <Divider />

      {elementName && (
        <Keyboard ref={inputRef.current} elementName="booking_number" inputType="number" />
      )}
    </Stack>
  );
};

export default InsertBookingNumber;

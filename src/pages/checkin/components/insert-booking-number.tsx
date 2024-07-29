import { Divider, Stack, Typography, useTheme, Box } from '@mui/material';
import { type FC, useRef, useState } from 'react';
import { RHFTextField } from 'src/components/hook-form';
import { Keyboard } from 'src/components/keyboard';
import { typography } from 'src/theme/core';
import { ErrorAlert } from 'src/components/error-alert';
import { type InsertBookingProps } from './types';
import { useTranslate } from 'src/locales';

const InsertBookingNumber: FC<InsertBookingProps> = ({ errorMessage }) => {
  const theme = useTheme();
  const [elementName, _setElementName] = useState('booking_number');
  const {t} = useTranslate()

  const inputRef = useRef<any>({});

  return (
    <Stack gap={2}>
      <Box>
        <Typography variant="h4" textAlign="center">
          {t("checkin.title_input_scan")}
        </Typography>
        {errorMessage && <ErrorAlert message={errorMessage} />}
      </Box>
      <RHFTextField
        id="nik"
        name="nik"
        placeholder={t("checkin.placeholder_input_number")}
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

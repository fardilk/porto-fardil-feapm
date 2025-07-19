import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import { type FC, useRef } from 'react';
import { ErrorAlert } from 'src/components/error-alert';
import { RHFTextField } from 'src/components/hook-form';
import { Keyboard } from 'src/components/keyboard';
import { useTranslate } from 'src/locales';
import { typography } from 'src/theme/core';
import { type InsertBookingProps } from '../model/types';

const InsertBookingNumber: FC<InsertBookingProps> = ({ errorMessage }) => {
  const theme = useTheme();
  const { t } = useTranslate()

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
        id="booking_number"
        name="booking_number"
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

      <Keyboard ref={inputRef.current} elementName="booking_number" inputType="number" />
    </Stack>
  );
};

export default InsertBookingNumber;

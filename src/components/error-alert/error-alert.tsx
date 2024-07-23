import { type FC } from 'react';
import type { AlertProps } from './types';
import { Iconify } from 'src/components/iconify';
import { Typography, Box } from '@mui/material';

const ErrorAlert: FC<AlertProps> = ({ message }) => {
  return (
    <Box display="flex" alignItems="center" gap={1} justifyContent="center" >
      <Iconify icon="jam:alert-f" color="red" />
      <Typography fontWeight="600" color="red">{message}</Typography>
    </Box>
  );
};

export default ErrorAlert;

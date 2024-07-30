import { ReactNode, useMemo, useRef, useState } from 'react';
import { SelectTimeProps } from '../model/types';
import { RHFMobileDatePicker, RHFTimePils } from 'src/components/hook-form';
import {
  Button,
  Grid,
  Typography,
  Stack,
  Box,
  TableContainer,
  TableBody,
  Table,
  TableCell,
  TableRow,
} from '@mui/material';
import { LabelTextContainer, LabelTextProps } from 'src/components/label-text';
import { useTranslate } from 'src/locales';

const SelectTime = (props: SelectTimeProps) => {
  const { reservationType, handleBack, handleConfirm, errorMessage } = props;
  const { t } = useTranslate()

  const headerData : LabelTextProps[] = useMemo(() => [
    { title: t("global.doctor_name"), body: "dr. Inas Shabrina Sp.M'", colSpan: 2 },
    { title: t("global.specialist"), body: 'Spesialis Mata', colSpan: 2 },
  ],[t])


  const timeOpt = [
    {
      label: '10:00',
      value: '10.00',
    },
    {
      label: '11:30',
      value: '11.30',
    },
    {
      label: '12:45',
      value: '12.45',
    },
  ];

  const unableOpt = [
    {
      label: t("reservation.change_schedule"),
      value: 'pindah',
    },
    {
      label: t("reservation.cancel_visit"),
      value: 'batal',
    },
  ];

  const getButtonText = () => {
    if (reservationType === 'RJ') return t("global.doctor");
    if (reservationType === 'MCU') return t("MCU");
    if (reservationType === 'LAB') return t("laboratory");
    if (reservationType === 'RAD') return t("radiology");
    return '';
  };

  return (
    <Stack gap={4}>
      <Box>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom variant="h5" color="secondary.darker">
            {t("global.doctor_detail")}
          </Typography>
          <LabelTextContainer listText={headerData} orientation="vertical" />
        </Grid>
      </Box>
      <TableContainer sx={{ my: 2 }}>
        <Table>
          <colgroup>
            <col width="30%" />
            <col width="70%" />
          </colgroup>
          <TableBody>
            <TableRow>
              <TableCellBody titleText={t("reservation.visit_date")} />
              <TableCellBody>
                <RHFMobileDatePicker name="date" format="DD/MM/YYYY" />
                {errorMessage?.dateErr && (
                  <Typography variant="caption" color="error.main">
                    {errorMessage.dateErr}
                  </Typography>
                )}
              </TableCellBody>
            </TableRow>
            <TableRow>
              <TableCellBody titleText={t("reservation.visit_hour")} />
              <TableCellBody>
                <RHFTimePils
                  options={timeOpt}
                  getOptionEqualToValue={(opt, value) => opt.value === value?.value}
                  getOptionLabel={(opt) => opt.label}
                  name="bookTime"
                  errorText={errorMessage?.bookTimeErr}
                />
              </TableCellBody>
            </TableRow>
            <TableRow>
              <TableCellBody titleText={t("reservation.if_doctor_can't_arrived")} />
              <TableCellBody>
                <RHFTimePils
                  options={unableOpt}
                  getOptionEqualToValue={(opt, value) => opt.value === value?.value}
                  getOptionLabel={(opt) => opt.label}
                  name="unable"
                  errorText={errorMessage?.unableErr}
                />
              </TableCellBody>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', placeContent: 'space-between', gap: 2 }}>
        <Button
          color="secondary"
          fullWidth
          variant="outlined"
          size="large"
          onClick={() => handleBack()}
        >
          {t("global.reselect")} {getButtonText()}
        </Button>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          size="large"
          type="submit"
          onClick={() => handleConfirm()}
        >
          {t("appointment.confirm_registration")}
        </Button>
      </Box>
    </Stack>
  );
};

export default SelectTime;

const TableCellBody = ({ titleText, children }: { titleText?: string; children?: ReactNode }) => {
  return (
    <TableCell borderbottom="noborder">
      {titleText && (
        <Typography variant="subtitle1" color="grey.600">
          {titleText}
        </Typography>
      )}

      {children && children}
    </TableCell>
  );
};

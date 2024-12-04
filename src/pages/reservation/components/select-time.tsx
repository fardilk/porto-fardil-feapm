import {
  Box,
  Button,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { RHFMobileDatePicker, RHFTimePils } from 'src/components/hook-form';
import type { LabelTextProps } from 'src/components/label-text';
import { LabelTextContainer } from 'src/components/label-text';
import { useFetch } from 'src/hooks/use-fetch';
import { useTranslate } from 'src/locales';
import { doctorOne } from 'src/pages/doctor/model/functions';
import { fDate, formatStr } from 'src/utils/format-time';
import type { SelectTimeProps } from '../model/types';

const SelectTime = (props: SelectTimeProps) => {
  const { reservationType, handleBack, handleConfirm, errorMessage, doctorInfo } = props;

  const { t } = useTranslate()
  const { watch, setValue } = useFormContext()

  const values = watch()

  const headerData: LabelTextProps[] = useMemo(() => [
    { title: t("global.doctor_name"), body: doctorInfo?.doctor, colSpan: 2 },
    { title: t("global.specialist"), body: doctorInfo?.polyName, colSpan: 2 },
  ], [t])

  const { data, isLoading, refetch } = useFetch({ scheduleID: values?.scheduleID || "", date: fDate(dayjs().add(1, 'day'), formatStr.paramCase.mysqlDate) }, doctorOne)

  const timeOpt = data?.data.slot.map((it) => ({
    label: it.slotTime,
    value: it.slotId,
    disabled: it.isDisabled
  })) || []

  const unableOpt = [
    {
      label: t("reservation.change_schedule"),
      value: 'batal kunjungan',
    },
    {
      label: t("reservation.cancel_visit"),
      value: 'pindah jadwal',
    },
  ];

  const getButtonText = () => {
    if (reservationType === 'RJ') return t("global.doctor");
    if (reservationType === 'MCU') return t("MCU");
    if (reservationType === 'LAB') return t("laboratory");
    if (reservationType === 'RAD') return t("radiology");
    return '';
  };

  useEffect(() => {
    setValue("date", dayjs().add(1, 'day'))
  }, [])

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
                <RHFMobileDatePicker
                  name="date"
                  format="DD/MM/YYYY"
                  onSelect={(val) => {
                    refetch({ scheduleID: values?.scheduleID || "", date: fDate(val, formatStr.paramCase.mysqlDate) })
                  }}
                  disablePast
                  shouldDisableDate={(date) => fDate(date, formatStr.paramCase.mysqlDate) === fDate(dayjs(), formatStr.paramCase.mysqlDate)}
                />
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
                  loading={isLoading}
                  getOptionDisabled={(opt) => opt.disabled}
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

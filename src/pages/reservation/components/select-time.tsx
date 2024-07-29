import { ReactNode, useRef, useState } from 'react';
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

const SelectTime = (props: SelectTimeProps) => {
  const { reservationType, handleBack, handleConfirm, errorMessage } = props;
  const [headerData, _setHeaderData] = useState<LabelTextProps[]>([
    { title: 'Nama Dokter', body: "dr. Inas Shabrina Sp.M'", colSpan: 2 },
    { title: 'Keahlian', body: 'Spesialis Mata', colSpan: 2 },
  ]);

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
      label: 'Pindah Jadwal',
      value: 'pindah',
    },
    {
      label: 'Batal Kunjungan',
      value: 'batal',
    },
  ];

  const getButtonText = () => {
    if (reservationType === 'RJ') return 'Dokter';
    if (reservationType === 'MCU') return 'jenis pemeriksaan MCU';
    if (reservationType === 'LAB') return 'pemeriksaan laboratorium';
    if (reservationType === 'RAD') return 'pemeriksaan radiologi';
    return '';
  };

  return (
    <Stack gap={4}>
      <Box>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom variant="h5" color="secondary.darker">
            Detail Dokter
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
              <TableCellBody titleText="Tanggal Kunjungan" />
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
              <TableCellBody titleText="Jam Kunjungan" />
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
              <TableCellBody titleText="Jika Dokter Berhalangan Hadir di Jam Tersebut" />
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
          Ulang Pilih {getButtonText()}
        </Button>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          size="large"
          type="submit"
          onClick={() => handleConfirm()}
        >
          Konfirmasi Daftar
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

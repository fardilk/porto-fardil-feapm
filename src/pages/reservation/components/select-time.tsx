import { AppPage } from 'src/components/app-page';
import { ReactNode, useState } from 'react';
import { SelectTimeProps } from '../model/types';
import {
  Form,
  RHFMobileDatePicker,
  RHFTimePils,
} from 'src/components/hook-form';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getDummyData } from '../../registration/model/functions';
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

// interface FormValues {
//   date: Date;
//   unable: 'Pindah Jadwal' | 'Batal Kunjungan';
//   bookTime: number[];
// }

const SelectTime = (props: SelectTimeProps) => {
  const { reservationType, handleBack, handleConfirm } = props;
  // const schema = yup.object().shape({
  //   date: yup.date().required('Field Date is Required'),
  //   unable: yup
  //     .string()
  //     .oneOf(['Pindah Jadwal', 'Batal Kunjungan'])
  //     .required('This Field is Required'),
  //   bookTime: yup.array().of(yup.number()).min(1).required('At least one time slot is required'),
  // });

  // const [defaultValues, setDefaultVal] = useState<FormValues>({
  //   date: new Date(),
  //   unable: 'Pindah Jadwal',
  //   bookTime: [],
  // });

  // const methods = useForm({
  //   resolver: yupResolver(schema),
  //   defaultValues,
  // });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   control,
  // } = methods;

  const onSubmitForm = (data: any) => {
    // handleConfirm()
  };

  const [headerData, _setHeaderData] = useState<LabelTextProps[]>([
    { title: 'Nama Dokter', body: "dr. Inas Shabrina Sp.M'", colSpan: 2 },
    { title: 'Keahlian', body: 'Spesialis Mata', colSpan: 2 },
  ]);

  const timeOpt = [
    {
      label: '10:00',
      value: 'item_10',
    },
    {
      label: '11:30',
      value: 'item_11',
    },
    {
      label: '12:45',
      value: 'item_12',
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
      {/* <Form methods={methods} onSubmit={handleSubmit(onSubmitForm)}> */}
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
                  <RHFMobileDatePicker
                    name="birthDate"
                    format="DD/MM/YYYY"
                    // {...register('date')}
                  />
                </TableCellBody>
              </TableRow>
              <TableRow>
                <TableCellBody titleText="Jam Kunjungan" />
                <TableCellBody>
                  <RHFTimePils
                    options={timeOpt}
                    getOptionEqualToValue={(opt, value) => opt.value === value?.value}
                    getOptionLabel={(opt) => opt.label}
                    name="timePils"
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
                    name="timePils"
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
            onClick={() => handleConfirm()}
          >
            Konfirmasi Daftar
          </Button>
        </Box>
      {/* </Form> */}
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

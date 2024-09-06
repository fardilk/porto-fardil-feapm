import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import type { FC, ReactNode} from 'react';
import { useMemo } from 'react';
import { RHFTimePils } from 'src/components/hook-form';
import type { NewPatientProps} from '../model/types';
import { useTranslate } from 'src/locales';

const DetailNewPatient: FC<NewPatientProps> = ({ handleNextPage, handlePreviousPage }) => {
  const { t } = useTranslate();

  const bloodType = useMemo(
    () => [
      {
        label: 'AB-',
        value: 'ab-',
      },
      {
        label: 'B-',
        value: 'b-',
      },
      {
        label: 'A-',
        value: 'a-',
      },
      {
        label: 'O',
        value: 'o',
      },
      {
        label: 'AB+',
        value: 'ab+',
      },
      {
        label: 'B+',
        value: 'b+',
      },
      {
        label: 'A+',
        value: 'a+',
      },
      {
        label: 'A',
        value: 'a',
      },
      {
        label: 'B',
        value: 'b',
      },
      {
        label: 'AB',
        value: 'ab',
      },
      {
        label: 'O-',
        value: 'o-',
      },
    ],
    []
  );

  const study = useMemo(
    () => [
      {
        label: t('registration.unknown'),
        value: 'tidak_diketahui',
      },
      {
        label: t('registration.preschool'),
        value: 'pre_sekolah',
      },
      {
        label: t('registration.elementary_school'),
        value: 'sd',
      },
      {
        label: t('registration.middle_school'),
        value: 'smp',
      },
      {
        label: t('registration.high_school'),
        value: 'sma',
      },
      {
        label: t('registration.d1'),
        value: 'd1',
      },
      {
        label: t('registration.d2'),
        value: 'd2',
      },
      {
        label: t('registration.d3'),
        value: 'd3',
      },
      {
        label: t('registration.d4'),
        value: 'd4',
      },
      {
        label: t('registration.bachelor_degree'),
        value: 's1',
      },
      {
        label: t('registration.master_degree'),
        value: 's2',
      },
      {
        label: t('registration.doctoral_degree'),
        value: 's3',
      },
    ],
    [t]
  );

  const marriage = useMemo(
    () => [
      {
        label: t('registration.divorced'),
        value: 'cerai',
      },
      {
        label: t('registration.married'),
        value: 'menikah',
      },
      {
        label: t('registration.single'),
        value: 'belum_menikah',
      },
    ],
    [t]
  );

  const language = useMemo(
    () => [
      {
        label: t('registration.indonesian_language'),
        value: 'indonesia',
      },
      {
        label: t('registration.english_language'),
        value: 'english',
      },
    ],
    [t]
  );

  const job = useMemo(
    () => [
      {
        label: t('registration.unemployed'),
        value: 'tidak_bekerja',
      },
      {
        label: t('registration.entrepreneur'),
        value: 'wirausaha',
      },
      {
        label: t('registration.student'),
        value: 'pelajar/mahasiswa',
      },
      {
        label: t('registration.private_employee'),
        value: 'karyawan_swasta',
      },
      {
        label: t('registration.civil_servant'),
        value: 'PNS',
      },
      {
        label: t('registration.housewife'),
        value: 'mengurus_rumah_tangga',
      },
      {
        label: t('registration.army'),
        value: 'TNI',
      },
      {
        label: t('registration.police'),
        value: 'POLRI',
      },
      {
        label: t('registration.farmer'),
        value: 'Petani',
      },
      {
        label: t('registration.breeder'),
        value: 'peternak',
      },
      {
        label: t('registration.state_enterprise_employee'),
        value: 'karyawan_BUMN/BUMD',
      },
      {
        label: t('registration.teacher'),
        value: 'guru',
      },
      {
        label: t('registration.domestic_worker'),
        value: 'asisten_rumah_tangga',
      },
      {
        label: t('registration.laborer'),
        value: 'buruh',
      },
      {
        label: t('registration.retired'),
        value: 'pensiunan',
      },
      {
        label: t('registration.fisherman'),
        value: 'nelayan',
      },
      {
        label: t('registration.construction_worker'),
        value: 'konstruksi',
      },
      {
        label: t('registration.trade_worker'),
        value: 'perdagangan',
      },
      {
        label: t('registration.transport_worker'),
        value: 'transportasi',
      },
      {
        label: t('registration.honorary_worker'),
        value: 'honorer',
      },
      {
        label: t('registration.journalist'),
        value: 'wartawan',
      },
      {
        label: t('registration.lecturer'),
        value: 'dosen',
      },
    ],
    [t]
  );

  const listType = useMemo(
    () => [
      {
        label: t('registration.blood_type'),
        name: 'bloodType',
        options: bloodType,
      },
      {
        label: t('registration.education'),
        name: 'study',
        options: study,
      },
      {
        label: t('registration.marital_status'),
        name: 'marriage',
        options: marriage,
      },
      {
        label: t('registration.occupation'),
        name: 'job',
        options: job,
      },
      {
        label: t('registration.daily_language'),
        name: 'language',
        options: language,
      },
    ],
    [bloodType, job, language, marriage, study, t]
  );

  return (
    <>
      <TableContainer sx={{ my: 2 }}>
        <Table>
          <colgroup>
            <col width="20%" />
            <col width="80%" />
          </colgroup>
          <TableBody>
            {listType.map((list, index) => (
              <TableRow key={index}>
                <TableCellBody titleText={list.label} />
                <TableCellBody>
                  <RHFTimePils
                    name={list.name}
                    options={list.options}
                    getOptionLabel={(opt) => opt.label}
                    getOptionEqualToValue={(opt, value) => opt.value === value?.value}
                  />
                </TableCellBody>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </>
  );
};

export default DetailNewPatient;

// INI SEBENARNYA BISA DI REUSABLE DI GLOBAL COMPONENT
const TableCellBody = ({ titleText, children }: { titleText?: string; children?: ReactNode }) => {
  return (
    <TableCell
      borderbottom="noborder"
      sx={{
        paddingBottom: 3,
      }}
    >
      {titleText && (
        <Typography variant="subtitle1" color="grey.600">
          {titleText}
        </Typography>
      )}

      {children && children}
    </TableCell>
  );
};

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
import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';
import { RHFTimePils } from 'src/components/hook-form';
import { useTranslate } from 'src/locales';
import type { NewPatientProps } from '../model/types';
import { useFetch } from 'src/hooks/use-fetch';
import { terminologyGet } from 'src/pages/terminology/model/functions';
import { terminologyArrayMapper } from 'src/utils/terminology';

const DetailNewPatient: FC<NewPatientProps> = ({ handleNextPage, handlePreviousPage }) => {
  const { t } = useTranslate();

  const language = useMemo(
    () => [
      {
        label: t('registration.indonesian_language'),
        value: 'id-ID',
      },
      {
        label: t('registration.english_language'),
        value: 'en',
      },
    ],
    [t]
  );

  const { data: mariageData } = useFetch({ attributePath: "Patient.maritalStatus", codeSystem: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus", valueSet: "" }, terminologyGet)
  const { data: bloodType } = useFetch({ attributePath: "Patient.blood.type", codeSystem: "http://loinc.org" }, terminologyGet)
  const { data: education } = useFetch({ attributePath: "Person.education", codeSystem: "xhis.code.education.level", valueSet: "" }, terminologyGet)
  const { data: jobClass } = useFetch({ attributePath: "Person.job.ktp.class", codeSystem: "xhis.code.job.category.ktp", valueSet: "" }, terminologyGet)
  // const { data } = useFetch({ attributePath: "", codeSystem: "", valueSet: "" }, terminologyGet)

  const listType = useMemo(
    () => [
      {
        label: t('registration.blood_type'),
        name: 'bloodType',
        options: terminologyArrayMapper({ data: bloodType?.data, key: "terminology.bloodType" }),
      },
      {
        label: t('registration.education'),
        name: 'study',
        options: terminologyArrayMapper({ data: education?.data, key: "terminology.education" }),
      },
      {
        label: t('registration.marital_status'),
        name: 'marriage',
        options: terminologyArrayMapper({ data: mariageData?.data, key: "terminology.marital" }),
      },
      {
        label: t('registration.occupation'),
        name: 'job',
        options: terminologyArrayMapper({ data: jobClass?.data, key: "terminology.job" }),
      },
      {
        label: t('registration.daily_language'),
        name: 'language',
        options: language,
      },
    ],
    [bloodType, jobClass, language, mariageData, education, t]
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

import { fDate, formatStr } from 'src/utils/format-time';
import { RegistrationIForm } from './types';
import { capitalizeFirstLetter } from 'src/utils/helper';
import { Patient, PatientCreateInput } from 'src/pages/patient/model/types';

// nationality: data.citizenship ? data.nationality?.value || '' : 'ID',

export const regIFormToInput = ({ data }: { data: RegistrationIForm }): PatientCreateInput => {
  const dataNIK = data.nik.replace('\n', '');
  return {
    identifierTypeCode: data.citizenship ? '' : 'NNIDN',
    identifierValue: dataNIK,
    name: capitalizeFirstLetter(data.name),
    gender: data.gender?.value || '',
    religion: data.religion?.value || '',
    birthPlace: data.birthPlace,
    birthDttm: fDate(data.birthDate, formatStr.paramCase.mysqlDate),
    maritalStatus: data.marriage?.value || '',
    phone: data.phoneNumber,
    email: data.email,
    nationality: data.citizenship ? 'WNA' : 'WNI',
    address: data.address,
    additional: {
      bloodType: data.bloodType?.value || undefined,
      bloodRhesus: '',
      education: data.study?.value || '',
      occupation: data.job?.value || '',
      dailyLanguage: data.language?.value || '',
    },
  };
};

export const patientToIForm = ({ data: newData }: { data: Patient }): RegistrationIForm => {
  const newDef: RegistrationIForm = {
    nationality:
      newData.identifierTypeCode === 'NNIDN'
        ? {
            label: 'Indonesia',
            value: 'ID',
          }
        : {
            label: newData.nationality,
            value: newData.nationality,
          },
    patientID: newData.patientID,
    isRegistered: true,
    nik: newData.identifierValue || '',
    citizenship: newData.identifierTypeCode === 'NNIDN',
    name: newData.name,
    gender: {
      label: newData.gender,
      value: newData.gender,
    },
    birthPlace: newData.birthPlace,
    birthDate: newData.birthDttm,
    phoneNumber: newData.phone,
    email: newData.email,
    address: newData.address,
    bloodType: {
      label: newData.additional.bloodType || '-',
      value: newData.additional.bloodType || '-',
    },
    religion: {
      label: newData.religion,
      value: newData.religion,
    },
    study: {
      label: newData.additional.education || '',
      value: newData.additional.education || '',
    },
    marriage: {
      label: newData.maritalStatus,
      value: newData.maritalStatus,
    },
    job: {
      label: newData.additional.occupation || '',
      value: newData.additional.occupation || '',
    },
    language: {
      label: newData.additional.dailyLanguage || '',
      value: newData.additional.dailyLanguage || '',
    },
  };

  return newDef;
};

import { fDate, formatStr } from 'src/utils/format-time';
import { Patient, PatientCreateInput, RegistrationIForm } from './types';

export const regIFormToInput = ({ data }: { data: RegistrationIForm }): PatientCreateInput => {
  const dataNIK = data.nik.replace('\n', '');
  return {
    identifierTypeCode: data.citizenship ? '' : 'NNIDN',
    identifierValue: dataNIK,
    name: data.name,
    gender: data.gender?.value || '',
    religion: data.religion?.value || '',
    birthPlace: data.birthPlace,
    birthDttm: fDate(data.birthDate, formatStr.paramCase.mysqlDate),
    maritalStatus: data.marriage?.value || '',
    phone: data.phoneNumber,
    email: data.email,
    nationality: data.citizenship ? '' : 'ID',
    address: data.address,
    additional: {
      bloodType: data.bloodType?.value || '',
      bloodRhesus: '',
      education: data.study?.value || '',
      occupation: data.job?.value || '',
      dailyLanguage: data.language?.value || '',
    },
  };
};

export const patientToIForm = ({ data: newData }: { data: Patient }): RegistrationIForm => {
  const newDef: RegistrationIForm = {
    patientID: newData.patientID,
    nik: newData.identifierValue,
    citizenship: newData.identifierTypeCode === 'NNIDN',
    name: newData.name,
    gender: {
      label: newData.gender,
      value: newData.gender,
    },
    birthPlace: newData.birthPlace,
    birthDate: fDate(newData.birthDttm, formatStr.paramCase.date),
    phoneNumber: newData.phone,
    email: newData.email,
    address: newData.address,
    bloodType: {
      label: newData.additional.bloodType,
      value: newData.additional.bloodType,
    },
    religion: {
      label: newData.religion,
      value: newData.religion,
    },
    study: {
      label: newData.additional.education,
      value: newData.additional.education,
    },
    marriage: {
      label: newData.maritalStatus,
      value: newData.maritalStatus,
    },
    job: {
      label: newData.additional.occupation,
      value: newData.additional.occupation,
    },
    language: {
      label: newData.additional.dailyLanguage,
      value: newData.additional.dailyLanguage,
    },
  };

  return newDef;
};

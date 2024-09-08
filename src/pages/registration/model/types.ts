import type { ButtonProps } from '@mui/material';
import { NonPaginationType, PaginationType } from 'src/@types/global';

export type PatientInformationProps = {
  leftTextButton: string;
  rigthTextButton: string;
  leftButtonProps: ButtonProps;
};

export type NewPatientProps = {
  handlePreviousPage: () => void;
  handleNextPage: () => void;
};

export type SuccessNewPatientProps = {
  data: Patient | null;
  handleFinish: () => void;
};

export interface RegistrationIForm {
  patientID?: string;
  nik: string;
  citizenship: boolean;
  name: string;
  gender: {
    label: string;
    value: string;
  } | null;
  birthPlace: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  address: string;
  bloodType: {
    label: string;
    value: string;
  } | null;
  religion: {
    label: string;
    value: string;
  } | null;
  study: {
    label: string;
    value: string;
  } | null;
  marriage: {
    label: string;
    value: string;
  } | null;
  job: {
    label: string;
    value: string;
  } | null;
  language: {
    label: string;
    value: string;
  } | null;
}

export type SelectRegistrationMethodProps = {
  handleByPhone: () => void;
  handleByAnjungan: () => void;
};

export type additionalType = {
  bloodType: string;
  religion: string;
  education: string;
  maritalStatus: string;
  occupation: string;
  dailyLanguage: string;
};

export type RegisterResponse = {
  status: boolean;
  message: string;
  data: Patient;
};

export type Patient = {
  patientID: string;
  identifierTypeCode: string;
  identifierValue: string;
  medrec: string;
  name: string;
  gender: string;
  religion: string;
  birthPlace: string;
  birthDttm: string;
  maritalStatus: string;
  phone: string;
  email: string;
  nationality: string;
  address: string;

  additional: PatientAdditionalData;
};

export type PatientOne = NonPaginationType & {
  status: boolean;
  message: string;
  data: Patient;
};

export type PatientResult = PaginationType & {
  data: Patient[];
};

export type PatientAdditionalData = {
  bloodType: string;
  bloodRhesus: string;
  education: string;
  occupation: string;
  dailyLanguage: string;
};

export type PatientOneSatuSehat = NonPaginationType & {
  data: Patient[];
};

export type PatientCreateInput = {
  identifierTypeCode: string;
  identifierValue: string;
  name: string;
  gender: string;
  religion: string;
  birthPlace: string;
  birthDttm: string;
  maritalStatus: string;
  phone: string;
  email: string;
  nationality: string;
  address: string;

  additional: PatientCreateInputAdditionalData;
};

export type PatientCreateInputAdditionalData = {
  bloodType: string;
  bloodRhesus: string;
  education: string;
  occupation: string;
  dailyLanguage: string;
};

export type PatientUpdateInput = {
  phone: string;
  email: string;
};

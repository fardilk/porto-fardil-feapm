import type { ButtonProps } from '@mui/material';

export type PatientInformationProps = {
  leftTextButton: string;
  rigthTextButton: string;
  leftButtonProps: ButtonProps;
  // rightButtonProps: ButtonProps;
};

export type NewPatientProps = {
  handlePreviousPage: () => void;
  handleNextPage: () => void;
};

export type SuccessNewPatientProps = {
  handleFinish: () => void;
};

export type RegistrationIForm = {
  nik: string;
  citizenship: false;
  name: string;
  gender: {
    label: string;
    value: string;
  };
  birthPlace: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  address: string;
  bloodType: {
    label: string;
    value: string;
  };
  religion: {
    label: string;
    value: string;
  };
  study: {
    label: string;
    value: string;
  };
  marriage: {
    label: string;
    value: string;
  };
  job: {
    label: string;
    value: string;
  };
  language: {
    label: string;
    value: string;
  };
};

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
  patientID: string;
  nik: string;
  passportNumber: string;
  medrec: string;
  name: string;
  gender: string;
  birthPlace: string;
  birthDttm: string;
  phone: string;
  email: string;
  nationality: string;
  address: string;
  additional: additionalType;
};

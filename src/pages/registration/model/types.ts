import type { ButtonProps } from '@mui/material';

export type PatientInformationProps = {
  leftTextButton: string;
  rigthTextButton: string;
  leftButtonProps: ButtonProps;
  rightButtonProps: ButtonProps;
};

export type NewPatientProps = {
  handlePreviousPage: () => void;
  handleNextPage: () => void;
};

export type SuccessNewPatientProps = {
  handleFinish: () => void;
};

export type RegistrationIForm = {
  citizenship: boolean;
};

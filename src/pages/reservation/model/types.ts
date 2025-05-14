import type { ButtonProps } from '@mui/material';
import type { CardBannerProps } from 'src/components/card-banner/types';
import {
  SelectedLabPackage,
  SelectedPractioner,
  SelectedRadiologyPackage,
} from 'src/pages/encounter/model/types';
import { Patient } from 'src/pages/patient/model/types';
import { Nullable } from 'src/types/common';

export type SelectReservationTypeProps = {
  items: CardBannerProps[];
  handleResetReservationType: () => void;
};

export type InformationProps = {
  leftTextButton: string;
  rightTextButton: string;
  leftButtonProps?: ButtonProps;
  rightButtonProps?: ButtonProps;
  data?: Patient;
};

export type Insurancetype = 'bpjs' | 'insurance' | 'company';

export type ReservationType = null | 'RJ' | 'MCU' | 'LAB' | 'RAD';

export type PaymentMethodProps = {
  handleGeneral: () => void;
  handleAssurance: (param: Insurancetype) => void;
  reservationType: ReservationType;
};

export type SelectPractitionerProps = {
  onCardSelect: (method?: string) => void;
  setSelectedPractitioner: (data: Nullable<SelectedPractioner>) => void;
};

export type SelectInsuranceProps = {
  handleSelect: () => void;
  handleSelectNew: () => void;
};

export type SelectCompanyProps = {
  handleSelect: () => void;
  handleSelectNew: () => void;
};

export type OutpatientType = 'general' | 'insurance' | 'company' | 'bpjs';

export type SuccessOutpatientType = {
  patientDetail: Patient | null;
  type: OutpatientType;
  reservationType: ReservationType;
  doctorInfo: Nullable<SelectedPractioner>;
  labPackage: Nullable<SelectedLabPackage>;
  radPackage: Nullable<SelectedRadiologyPackage>;
};

export type SelectInsuranceNewProps = {
  handleSelect: () => void;
};

export type SelectCompanyNewProps = {
  handleSelect: () => void;
};

export type InformationInsurancePatientDataProps = {
  handleBack: () => void;
  handleNext: () => void;
};

export type InformationCompanyEmployeeDataProps = {
  handleBack: () => void;
  handleNext: () => void;
};

export type InformationBPJSPatientDataProps = {
  handleBack: () => void;
  handleSelect: () => void;
};

export type SelectMCUPackageProps = {
  handleSelect: () => void;
};

export type LabelListTextCardProps = {
  listText: string[];
  headerText: string;
  sectionBottom: React.ReactNode;
  action: () => void;
};

export type InformationPatientProps = {
  title: string;
  handleBack: () => void;
  handleNext: () => void;
  detailData: {
    title: string;
    body: string;
  }[];
};

export type SelectLabPackageProps = {
  onCardSelect: () => void;
};

export type SelectRadServiceProps = {
  onCardSelect: () => void;
};

export type errMes = {
  dateErr: string;
  bookTimeErr: string;
  unableErr: string;
};

export type SelectTimeProps = {
  handleBack: () => void;
  handleConfirm: () => void;
  reservationType: ReservationType;
  doctorInfo: Nullable<SelectedPractioner>;
  errorMessage?: errMes;
};

export type FormValues = {
  date: Date;
  unable: string;
  bookTime: number[];
};

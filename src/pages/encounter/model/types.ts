import type { ButtonProps } from '@mui/material';
import type { CardBannerProps } from 'src/components/card-banner/types';
import { Doctor } from 'src/pages/doctor/model/types';
import { Patient } from 'src/pages/patient/model/types';
import type { Nullable } from 'src/types/common';

export type SelectEncounterTypeProps = {
  items: CardBannerProps[];
  handleResetEncounterType: () => void;
};

export type Insurancetype = 'bpjs' | 'insurance' | 'company';

export type EncounterType = null | 'RJ' | 'MCU' | 'LAB' | 'RAD';

export type GetPatientByNIKResponse = {
  patientID: string;
  nik: Nullable<string>;
  passportNumber: Nullable<string>;
  birthPlace: string;
  birthDttm: string;
  address: string;
  email: string;
  phone: string;
  name: string;
  gender: string;
  genderDisplay?: string;
  additional: {
    bloodType: string;
    bloodRhesus: string;
  };
};

export type ListDoctorResponse = {
  doctorID: string;
  doctorName: string;
  doctorImage: string;
  departmentName: string;
  departmentID: string;
  scheduleStart: string;
  scheduleEnd: string;
  patientQueued: number;
  patientCapacity: number;
}[];

export type ListMCUPackageResponse = {
  packageID: string;
  packageName: string;
  price: number;
  contents: string[];
}[];

export type ListLabPackageResponse = {
  packageID: string;
  packageName: string;
  price: number;
}[];

export type ListRadiologyPackageResponse = {
  packageID: string;
  packageName: string;
  price: number;
}[];

export type AvailableDoctorResponse = {
  doctorID: string;
  doctorName: string;
  doctorImage: string;
  departmentName: string;
  scheduleStart: string;
  scheduleEnd: string;
};

export type ListPolyResponse = {
  departmentID: string;
  departmentName: string;
}[];

export type InformationProps = {
  leftTextButton: string;
  rightTextButton: string;
  leftButtonProps?: ButtonProps;
  rightButtonProps?: ButtonProps;
  data: Patient;
};

export type PaymentMethodProps = {
  handleGeneral: () => void;
  handleAssurance: (param: Insurancetype) => void;
  encounterType: EncounterType;
};

export type SelectedPractioner = {
  polyName: string;
  doctor: string;
  serviceTime: string;
  person?: Doctor | null;
};

export type SelectedLabPackage = {
  name: string;
  price: number;
};

export type SelectedRadiologyPackage = {
  name: string;
  price: number;
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
  type: OutpatientType;
  encounterType: EncounterType;
  patientData: Patient;
  practitioner: Nullable<SelectedPractioner>;
  MCUPackageName: Nullable<string>;
  labPackage: Nullable<SelectedLabPackage>;
  radiologyPackage: Nullable<SelectedRadiologyPackage>;
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
  handleSelect: (params: { id: string; packageName: string }) => void;
  data: ListMCUPackageResponse;
  handleGetPackage: (keyword: string, page: number) => Promise<void>;
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
  onCardSelect: (params: { id: string } & SelectedLabPackage) => void;
  data: ListLabPackageResponse;
  handleGetPackage: (keyword: string, page: number) => Promise<void>;
};

export type SelectRadServiceProps = {
  onCardSelect: (params: { id: string } & SelectedLabPackage) => void;
  data: ListRadiologyPackageResponse;
  handleGetPackage: (keyword: string, page: number) => Promise<void>;
};

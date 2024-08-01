import type { ButtonProps } from '@mui/material';
import { Dispatch } from '@reduxjs/toolkit';
import { SetStateAction } from 'react';
import { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { CardBannerProps } from 'src/components/card-banner/types';
import { Nullable } from 'src/types/common';

export type SelectEncounterTypeProps = {
  items: CardBannerProps[];
  handleResetEncounterType: () => void
};

export type Insurancetype = 'bpjs' | 'insurance' | 'company';

export type EncounterType = null | "RJ" | "MCU" | "LAB" | "RAD"

export type GetPatientByNIKResponse = {
  patientID : string
  nik : Nullable<string>
  passportNumber : Nullable<string>
  birthPlace : string
  birthDttm : string
  address : string
  email : string
  phone : string
  name : string
  gender : string
  additional : {
    bloodType : string
    bloodRhesus : string
  }
}

export type ListDoctorResponse = {
  doctorID : string
  doctorName : string
  doctorImage : string
  departmentName : string
  departmentID : string
  scheduleStart : string
  scheduleEnd : string
  patientQueued : number
  patientCapacity : number
}[]

export type AvailableDoctorResponse = {
  doctorID : string
  doctorName : string
  doctorImage : string
  departmentName : string
  scheduleStart : string
  scheduleEnd : string
}

export type ListPolyResponse = {
  departmentID : string
  departmentName : string
}[]

export type InformationProps = {
  leftTextButton: string;
  rightTextButton: string;
  leftButtonProps?: ButtonProps;
  rightButtonProps?: ButtonProps;
  data: GetPatientByNIKResponse
};

export type PaymentMethodProps = {
  handleGeneral: () => void;
  handleAssurance: (param: Insurancetype) => void;
  encounterType: EncounterType
};

export type SelectedPractioner = {
  polyName: string;
  doctor: string;
  serviceTime: string;
}

export type SelectPractitionerProps = {
  onCardSelect: () => void;
  handleGetDoctor: (keyword: string, page: number) => Promise<void>
  handleGetPoly: (keyword: string, page: number) => Promise<void>
  setSelectedPractitioner: (data : Nullable<SelectedPractioner>) => void
  listDoctor: ListDoctorResponse
  listPoly: ListPolyResponse
  setFormValue : UseFormSetValue<FieldValues>,
  watchFormValue : UseFormWatch<FieldValues>
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
  type: OutpatientType
  encounterType: EncounterType
}

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
  handleSelect: () => void
}

export type LabelListTextCardProps = {
  listText: string[];
  headerText: string;
  sectionBottom: React.ReactNode
  action: () => void
}

export type InformationPatientProps = {
  title: string;
  handleBack: () => void;
  handleNext: () => void;
  detailData: {
    title: string
    body: string
  }[]
}

export type SelectLabPackageProps = {
  onCardSelect: () => void;
};

export type SelectRadServiceProps = {
  onCardSelect: () => void;
};

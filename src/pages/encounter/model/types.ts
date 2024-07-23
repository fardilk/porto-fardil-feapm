import type { ButtonProps } from '@mui/material';
import type { CardBannerProps } from 'src/components/card-banner/types';

export type SelectEncounterTypeProps = {
  items: CardBannerProps[];
};

export type InformationProps = {
  leftTextButton: string;
  rightTextButton: string;
  leftButtonProps?: ButtonProps;
  rightButtonProps?: ButtonProps;
};

export type Insurancetype = 'bpjs' | 'insurance' | 'company';

export type PaymentMethodProps = {
  handleGeneral: () => void;
  handleAssurance: (param: Insurancetype) => void;
};

export type SelectPractitionerProps = {
  onCardSelect: () => void;
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
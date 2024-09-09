import type { TFunction } from 'i18next';

export const buttonStyle: any = {
  fullWidth: true,
  size: 'large',
  variant: 'contained',
  color: 'secondary',
};

export const getPaymentType = (type: string, t: TFunction) => {
  switch (type) {
    case 'general':
      return {
        title: t('appointment.encounter.payplan'),
        body: 'Umum',
        localIcon: 'pembayaran-umum',
      };
    case 'insurance':
      return {
        title: t('appointment.encounter.payplan'),
        body: 'Asuransi',
        localIcon: 'asuransi',
      };

    case 'company':
      return {
        title: t('appointment.encounter.payplan'),
        body: 'Perusahaan',
        localIcon: 'perusahaan',
      };

    default:
      return {
        title: t('appointment.encounter.payplan'),
        body: 'BPJS',
        localIcon: 'bpjs',
      };
  }
};

export const initialStep = [
  {
    label: 'appointment.steps.select_encounter_type',
    value: 'select_encounter_type',
    properties: {
      disableBack: true,
      containerSize: 'large',
    },
  },
  {
    label: 'appointment.steps.insert_nik',
    value: 'insert_nik',
  },
  {
    label: 'appointment.steps.information_outpatient_general',
    value: 'information_outpatient_general',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'appointment.steps.payment_method',
    value: 'payment_method',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsOutpatientGeneral = [
  ...initialStep,
  {
    label: 'appointment.steps.select_healthcare_practitioner',
    value: 'select_healthcare_practitioner',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'appointment.steps.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'appointment.steps.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsOutpatientInsurance = [
  ...initialStep,
  {
    label: 'appointment.steps.select_insurance',
    value: 'select_insurance',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'appointment.steps.select_insurance',
    value: 'select_insurance_new',
  },
  {
    label: 'appointment.steps.insert_polis_number',
    value: 'insert_polis_number',
  },
  {
    label: 'appointment.steps.information_data_patient_insurance',
    value: 'information_data_patient_insurance',
  },
  {
    label: 'appointment.steps.select_healthcare_practitioner',
    value: 'select_healthcare_practitioner',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'appointment.steps.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'appointment.steps.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsOutpatientCompany = [
  ...initialStep,
  {
    label: 'appointment.steps.select_company',
    value: 'select_company',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'appointment.steps.select_company_new',
    value: 'select_company_new',
  },
  {
    label: 'appointment.steps.insert_employee_number',
    value: 'insert_employee_number',
  },
  {
    label: 'appointment.steps.information_data_employee',
    value: 'information_data_employee',
  },
  {
    label: 'appointment.steps.select_healthcare_practitioner',
    value: 'select_healthcare_practitioner',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'appointment.steps.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'appointment.steps.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsOutpatientBPJS = [
  {
    label: 'appointment.steps.insert_bpjs_number',
    value: 'insert_bpjs_number',
  },
  {
    label: 'appointment.steps.information_patient_data_bpjs',
    value: 'information_patient_data_bpjs',
  },
  {
    label: 'appointment.steps.select_healthcare_practitioner',
    value: 'select_healthcare_practitioner',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'appointment.steps.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'appointment.steps.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsMCUGeneral = [
  ...initialStep,
  {
    label: 'appointment.steps.select_mcu_package',
    value: 'select_mcu_package',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'appointment.steps.confirmation_patient_registration_mcu',
    value: 'confirmation_patient_registration_mcu',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'appointment.steps.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsMCUAssurance = [
  ...initialStep,
  {
    label: 'appointment.steps.select_insurance',
    value: 'select_insurance',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'appointment.steps.select_insurance',
    value: 'select_insurance_new',
  },
  {
    label: 'appointment.steps.select_mcu_package',
    value: 'select_mcu_package',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'appointment.steps.confirmation_patient_registration_mcu',
    value: 'confirmation_patient_registration_mcu',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'appointment.steps.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsMCUCompany = [
  ...initialStep,
  {
    label: 'appointment.steps.company.select_company',
    value: 'select_company',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'appointment.steps.company.select_company_new',
    value: 'select_company_new',
  },
  {
    label: 'appointment.steps.select_mcu_package',
    value: 'select_mcu_package',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'appointment.steps.confirmation_patient_registration_mcu',
    value: 'confirmation_patient_registration_mcu',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'appointment.steps.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsLabGeneral = [
  ...initialStep,
  {
    label: 'appointment.steps.select_lab_package',
    value: 'select_lab_package',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'appointment.steps.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'appointment.steps.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsLabInsurance = [
  ...initialStep,
  {
    label: 'appointment.steps.select_insurance',
    value: 'select_insurance',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'appointment.steps.select_insurance',
    value: 'select_insurance_new',
  },
  {
    label: 'appointment.steps.insert_polis_number',
    value: 'insert_polis_number',
  },
  {
    label: 'appointment.steps.information_data_patient_insurance',
    value: 'information_data_patient_insurance',
  },
  {
    label: 'appointment.steps.select_lab_package',
    value: 'select_lab_package',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'appointment.steps.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'appointment.steps.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsLabCompany = [
  ...initialStep,
  {
    label: 'appointment.steps.select_company',
    value: 'select_company',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'appointment.steps.select_company_new',
    value: 'select_company_new',
  },
  {
    label: 'appointment.steps.insert_employee_number',
    value: 'insert_employee_number',
  },
  {
    label: 'appointment.steps.information_data_employee',
    value: 'information_data_employee',
  },
  {
    label: 'appointment.steps.select_lab_package',
    value: 'select_lab_package',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'appointment.steps.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'appointment.steps.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsRadGeneral = [
  ...initialStep,
  {
    label: 'appointment.steps.select_rad_service',
    value: 'select_rad_service',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'appointment.steps.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'appointment.steps.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsRadInsurance = [
  ...initialStep,
  {
    label: 'appointment.steps.select_insurance',
    value: 'select_insurance',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'appointment.steps.select_insurance',
    value: 'select_insurance_new',
  },
  {
    label: 'appointment.steps.insert_polis_number',
    value: 'insert_polis_number',
  },
  {
    label: 'appointment.steps.information_data_patient_insurance',
    value: 'information_data_patient_insurance',
  },
  {
    label: 'appointment.steps.select_rad_service',
    value: 'select_rad_service',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'appointment.steps.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'appointment.steps.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsRadCompany = [
  ...initialStep,
  {
    label: 'appointment.steps.select_company',
    value: 'select_company',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'appointment.steps.select_company_new',
    value: 'select_company_new',
  },
  {
    label: 'appointment.steps.insert_employee_number',
    value: 'insert_employee_number',
  },
  {
    label: 'appointment.steps.information_data_employee',
    value: 'information_data_employee',
  },
  {
    label: 'appointment.steps.select_rad_service',
    value: 'select_rad_service',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'appointment.steps.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'appointment.steps.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

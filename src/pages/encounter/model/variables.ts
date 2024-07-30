import { TFunction } from "i18next";

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
    label: 'appointment.steps.select_encounter_type', //'Pilih Jenis Kunjungan',
    value: 'select_encounter_type',
    properties: {
      disableBack: true,
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
    label: 'encounter.outpatient.general.select_healthcare_practitioner',
    value: 'select_healthcare_practitioner',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'encounter.outpatient.general.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'encounter.outpatient.general.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsOutpatientInsurance = [
  ...initialStep,
  {
    label: 'encounter.outpatient.insurance.select_insurance',
    value: 'select_insurance',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'encounter.outpatient.insurance.select_insurance',
    value: 'select_insurance_new',
  },
  {
    label: 'encounter.outpatient.insurance.insert_polis_number',
    value: 'insert_polis_number',
  },
  {
    label: 'encounter.outpatient.insurance.information_data_patient_insurance',
    value: 'information_data_patient_insurance',
  },
  {
    label: 'encounter.outpatient.general.select_healthcare_practitioner',
    value: 'select_healthcare_practitioner',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'encounter.outpatient.general.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'encounter.outpatient.general.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsOutpatientCompany = [
  ...initialStep,
  {
    label: 'encounter.outpatient.company.select_company',
    value: 'select_company',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'encounter.outpatient.company.select_company_new',
    value: 'select_company_new',
  },
  {
    label: 'encounter.outpatient.company.insert_employee_number',
    value: 'insert_employee_number',
  },
  {
    label: 'encounter.outpatient.company.information_data_employee',
    value: 'information_data_employee',
  },
  {
    label: 'encounter.outpatient.general.select_healthcare_practitioner',
    value: 'select_healthcare_practitioner',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'encounter.outpatient.general.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'encounter.outpatient.general.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsOutpatientBPJS = [
  {
    label: 'encounter.outpatient.bpjs.insert_bpjs_number',
    value: 'insert_bpjs_number',
  },
  {
    label: 'encounter.outpatient.bpjs.information_patient_data_bpjs',
    value: 'information_patient_data_bpjs',
  },
  {
    label: 'encounter.outpatient.general.select_healthcare_practitioner',
    value: 'select_healthcare_practitioner',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'encounter.outpatient.general.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'encounter.outpatient.general.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsMCUGeneral = [
  ...initialStep,
  {
    label: 'encounter.mcu.general.select_mcu_package',
    value: 'select_mcu_package',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'encounter.mcu.general.confirmation_patient_registration_mcu',
    value: 'confirmation_patient_registration_mcu',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'encounter.mcu.general.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsMCUAssurance = [
  ...initialStep,
  {
    label: 'encounter.mcu.insurance.select_insurance',
    value: 'select_insurance',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'encounter.mcu.insurance.select_insurance',
    value: 'select_insurance_new',
  },
  {
    label: 'encounter.mcu.general.select_mcu_package',
    value: 'select_mcu_package',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'encounter.mcu.general.confirmation_patient_registration_mcu',
    value: 'confirmation_patient_registration_mcu',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'encounter.mcu.general.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsMCUCompany = [
  ...initialStep,
  {
    label: 'encounter.mcu.company.select_company',
    value: 'select_company',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'encounter.mcu.company.select_company_new',
    value: 'select_company_new',
  },
  {
    label: 'encounter.mcu.general.select_mcu_package',
    value: 'select_mcu_package',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'encounter.mcu.general.confirmation_patient_registration_mcu',
    value: 'confirmation_patient_registration_mcu',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'encounter.mcu.general.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsLabGeneral = [
  ...initialStep,
  {
    label: 'encounter.laboratory.general.select_lab_package',
    value: 'select_lab_package',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'encounter.laboratory.general.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'encounter.laboratory.general.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsLabInsurance = [
  ...initialStep,
  {
    label: 'encounter.laboratory.insurance.select_insurance',
    value: 'select_insurance',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'encounter.laboratory.insurance.select_insurance',
    value: 'select_insurance_new',
  },
  {
    label: 'encounter.laboratory.insurance.insert_polis_number',
    value: 'insert_polis_number',
  },
  {
    label: 'encounter.laboratory.insurance.information_data_patient_insurance',
    value: 'information_data_patient_insurance',
  },
  {
    label: 'encounter.laboratory.general.select_lab_package',
    value: 'select_lab_package',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'encounter.laboratory.general.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'encounter.laboratory.general.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsLabCompany = [
  ...initialStep,
  {
    label: 'encounter.laboratory.company.select_company',
    value: 'select_company',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'encounter.laboratory.company.select_company_new',
    value: 'select_company_new',
  },
  {
    label: 'encounter.laboratory.company.insert_employee_number',
    value: 'insert_employee_number',
  },
  {
    label: 'encounter.laboratory.company.information_data_employee',
    value: 'information_data_employee',
  },
  {
    label: 'encounter.laboratory.general.select_lab_package',
    value: 'select_lab_package',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'encounter.laboratory.general.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'encounter.laboratory.general.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];


export const formStepsRadGeneral = [
  ...initialStep,
  {
    label: 'encounter.radiology.general.select_rad_service',
    value: 'select_rad_service',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'encounter.radiology.general.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'encounter.radiology.general.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsRadInsurance = [
  ...initialStep,
  {
    label: 'encounter.radiology.insurance.select_insurance',
    value: 'select_insurance',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'encounter.radiology.insurance.select_insurance',
    value: 'select_insurance_new',
  },
  {
    label: 'encounter.radiology.insurance.insert_polis_number',
    value: 'insert_polis_number',
  },
  {
    label: 'encounter.radiology.insurance.information_data_patient_insurance',
    value: 'information_data_patient_insurance',
  },
  {
    label: 'encounter.radiology.general.select_rad_service',
    value: 'select_rad_service',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'encounter.radiology.general.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'encounter.radiology.general.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsRadCompany = [
  ...initialStep,
  {
    label: 'encounter.radiology.company.select_company',
    value: 'select_company',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'encounter.radiology.company.select_company_new',
    value: 'select_company_new',
  },
  {
    label: 'encounter.radiology.company.insert_employee_number',
    value: 'insert_employee_number',
  },
  {
    label: 'encounter.radiology.company.information_data_employee',
    value: 'information_data_employee',
  },
  {
    label: 'encounter.radiology.general.select_rad_service',
    value: 'select_rad_service',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'encounter.radiology.general.confirmation_patient_registration',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'encounter.radiology.general.registration_success',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

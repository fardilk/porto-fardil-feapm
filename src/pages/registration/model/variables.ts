const stepInsertNIK = {
  label: 'Masukkan NIK',
  value: 'insert_nik',
  properties: {
    i18n: 'registration.title.enter_nik',
  },
};

export const formStepsNotExistInternal = [
  stepInsertNIK,
  {
    label: 'Pilih Jenis Pendaftaran',
    value: 'select_registration_method',
    properties: {
      hideBack: true,
      containerSize: 'superlarge',
      i18n: 'registration.title.select_registration_type',
    },
  },
];

export const formStepsExistInInternal = [
  stepInsertNIK,
  {
    label: 'Informasi Data Pasien',
    value: 'information',
    properties: {
      hideBack: true,
      i18n: 'registration.title.patient_data_info',
    },
  },
  {
    label: 'Masukkan Nomor Telepon',
    value: 'insert_phone_number',
    properties: {
      i18n: 'registration.title.enter_phone_number',
    },
  },
  {
    label: 'Masukkan Email',
    value: 'insert_email',
    properties: {
      i18n: 'registration.title.enter_email',
    },
  },
];

export const formStepsExistInSatuSehat = [
  ...formStepsNotExistInternal,
  {
    label: 'Isi Data Pasien Baru',
    value: 'create_new_patient',
    properties: {
      i18n: 'registration.title.fill_new_patient_data',
    },
  },
  {
    label: 'Isi Data Pasien Baru',
    value: 'create_detail_new_patient',
    properties: {
      i18n: 'registration.title.fill_new_patient_data',
    },
  },
  {
    label: 'Konfirmasi Data Pasien',
    value: 'confirmation_new_patient',
    properties: {
      hideBack: true,
      i18n: 'registration.title.confirm_patient_data',
    },
  },
  {
    label: 'Pendaftaran Berhasil',
    value: 'success_new_patient',
    properties: {
      hideBack: true,
      i18n: 'registration.title.registration_successful',
    },
  },
];

export const formStepsRegistrationMethodByPhone = [
  ...formStepsNotExistInternal,
  {
    label: 'Masukkan Nomor Telepon',
    value: 'insert_phone_number',
    properties: {
      hideBack: true,
      i18n: 'registration.title.enter_phone_number_again',
    },
  },
  {
    label: 'Cek Whatsapp Anda atau Scan Barcode',
    value: 'barcode_phone',
    properties: {
      hideBack: true,
      i18n: 'registration.title.check_whatsapp_or_scan_barcode',
    },
  },
];

export const formStepsNotExistInSatuSehat = [
  ...formStepsNotExistInternal,
  {
    label: 'Isi Data Pasien Baru',
    value: 'create_new_patient',
    properties: {
      hideBack: true,
      i18n: 'registration.title.fill_new_patient_data',
    },
  },
  {
    label: 'Isi Data Pasien Baru',
    value: 'create_detail_new_patient',
    properties: {
      hideBack: true,
      i18n: 'registration.title.fill_new_patient_data',
    },
  },
  {
    label: 'Konfirmasi Data Pasien',
    value: 'confirmation_new_patient',
    properties: {
      hideBack: true,
      i18n: 'registration.title.confirm_patient_data',
    },
  },
  {
    label: 'Pendaftaran Berhasil',
    value: 'success_new_patient',
    properties: {
      hideBack: true,
      i18n: 'registration.title.registration_successful',
    },
  },
];

export const formStepsForeign = [
  {
    label: 'Submit Passport',
    value: 'insert_nik',
    properties: {
      i18n: 'registration.title.submit_passport',
    },
  },
  {
    label: 'Entry New Data Patient',
    value: 'create_new_patient',
    properties: {
      hideBack: true,
      i18n: 'registration.title.confirm_patient_data',
    },
  },
  {
    label: 'Patient Data Confirmation',
    value: 'confirmation_new_patient',
    properties: {
      hideBack: true,
      i18n: 'registration.title.confirm_patient_data',
    },
  },
  {
    label: 'Registration Successful',
    value: 'success_new_patient',
    properties: {
      hideBack: true,
      i18n: 'registration.title.registration_successful',
    },
  },
];

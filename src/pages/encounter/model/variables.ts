export const getPaymentType = (type: string) => {
  switch (type) {
    case 'general':
      return {
        title: 'Tipe Pembayaran',
        body: 'Umum',
        localIcon: 'pembayaran-umum',
      };
    case 'insurance':
      return {
        title: 'Tipe Pembayaran',
        body: 'Asuransi',
        localIcon: 'asuransi',
      };

    case 'company':
      return {
        title: 'Tipe Pembayaran',
        body: 'Perusahaan',
        localIcon: 'perusahaan',
      };

    default:
      return {
        title: 'Tipe Pembayaran',
        body: 'BPJS',
        localIcon: 'bpjs',
      };
  }
};

export const initialStep = [
  {
    label: 'Pilih Jenis Kunjungan',
    value: 'select_encounter_type',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'Masukkan NIK',
    value: 'insert_nik',
  },
  {
    label: 'Informasi Data Pasien',
    value: 'information_outpatient_general',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'Pilih Jenis Pembayaran',
    value: 'payment_method',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsOutpatientGeneral = [
  ...initialStep,
  {
    label: 'Pilih Dokter Poli',
    value: 'select_healthcare_practitioner',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'Konfirmasi Pendaftaran Pasien',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'Pendaftaran Berhasil',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsOutpatientInsurance = [
  ...initialStep,
  {
    label: 'Pilih Asuransi',
    value: 'select_insurance',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'Pilih Asuransi',
    value: 'select_insurance_new',
  },
  {
    label: 'Masukkan Nomor Polis Asuransi',
    value: 'insert_polis_number',
  },
  {
    label: 'Informasi Data Asuransi Pasien',
    value: 'information_data_patient_insurance',
  },
  {
    label: 'Pilih Dokter Poli',
    value: 'select_healthcare_practitioner',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'Konfirmasi Pendaftaran Pasien',
    value: 'confirmation_patient_registration_insurance',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'Pendaftaran Berhasil',
    value: 'registration_success_insurance',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsOutpatientCompany = [
  ...initialStep,
  {
    label: 'Pilih Perusahaan',
    value: 'select_company',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'Pilih Perusahaan',
    value: 'select_company_new',
  },
  {
    label: 'Masukkan Nomor Karyawan',
    value: 'insert_employee_number',
  },
  {
    label: 'Informasi Data Karyawan',
    value: 'information_data_employee',
  },
  {
    label: 'Pilih Dokter Poli',
    value: 'select_healthcare_practitioner',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'Konfirmasi Pendaftaran Pasien',
    value: 'confirmation_patient_registration_company',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'Pendaftaran Berhasil',
    value: 'registration_success_company',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsOutpatientBPJS = [
  {
    label: 'Masukan / Scan Nomor Kartu BPJS',
    value: 'insert_bpjs_number',
  },
  {
    label: 'Informasi Data Pasien BPJS',
    value: 'information_patient_data_bpjs',
  },
  {
    label: 'Pilih Dokter Poli',
    value: 'select_healthcare_practitioner',
  },
  {
    label: 'Konfirmasi Pendaftaran Pasien',
    value: 'confirmation_patient_registration_bpjs',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'Pendaftaran Berhasil',
    value: 'registration_success_bpjs',
    properties: {
      disableBack: true,
    },
  },
];

export const formStepsMCUGeneral = [
  ...initialStep,
  {
    label: 'Pilih Paket MCU yang anda inginkan',
    value: 'select_mcu_package',
    properties: {
      disableBack: true,
      containerSize: 'superLarge',
    },
  },
  {
    label: 'Konfirmasi Pendaftaran Pasien',
    value: 'confirmation_patient_registration_mcu',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'Pendaftaran Berhasil',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];

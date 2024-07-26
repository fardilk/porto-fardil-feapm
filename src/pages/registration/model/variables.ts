const stepInsertNIK = {
  label: "Masukkan NIK",
  value: "insert_nik"
}

export const formStepsNotExistInternal = [
  stepInsertNIK,
  {
    label: "Pilih Jenis Pendaftaran",
    value: "select_registration_method",
    properties: {
      hideBack: true,
      containerSize: "superlarge"
    }
  }
]

export const formStepsExistInInternal = [
  stepInsertNIK,
  {
    label: "Informasi Data Pasien",
    value: "information",
    properties: {
      hideBack: true,
    }
  },
  {
    label: "Masukkan Nomor Telepon",
    value: "insert_phone_number"
  },
  {
    label: "Masukkan Email",
    value: "insert_email"
  }
]
  
export const formStepsExistInSatuSehat = [
  ...formStepsNotExistInternal,
  {
    label: "Isi Data Pasien Baru",
    value: "create_new_patient"
  },
  {
    label: "Isi Data Pasien Baru",
    value: "create_detail_new_patient"
  },
  {
    label: "Konfirmasi Data Pasien",
    value: "confirmation_new_patient",
    properties: {
      hideBack: true,
    }
  },
  {
    label: "Pendaftaran Berhasil",
    value: "success_new_patient",
    properties: {
      hideBack: true,
    }
  }
]

export const formStepsRegistrationMethodByPhone = [
  ...formStepsNotExistInternal,
  {
    label: "Masukkan Nomor Telepon",
    value: "insert_phone_number"
  },
  {
    label: "Cek Whatsapp Anda atau Scan Barcode",
    value: "barcode_phone"
  }
]
  
export const formStepsNotExistInSatuSehat = [
  ...formStepsNotExistInternal,
  {
    label: "Isi Data Pasien Baru",
    value: "create_new_patient"
  },
  {
    label: "Isi Data Pasien Baru",
    value: "create_detail_new_patient"
  },
  {
    label: "Konfirmasi Data Pasien",
    value: "confirmation_new_patient",
    properties: {
      hideBack: true,
    }
  },
  {
    label: "Pendaftaran Berhasil",
    value: "success_new_patient",
    properties: {
      hideBack: true,
    }
  }
]
  
export const formStepsForeign = [
  {
    label: "Submit Passport",
    value: "insert_nik",
    properties: {
      i18n: "doctor_visit.title_input_passport"
    }
  },
  {
    label: "Entry New Data Patient",
    value: "create_new_patient"
  },
  {
    label: "Patient Data Confirmation",
    value: "confirmation_new_patient",
    properties: {
      hideBack: true,
    }
  },
  {
    label: "Registration Successful",
    value: "success_new_patient",
    properties: {
      hideBack: true,
    }
  }
]

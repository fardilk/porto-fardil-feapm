export type Package = {
  packageID: string;
  packageName: string;
};

export type Encounter = {
  healthcareServiceName: string;
  practitionerName: string;
  payor: string;
  scheduleSlotDate: string;
  scheduleSlotStartTime: string;
  scheduleSlotStopTime: string;
  package: Package;
};

export type PatientAdditionalData = {
  bloodType: string;
  bloodRhesus: string;
  education: string;
  occupation: string;
  dailyLanguage: string;
};

export type PayorDetails = {
  policyNo: string;
  payplanName: string;
  providerName: string;
  employeeNo: string;
  companyName: string;
};

export type Patient = {
  patientID: string;
  identifierTypeCode: string;
  identifierValue: string;
  medrec: string;
  name: string;
  gender: string;
  religion: string;
  birthPlace: string;
  birthDttm: string;
  maritalStatus: string;
  phone: string;
  email: string;
  nationality: string;
  address: string;

  additional: PatientAdditionalData;

  payorDetails: PayorDetails;
};

export type Booking = {
  bookingID: string;
  bookingNumber: string;
  channel: string;
  payplan: string;
  notes: string;

  encounter: Encounter;
  patient: Patient;
  // bpjs: Bpjs
};

export type BookingInputServiceParamOutpatient = {
  doctorID: string;
  departmentID: string;
};

export type BookingInputServiceParamMcu = {
  packageID: string;
};

export type BookingInputServiceParamLaboratory = {
  packageID: string;
};

export type BookingInputServiceParamRadiology = {
  packageID: string;
};

export type BookingInputPayplanParamBpjs = {
  cardNo: string;
  referralID: string;
};

export type BookingInputPayplanParamInsurance = {
  payorID: string;
};

export type BookingInputPayplanParamCompany = {
  payorID: string;
};

export type BookingInputPayorParam = {
  payplanClass: string;
  payplanParamBpjs?: BookingInputPayplanParamBpjs;
  payplanParamInsurance?: BookingInputPayplanParamInsurance;
  payplanParamCompany?: BookingInputPayplanParamCompany;
};

export type BookingInput = {
  serviceType: string;
  serviceParamOutpatient?: BookingInputServiceParamOutpatient;
  serviceParamMcu?: BookingInputServiceParamMcu;
  serviceParamLaboratory?: BookingInputServiceParamLaboratory;
  serviceParamRadiology?: BookingInputServiceParamRadiology;
  payorParam: BookingInputPayorParam;
};

import { Patient } from 'src/pages/patient/model/types';

export type AppointmentInput = {
  booking: BookingInput;
  serviceParamOutpatient: AppointmentInputServiceParamOutpatient;
  scheduleDate: string;
};

export type AppointmentInputServiceParamOutpatient = {
  doctorUnavailableAction: string;
};

export type AppointmentCreateResultOne = {
  status: boolean;
  message: string;
  data: Appointment;
};

export type Appointment = {
  booking: Booking;
  schedule: Schedule;
};

export type Schedule = {
  date: string;
  slotTime: string;
};

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

export type Bpjs = {
  subscriberNumber: string;
  subscriberClass: string;
  subscriberCategory: string;
  subscriberInstitution: string;
  subscriberStatus: string;
  referralNumber: string;
  referralDate: string;
  performerServiceName: string;
};

export type Booking = {
  bookingID: string;
  bookingNumber: string;
  channel: string;
  payplan: string;
  notes: string;

  encounter: Encounter;
  patient: Patient;
  bpjs: Bpjs;
};

export type BookingInputServiceParamOutpatient = {
  scheduleID: string;
  slotID?: string;
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
  payorIDpatientCoverageID: string;
  subscriberWarrantyNumber: string;
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

export type BookingCreateResultOne = {
  status: boolean;
  message: string;
  data: Booking;
};

export type PrintBarcodeResultMutation = {
  status: boolean;
  message: string;
};

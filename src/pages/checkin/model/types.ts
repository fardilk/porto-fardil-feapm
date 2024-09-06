import { Nullable } from 'src/types/common';

export type InsertBookingProps = {
  errorMessage?: string;
};

// export type CheckinResponse = {

// }

export type BookingType = {
  bookingID: string;
  bookingNumber: string;
  notes: string;
  encounter: Encounter;
  patient: Patient;
  bpjs?: Bpjs;
};

export type Encounter = {
  healthcareServiceName: string;
  practitionerName: string;
  scheduleSlotDate: string;
  package?: Package;
};

export type Package = {
  packageID: string;
  packageName: string;
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

export type Patient = {
  patientID: string;
  identifierTypeCode?: string;
  identifierValue?: string;
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
  additional?: PatientAdditionalData;
};

export type PatientAdditionalData = {
  bloodType: string;
  bloodRhesus: string;
  education: string;
  occupation: string;
  dailyLanguage: string;
};

type PayorDetailsInsurance = {
  policyNo: string;
  payplanName: string;
  providerName: string;
};

type PayorDetailsCompany = {
  employeeNo: string;
  payplanName: string;
  companyName: string;
};

type PayorDetails = PayorDetailsInsurance | PayorDetailsCompany;

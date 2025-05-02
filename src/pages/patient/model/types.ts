import { NonPaginationType, PaginationType } from 'src/@types/global';

export type Patient = {
  patientID: string;
  identifierTypeCode?: string;
  identifierValue?: string;
  medrec: string;
  name: string;
  gender: string;
  genderDisplay: string;
  religion: string;
  birthPlace: string;
  birthDttm: string;
  maritalStatus: string;
  phone: string;
  email: string;
  nationality: string;
  address: string;
  statusAdmission: string;

  additional: PatientAdditionalData;
};

export type PatientAdditionalData = {
  bloodType?: string;
  bloodTypeDisplay?: string;
  bloodRhesus?: string;
  bloodRhesusDisplay?: string;
  education?: string;
  occupation?: string;
  dailyLanguage?: string;
};

export type RegisterResponse = {
  status: boolean;
  message: string;
  data: Patient;
};

export type PatientOne = NonPaginationType & {
  status: boolean;
  message: string;
  data: Patient;
};

export type PatientResult = PaginationType & {
  data: Patient[];
};

export type PatientOneSatuSehat = NonPaginationType & {
  data: Patient[];
};

export type AddressInput = {
  addressUse: string;
  addressLine1: string;
  addressPostalcode: string;
  country: string;
  state: string;
  city: string;
  district: string;
  subdistrict: string;
  rt?: string;
  rw?: string;
};

export type PatientCreateInput = {
  identifierTypeCode: string;
  identifierValue: string;
  name: string;
  gender: string;
  religion: string;
  birthPlace: string;
  birthDttm: string;
  maritalStatus: string;
  phone: string;
  email: string;
  nationality: string;
  // address: string;
  addressidentity: AddressInput;

  additional: PatientCreateInputAdditionalData;
};

export type PatientCreateInputAdditionalData = {
  bloodType?: string;
  bloodTypeDisplay?: string;
  bloodRhesus?: string;
  bloodRhesusDisplay?: string;
  education?: string;
  occupation?: string;
  dailyLanguage?: string;
};

export type PatientUpdateInput = {
  phone: string;
  email: string;
};

import { PaginationInfoType } from 'src/@types/global';

export type References = {
  referralNumber: string;
  referralDate: string;
  referralHealthFacility: string;
  performerServiceName: string;
};

export type Bpjs = {
  subscriberNumber: string;
  subscriberName: string;
  subscriberBirthPlace: string;
  subscriberBirthDate: string;
  subscriberInstitution: string;
  subscriberClass: string;
  subscriberCategory: string;
  subscriberStatus: string;
  references: References[];
};

export type InsurancePatient = {
  patientCoverageID: string;
  name: string;
  dateStart: string;
  dateExpire: string;
  policyNo: string;
  warrantyNo: string;
  inhealthNo: string;
  inhealthClass: string;
};

export type Insurance = {
  insuranceId: string;
  insuranceName: string;
  patient?: InsurancePatient;
};

export type CompanyPatient = {
  patientCoverageID: string;
  scheme: string;
  name: string;
  dateStart: string;
  dateExpired: string;
  policyNo: string;
  subscribeWarrantyNumber: string;
};

export type Company = {
  companyId: string;
  companyName: string;
  patient?: CompanyPatient;
};

export type CompanyListResponse = {
  status: boolean;
  message: string;
  pagination: PaginationInfoType;
  data: Company[];
};

export type CompanyListAllResponse = {
  status: boolean;
  message: string;
  pagination: PaginationInfoType;
  data: Company[];
};

export type InsuranceListResponse = {
  status: boolean;
  message: string;
  pagination: PaginationInfoType;
  data: Insurance[];
};

export type InsuranceListAllResponse = {
  status: boolean;
  message: string;
  pagination: PaginationInfoType;
  data: Insurance[];
};

export type PatientCoverageInput = {
  patientID: string;
  payplanID: string;
  subscriberName: string;
  subscibreNumber: string;
};

export type CreatePatientCoverageAPMResultOne = {
  patientCoverageID: string;
  subscriberWarrantyNumber: string;
};

export type CreatePatientCoverageAPMResult = {
  status: boolean;
  message: string;
  data: CreatePatientCoverageAPMResultOne;
};

export type Payplan = {
  payplanID: string;
  payplanName: string;
};

export type PayplanResultDropdown = {
  status: boolean;
  message: string;
  data: Payplan[];
};

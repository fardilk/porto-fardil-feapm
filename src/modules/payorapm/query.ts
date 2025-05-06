import { PaginationInfoQuery } from 'src/@types/query';

export const ReferencesQuery = `
  referralNumber
  referralDate
  referralHealthFacility
  performerServiceName
`;

export const BpjsQuery = `
  subscriberNumber
  subscriberName
  subscriberBirthPlace
  subscriberBirthDate
  subscriberInstitution
  subscriberClass
  subscriberCategory
  subscriberStatus
  references { ${ReferencesQuery} }
`;

export const InsurancePatientQuery = `
  patientCoverageID
  name
  dateStart
  dateExpire
  policyNo
  warrantyNo
  inhealthNo
  inhealthClass
`;

export const InsuranceQuery = `
  insuranceId
  insuranceName
  patient { ${InsurancePatientQuery} }
`;

export const CompanyPatientQuery = `
  patientCoverageID
  scheme
  name
  dateStart
  dateExpired
  policyNo
  subscribeWarrantyNumber
`;

export const CompanyQuery = `
  companyId
  companyName
  patient { ${CompanyPatientQuery} }
`;

export const CompanyListResponseQuery = `
  status
  message
  pagination { ${PaginationInfoQuery} }
  data { ${CompanyQuery} }
`;

export const CompanyListAllResponseQuery = `
  status
  message
  pagination { ${PaginationInfoQuery} }
  data { ${CompanyQuery} }
`;

export const InsuranceListResponseQuery = `
  status
  message
  pagination { ${PaginationInfoQuery} }
  data { ${InsuranceQuery} }
`;

export const InsuranceListAllResponseQuery = `
  status
  message
  pagination { ${PaginationInfoQuery} }
  data { ${InsuranceQuery} }
`;

export const CreatePatientCoverageAPMResultOneQuery = `
  patientCoverageID
  subscriberWarrantyNumber
`;

export const CreatePatientCoverageAPMResultQuery = `
  status
  message
  data { ${CreatePatientCoverageAPMResultOneQuery} }
`;

export const PayplanQuery = `
  payplanID
  payplanName
  payplanPeriodStart
  payplanPeriodEnd
`;

export const PayplanResultDropdownQuery = `
  status
  message
  data { ${PayplanQuery} }
`;

export const PackageQuery = `
  packageID
  packageName
`;

export const EncounterQuery = `
  healthcareServiceName
  practitionerName
  payor
  scheduleSlotDate
  scheduleSlotStartTime
  scheduleSlotStopTime
  package { ${PackageQuery} }
`;

export const PatientAdditionalDataQuery = `
  bloodType
  bloodRhesus
  education
  occupation
  dailyLanguage
`;

export const PayorDetailsQuery = `
  policyNo
  payplanName
  providerName
  employeeNo
  companyName
`;

export const PatientQuery = `
  patientID
  identifierTypeCode
  identifierValue
  medrec
  name
  gender
  religion
  birthPlace
  birthDttm
  maritalStatus
  phone
  email
  nationality
  address

  additional { ${PatientAdditionalDataQuery} }

  payorDetails {
  ... on PayorDetailsInsurance {
      policyNo
      payplanName
      providerName
    }
    ... on PayorDetailsCompany {
      employeeNo
      payplanName
      companyName
    }
  }
`;

export const BpjsQuery = `
  subscriberNumber
  subscriberClass
  subscriberCategory
  subscriberInstitution
  subscriberStatus
  referralNumber
  referralDate
  performerServiceName
`;

export const BookingQuery = `
  bookingID
  bookingNumber
  channel
  payplan
  notes
  encounter { ${EncounterQuery} }
  patient { ${PatientQuery} }
  bpjs { ${BpjsQuery} }
`;

export const BookingCreateResultOneQuery = `
  status
  message
  data { ${BookingQuery} }
`;

export const ScheduleQuery = `
  date
  slotTime
`;

export const AppointmentQuery = `
  booking { ${BookingQuery} }
  schedule { ${ScheduleQuery} }
`;

export const AppointmentCreateResultOneQuery = `
  status
  message
  data { ${AppointmentQuery} }
`;

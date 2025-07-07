export const PatientAdditionalDataQuery = `
  bloodType
  bloodTypeDisplay
  bloodRhesus
  bloodRhesusDisplay
  education
  occupation
  occupationDisplay
  dailyLanguage
`;

export const PatientQuery = `
  patientID
  identifierTypeCode
  identifierValue
  medrec
  name
  gender
  genderDisplay
  religion
  birthPlace
  birthDttm
  maritalStatus
  phone
  email
  nationality
  address
  statusAdmission

  additional { ${PatientAdditionalDataQuery} }

  queueNo
`;

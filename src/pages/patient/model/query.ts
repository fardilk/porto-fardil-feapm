export const PatientAdditionalDataQuery = `
  bloodType
  bloodTypeDisplay
  bloodRhesus
  bloodRhesusDisplay
  education
  occupation
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

  additional { ${PatientAdditionalDataQuery} }
`;

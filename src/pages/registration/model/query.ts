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

  additional {
    bloodType
    bloodRhesus
    education
    occupation
    dailyLanguage
  }
`;

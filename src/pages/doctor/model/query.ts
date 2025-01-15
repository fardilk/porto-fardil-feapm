import { PaginationInfoQuery } from 'src/@types/query';

export const PractitionerSlotQuery = `
  slotId
  slotTime
  isDisabled
`;

export const DoctorDocumentQuery = `
  documentType
  documentNo
`;

export const DoctorEducationQuery = `
  education
`;

export const DoctorExperienceQuery = `
  experiencePlace
  experienceJobDesk
  experienceTime
  experienceLength
`;

export const DoctorPublicationQuery = `
  publicationTitle
  publicationPlace
`;

export const DoctorProfileQuery = `
  doctorDocument { ${DoctorDocumentQuery} }
  doctorEducation { ${DoctorEducationQuery} }
  doctorExperience { ${DoctorExperienceQuery} }
  doctorPublication { ${DoctorPublicationQuery} }
`;

export const DoctorQuery = `
  doctorID
  doctorName
  doctorImage
  departmentID
  departmentName
  scheduleID
  scheduleStart
  scheduleEnd
  patientQueued
  patientCapacity
  gender
  experienceYears
  slot { ${PractitionerSlotQuery} }
  doctorProfile { ${DoctorProfileQuery} }
`;

export const DoctorResultListQuery = `
  status
  message
  pagination { ${PaginationInfoQuery} }
  data { ${DoctorQuery} }
`;

export const DoctorResultOneQuery = `
  status
  message
  data { ${DoctorQuery} }
`;

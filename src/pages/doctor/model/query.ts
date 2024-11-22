import { PaginationInfoQuery } from 'src/@types/query';

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
  data ${DoctorQuery}
`;

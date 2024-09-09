import { PaginationInfoQuery } from 'src/@types/query';

export const DepartmentQuery = `
  departmentID
  departmentName
  icon
`;

export const DepartmentResultListQuery = `
  status
  message
  pagination { ${PaginationInfoQuery} }
  data { ${DepartmentQuery} }
`;

import { PaginationInfoType, PaginationType } from 'src/@types/global';

export type Department = {
  departmentID: string;
  departmentName: string;
  icon: string;
};

export type DepartmentResultList = PaginationType & {
  status: boolean;
  message: string;
  pagination: PaginationInfoType;
  data: Department[];
};

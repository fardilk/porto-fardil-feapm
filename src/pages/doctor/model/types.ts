import { NonPaginationType, PaginationInfoType, PaginationType } from 'src/@types/global';

export type Doctor = {
  doctorID: string;
  doctorName: string;
  doctorImage: string;
  departmentID: string;
  departmentName: string;
  scheduleID: string;
  scheduleStart: string;
  scheduleEnd: string;
  patientQueued: number;
  patientCapacity: number;
  gender: string;
  slot: PractitionerSlot[];
};

export type PractitionerSlot = {
  slotId: string;
  slotTime: string;
  isDisabled: boolean;
};

export type DoctorResultList = PaginationType & {
  status: boolean;
  message: string;
  pagination: PaginationInfoType;
  data: Doctor[];
};

export type DoctorResultOne = NonPaginationType & {
  status: boolean;
  message: string;
  data: Doctor;
};

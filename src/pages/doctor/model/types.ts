import { NonPaginationType, PaginationInfoType, PaginationType } from 'src/@types/global';

export type DoctorProfile = {
  doctorDocument: DoctorDocument[];
  doctorEducation: DoctorEducation[];
  doctorExperience: DoctorExperience[];
  doctorPublication: DoctorPublication[];
};

export type DoctorDocument = {
  documentType: string;
  documentNo: string;
};

export type DoctorEducation = {
  education: string;
};

export type DoctorExperience = {
  experiencePlace: string;
  experienceJobDesk: string;
  experienceTime: string;
  experienceLength: string;
};

export type DoctorPublication = {
  publicationTitle: string;
  publicationPlace: string;
};

export type Doctor = {
  doctorID: string;
  doctorName: string;
  doctorImage: string;
  departmentID: string;
  departmentName: string;
  experienceYears?: string;
  scheduleID: string;
  scheduleStart: string;
  scheduleEnd: string;
  patientQueued: number;
  patientCapacity: number;
  gender: string;
  practitionerHealthcareServiceID: string;
  slot: PractitionerSlot[];
  doctorProfile: DoctorProfile;
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

export type DoctorSlotInfo = {
  isSlotFull: boolean;
  slotFilled: number;
  slotCapacity: number;
};

export type DoctorSlotInfoResultOne = {
  status: boolean;
  message: string;
  data: DoctorSlotInfo;
};

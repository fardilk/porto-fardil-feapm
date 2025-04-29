import { gql } from 'graphql-request';
import GqlClient from 'src/utils/gql';
import { DoctorResultListQuery, DoctorResultOneQuery, DoctorSlotInfoResultOneQuery } from './query';
import { DoctorResultList, DoctorResultOne, DoctorSlotInfoResultOne } from './types';

export const doctorList = async (param: {
  keyword: string;
  isBpjs?: boolean;
  date?: string;
  page: number;
  take: number;
}): Promise<DoctorResultList> => {
  const client = new GqlClient({ module: 'doctor' });
  const res = await client.request(
    gql`
    query doctorList($keyword: String!, $page: Int!, $take: Int!, $isBpjs: Boolean, $date: String) {
      doctorList(keyword: $keyword, page: $page, take: $take, isBpjs: $isBpjs, date: $date) {
        ${DoctorResultListQuery}
      }
    }
  `,
    param
  );

  return res.doctorList;
};

export const doctorSlotInfoOne = async (param: {
  practitionerHealthcareServiceID: string;
  isBpjs?: boolean;
  date?: string;
}): Promise<DoctorSlotInfoResultOne> => {
  const client = new GqlClient({ module: 'doctor' });
  const res = await client.request(
    gql`
    query doctorSlotInfoOne(
      $practitionerHealthcareServiceID: String!, $isBpjs: Boolean, $date: String
    ) {
      doctorSlotInfoOne(practitionerHealthcareServiceID: $practitionerHealthcareServiceID,  isBpjs: $isBpjs, date: $date) {
        ${DoctorSlotInfoResultOneQuery}
      }
    }
  `,
    param
  );

  return res.doctorSlotInfoOne;
};

export const doctorOne = async (param: {
  practitionerHealthcareServiceID: string;
  date?: string;
  isBpjs?: boolean;
}): Promise<DoctorResultOne> => {
  const client = new GqlClient({ module: 'doctor' });
  const res = await client.request(
    gql`
    query doctorOne($practitionerHealthcareServiceID: String!, $date: String, $isBpjs: Boolean) {
      doctorOne(practitionerHealthcareServiceID: $practitionerHealthcareServiceID, date: $date, isBpjs: $isBpjs) {
        ${DoctorResultOneQuery}
      }
    }
  `,
    param
  );

  return res.doctorOne;
};

export const doctorAvailable = async (param: {
  departmentID: string;
  isBpjs?: boolean;
  date?: string;
}): Promise<DoctorResultOne> => {
  const client = new GqlClient({ module: 'doctor' });
  const res = await client.request(
    gql`
    query doctorAvailable($departmentID: String!, $isBpjs: Boolean, $date: String) {
      doctorAvailable(departmentID: $departmentID, isBpjs: $isBpjs, date: $date) {
        ${DoctorResultOneQuery}
      }
    }
  `,
    param
  );

  return res.doctorAvailable;
};

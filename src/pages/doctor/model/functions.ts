import { gql } from 'graphql-request';
import GqlClient from 'src/utils/gql';
import { DoctorResultList, DoctorResultOne } from './types';
import { DoctorResultListQuery, DoctorResultOneQuery } from './query';

export const doctorList = async (param: {
  keyword: string;
  page: number;
  take: number;
}): Promise<DoctorResultList> => {
  const client = new GqlClient({ module: 'doctor' });
  const res = await client.request(
    gql`
    query doctorList($keyword: String!, $page: Int!, $take: Int!) {
      doctorList(keyword: $keyword, page: $page, take: $take) {
        ${DoctorResultListQuery}
      }
    }
  `,
    param
  );

  return res.doctorList;
};

export const doctorOne = async (param: {
  departmentID: string;
  doctorID: string;
}): Promise<DoctorResultOne> => {
  const client = new GqlClient({ module: 'doctor' });
  const res = await client.request(
    gql`
    query doctorOne($doctorID: String!, $departmentID: Int!) {
      doctorOne(doctorID: $doctorID, departmentID: $departmentID) {
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
}): Promise<DoctorResultOne> => {
  const client = new GqlClient({ module: 'doctor' });
  const res = await client.request(
    gql`
    query doctorAvailable($departmentID: Int!) {
      doctorAvailable(departmentID: $departmentID) {
        ${DoctorResultOneQuery}
      }
    }
  `,
    param
  );

  return res.doctorAvailable;
};

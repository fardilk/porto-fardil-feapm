import { gql } from 'graphql-request';
import GqlClient from 'src/utils/gql';
import {
  AvailableDoctorResponse,
  GetPatientByNIKResponse,
  ListDoctorResponse,
  ListLabPackageResponse,
  ListMCUPackageResponse,
  ListPolyResponse,
} from './types';

export const getPatientByNIK = async ({
  NIK,
}: {
  NIK: string;
}): Promise<GetPatientByNIKResponse> => {
  const req = new GqlClient({
    endpoint: '/v1/patient/query',
  });

  const res = await req.request(
    gql`
      query patientGet($identifierType: String!, $identifier: String!) {
        patientGet(identifierType: $identifierType, identifier: $identifier) {
          patientID
          nik
          passportNumber
          birthPlace
          birthDttm
          address
          email
          name
          phone
          gender
          additional {
            bloodType
            bloodRhesus
          }
        }
      }
    `,
    {
      identifierType: 'NIK',
      identifier: NIK,
    }
  );

  return res.patientGet;
};

export const getDoctorList = async ({
  page,
  keyword,
}: {
  page: number;
  keyword: string;
}): Promise<ListDoctorResponse> => {
  const req = new GqlClient({
    endpoint: '/v1/doctor/query',
  });

  const res = await req.request(
    gql`
      query GetDoctorList($page: Int!, $totalRecord: Int!, $keyword: String!) {
        doctorList(page: $page, totalRecord: $totalRecord, keyword: $keyword) {
          doctorID
          doctorName
          doctorImage
          departmentID
          departmentName
          scheduleStart
          scheduleEnd
          patientQueued
          patientCapacity
        }
      }
    `,
    {
      page,
      keyword,
      totalRecord: 6,
    }
  );

  return res.doctorList;
};

export const getMCUPackage = async ({
  page,
  keyword,
}: {
  page: number;
  keyword: string;
}): Promise<ListMCUPackageResponse> => {
  const req = new GqlClient({
    endpoint: '/v1/healthcare-service/query',
  });

  const res = await req.request(
    gql`
      query mcuPackageList($page: Int!, $totalRecord: Int!, $keyword: String!) {
        mcuPackageList(page: $page, totalRecord: $totalRecord, keyword: $keyword) {
          packageID
          packageName
          price
          contents
        }
      }
    `,
    {
      page,
      keyword,
      totalRecord: 6,
    }
  );

  return res.mcuPackageList;
};

export const getPolyList = async ({
  page,
  keyword,
}: {
  page: number;
  keyword: string;
}): Promise<ListPolyResponse> => {
  const req = new GqlClient({
    endpoint: '/v1/department/query',
  });

  const res = await req.request(
    gql`
      query departmentList($page: Int!, $display: Int!, $keywords: String!) {
        departmentList(page: $page, display: $display, keywords: $keywords) {
          departmentID
          departmentName
        }
      }
    `,
    {
      page,
      keywords: keyword,
      display: 9,
    }
  );

  return res.departmentList;
};

export const getAvailableDoctor = async ({
  polyID,
}: {
  polyID: string;
}): Promise<AvailableDoctorResponse> => {
  const req = new GqlClient({
    endpoint: '/v1/doctor/query',
  });

  const res = await req.request(
    gql`
      query doctorAvailable($departmentID: String!) {
        doctorAvailable(departmentID: $departmentID) {
          doctorID
          doctorImage
          doctorName
          departmentName
          scheduleStart
          scheduleEnd
        }
      }
    `,
    {
      departmentID: polyID,
    }
  );

  return res.doctorAvailable;
};

export const createBooking = async ({
  serviceType,
  doctorId,
  payplanClass,
  polyId,
  packageMCUId,
  packageLabId,
  patientId,
}: {
  serviceType: 'OUTPATIENT' | 'MCU' | 'LABORATORY' | 'RADIOLOGY';
  payplanClass: 'GENERAL' | 'BPJS' | 'INSURANCE' | 'COMPANY';
  doctorId?: string;
  polyId?: string;
  packageMCUId?: string;
  packageLabId?: string;
  patientId: string;
}): Promise<AvailableDoctorResponse> => {
  const req = new GqlClient({
    endpoint: '/v1/appointment/query',
  });

  const res = await req.request(
    gql`
      mutation bookingCreate($data: BookingInput!) {
        bookingCreate(data: $data) {
          bookingID
        }
      }
    `,
    {
      data: {
        serviceType,
        ...(doctorId && polyId
          ? {
              serviceParamOutpatient: {
                doctorID: doctorId,
                departmentID: polyId,
              },
            }
          : {}),
        ...(packageMCUId
          ? {
              serviceParamMcu: {
                packageID: packageMCUId,
              },
            }
          : {}),
        ...(packageLabId
          ? {
              serviceParamLaboratory: {
                packageID: packageLabId,
              },
            }
          : {}),
        payorParam: {
          payplanClass,
        },
      },
    }
  );

  return res.doctorAvailable;
};

export const getLabPackage = async ({
  page,
  keyword,
}: {
  page: number;
  keyword: string;
}): Promise<ListLabPackageResponse> => {
  const req = new GqlClient({
    endpoint: '/v1/healthcare-service/query',
  });

  const res = await req.request(
    gql`
      query labPackageList($page: Int!, $totalRecord: Int!, $keyword: String!) {
        labPackageList(page: $page, totalRecord: $totalRecord, keyword: $keyword) {
          packageID
          packageName
          price
        }
      }
    `,
    { page, keyword, totalRecord: 9 }
  );

  return res.labPackageList;
};

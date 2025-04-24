import { gql } from 'graphql-request';
import GqlClient from 'src/utils/gql';
import type {
  AvailableDoctorResponse,
  ListDoctorResponse,
  ListLabPackageResponse,
  ListMCUPackageResponse,
  ListPolyResponse,
  ListRadiologyPackageResponse,
} from './types';

export const getDoctorList = async ({
  page,
  keyword,
}: {
  page: number;
  keyword: string;
}): Promise<ListDoctorResponse> => {
  const req = new GqlClient({
    module: 'doctor',
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
    module: 'healthcare-service',
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
    module: 'department',
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

export const createBooking = async ({
  serviceType,
  doctorId,
  payplanClass,
  polyId,
  packageMCUId,
  packageLabId,
  packageRadiologyId,
  patientId,
}: {
  serviceType: 'OUTPATIENT' | 'MCU' | 'LABORATORY' | 'RADIOLOGY';
  payplanClass: 'GENERAL' | 'BPJS' | 'INSURANCE' | 'COMPANY';
  doctorId?: string;
  polyId?: string;
  packageMCUId?: string;
  packageLabId?: string;
  packageRadiologyId?: string;
  patientId: string;
}): Promise<AvailableDoctorResponse> => {
  const req = new GqlClient({
    module: 'appointment',
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
        ...(packageRadiologyId
          ? {
              serviceParamRadiology: {
                packageID: packageRadiologyId,
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
    module: 'healthcare-service',
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

export const getRadiologyPackage = async ({
  page,
  keyword,
}: {
  page: number;
  keyword: string;
}): Promise<ListRadiologyPackageResponse> => {
  const req = new GqlClient({
    module: 'healthcare-service',
  });

  const res = await req.request(
    gql`
      query radiologyPackageList($page: Int!, $totalRecord: Int!, $keyword: String!) {
        radiologyPackageList(page: $page, totalRecord: $totalRecord, keyword: $keyword) {
          packageID
          packageName
          price
        }
      }
    `,
    { page, keyword, totalRecord: 9 }
  );

  return res.radiologyPackageList;
};

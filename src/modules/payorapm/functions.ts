import { gql } from 'graphql-request';
import GqlClient from 'src/utils/gql';
import {
  CompanyListAllResponseQuery,
  CompanyListResponseQuery,
  CreatePatientCoverageAPMResultQuery,
  InsuranceListAllResponseQuery,
  InsuranceListResponseQuery,
  PayplanResultDropdownQuery,
} from './query';
import {
  CompanyListAllResponse,
  CompanyListResponse,
  CreatePatientCoverageAPMResult,
  InsuranceListAllResponse,
  InsuranceListResponse,
  PatientCoverageInput,
  PayplanResultDropdown,
} from './types';

export const insuranceList = async (param: {
  patientID: string;
  page: number;
  display: number;
  keywords: string;
}): Promise<InsuranceListResponse> => {
  const client = new GqlClient({ module: 'payor' });

  const response = await client.request(
    gql`
      query insuranceList($patientID: ID!, $page: Int!, $display: Int!, $keywords: String!) {
        insuranceList(
          patientID: $patientID
          page: $page
          display: $display
          keywords: $keywords
        ) {
          ${InsuranceListResponseQuery}
        }
      }
    `,
    param
  );

  return response.insuranceList;
};

export const insuranceListAll = async (param: {
  page: number;
  display: number;
  keywords: string;
}): Promise<InsuranceListAllResponse> => {
  const client = new GqlClient({ module: 'payor' });

  const response = await client.request(
    gql`
      query insuranceListAll($page: Int!, $display: Int!, $keywords: String!) {
        insuranceListAll(
          page: $page
          display: $display
          keywords: $keywords
        ) {
          ${InsuranceListAllResponseQuery}
        }
      }
    `,
    param
  );

  return response.insuranceListAll;
};

export const companyList = async (param: {
  patientID: string;
  page: number;
  display: number;
  keywords: string;
}): Promise<CompanyListResponse> => {
  const client = new GqlClient({ module: 'payor' });

  const response = await client.request(
    gql`
      query companyList($patientID: ID!, $page: Int!, $display: Int!, $keywords: String!) {
        companyList(
          patientID: $patientID
          page: $page
          display: $display
          keywords: $keywords
        ) {
          ${CompanyListResponseQuery}
        }
      }
    `,
    param
  );

  return response.companyList;
};

export const companyListAll = async (param: {
  page: number;
  display: number;
  keywords: string;
}): Promise<CompanyListAllResponse> => {
  const client = new GqlClient({ module: 'payor' });

  const response = await client.request(
    gql`
      query companyListAll($page: Int!, $display: Int!, $keywords: String!) {
        companyListAll(
          page: $page
          display: $display
          keywords: $keywords
        ) {
          ${CompanyListAllResponseQuery}
        }
      }
    `,
    param
  );

  return response.companyListAll;
};

export const payplanDropdown = async (param: {
  payorID: string;
}): Promise<PayplanResultDropdown> => {
  const client = new GqlClient({ module: 'payor' });

  const response = await client.request(
    gql`
      query payplanDropdown($payorID: ID!) {
        payplanDropdown(
          payorID: $payorID
        ) {
          ${PayplanResultDropdownQuery}
        }
      }
    `,
    param
  );

  return response.payplanDropdown;
};

export const createPatientCoverageAPM = async (param: {
  data: PatientCoverageInput;
}): Promise<CreatePatientCoverageAPMResult> => {
  const client = new GqlClient({ module: 'payor' });

  const response = await client.request(
    gql`
      mutation createPatientCoverageAPM($data: PatientCoverageInput!) {
        createPatientCoverageAPM(
          data: $data
        ) {
          ${CreatePatientCoverageAPMResultQuery}
        }
      }
    `,
    param
  );

  return response.createPatientCoverageAPM;
};

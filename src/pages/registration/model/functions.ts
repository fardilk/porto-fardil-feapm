import { gql } from 'graphql-request';
import GqlClient from 'src/utils/gql';
import { PatientQuery } from './query';
import type { PatientCreateInput, PatientOne, RegisterResponse } from './types';

const req = new GqlClient({
  module: 'patient',
});

export const patientCreate = async (param: {
  data: PatientCreateInput;
}): Promise<RegisterResponse> => {
  const res = await req.request(
    gql`
      mutation patientCreate($data: PatientCreateInput!) {
        patientCreate(data: $data) {
          status
          message
          data {
            patientID
            identifierTypeCode
            identifierValue
            medrec
            name
            gender
            religion
            birthPlace
            birthDttm
            maritalStatus
            phone
            email
            nationality
            address
            additional {
              bloodType
              bloodRhesus
              education
              occupation
              dailyLanguage
            }
          }
        }
      }
    `,
    param
  );
  return res.patientCreate;
};

export const patientGet = async (param: {
  identifierType: string;
  identifier: string;
}): Promise<PatientOne> => {
  const client = new GqlClient({ module: 'patient' });
  const request = await client.request(
    gql`
    query patientGet($identifierType: String!, $identifier: String!) {
      patientGet(identifierType: $identifierType, identifier: $identifier) {
        status
        message
        data { ${PatientQuery} }
      }
    }
  `,
    param
  );

  return request.patientGet;
};

export const patientUpdate = async (param: {
  patientID: string;
  data: {
    phone: string;
    email: string;
  };
}): Promise<PatientOne> => {
  const client = new GqlClient({ module: 'patient' });
  const request = await client.request(
    gql`
    mutation patientUpdate($patientID: ID!, $data: PatientUpdateInput!) {
      patientUpdate(
        patientID: $patientID
        data: $data
      ) {
        status
        message
        data { ${PatientQuery} }
      }
    }
  `,
    param
  );

  return request.patientUpdate;
};

import { gql } from 'graphql-request';
import GqlClient from 'src/utils/gql';
import { additionalType, RegisterResponse } from './types';

const req = new GqlClient({
  endpoint: '/v1/patient/query',
});

type Params = {
  data: {
    nik: string;
    passportNumber: string;
    name: string;
    gender: string;
    birthPlace: string;
    birthDttm: string;
    phone: string;
    email: string;
    nationality: string;
    address: string;
    additional: additionalType;
  }
};

export const postPatient = async ({
  data
}: Params): Promise<RegisterResponse> => {
  const res = await req.request(
    gql`
      mutation patientCreate($data: PatientCreateInput!) {
        patientCreate(data: $data) {
          patientID
          nik
          passportNumber
          medrec
          name
          gender
          birthPlace
          birthDttm
          phone
          email
          nationality
          address
          additional {
              bloodType
              bloodRhesus
              religion
              education
              maritalStatus
              occupation
              dailyLanguage
          }
        }
      }
    `,
    {
      data
    }
  );
  return res.patientCreate;
};

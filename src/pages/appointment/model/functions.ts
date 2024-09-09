import GqlClient from 'src/utils/gql';
import { Booking, BookingInput } from './types';
import { gql } from 'graphql-request';
import { BookingQuery } from './query';

export const bookingCreate = async (param: {
  patientID: string;
  data: BookingInput;
}): Promise<Booking> => {
  const client = new GqlClient({ module: 'department' });
  const res = await client.request(
    gql`
    mutation bookingCreate($patientID: ID!, $data: BookingInput!) {
      bookingCreate(
        patientID: $patientID
        data: $data
      ) {
        ${BookingQuery}
      }
    }
  `,
    param
  );

  return res.bookingCreate;
};

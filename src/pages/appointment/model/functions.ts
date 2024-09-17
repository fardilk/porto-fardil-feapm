import { gql } from 'graphql-request';
import GqlClient from 'src/utils/gql';
import { BookingQuery } from './query';
import { Booking, BookingInput } from './types';

export const bookingCreate = async (param: {
  data: BookingInput;
  patientID: string;
}): Promise<Booking> => {
  const client = new GqlClient({ module: 'appointment' });
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
    {
      patientID: param.patientID,
      data: param.data,
    }
  );

  return res.bookingCreate;
};

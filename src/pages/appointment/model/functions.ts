import { gql } from 'graphql-request';
import GqlClient from 'src/utils/gql';
import {
  AppointmentCreateResultOneQuery,
  BookingCreateResultOneQuery,
  PrintBarcodeResultMutationQuery,
} from './query';
import {
  AppointmentCreateResultOne,
  AppointmentInput,
  BookingCreateResultOne,
  BookingInput,
  PrintBarcodeResultMutation,
} from './types';

export const bookingCreate = async (param: {
  data: BookingInput;
  patientID: string;
}): Promise<BookingCreateResultOne> => {
  const client = new GqlClient({ module: 'appointment' });
  const res = await client.request(
    gql`
    mutation bookingCreate($patientID: ID!, $data: BookingInput!) {
      bookingCreate(
        patientID: $patientID
        data: $data
      ) {
        ${BookingCreateResultOneQuery}
      }
    }
  `,
    param
  );

  return res.bookingCreate;
};

export const bookingCreateNoQuery = async (param: {
  data: BookingInput;
  patientID: string;
}): Promise<BookingCreateResultOne> => {
  const client = new GqlClient({ module: 'appointment' });
  const res = await client.request(
    gql`
      mutation bookingCreate($patientID: ID!, $data: BookingInput!) {
        bookingCreate(patientID: $patientID, data: $data) {
          status
          message
          data {
            bookingID
          }
        }
      }
    `,
    param
  );

  return res.bookingCreate;
};

export const appointmentCreate = async (param: {
  patientID: string;
  data: AppointmentInput;
}): Promise<AppointmentCreateResultOne> => {
  const client = new GqlClient({ module: 'appointment' });
  const res = await client.request(
    gql`
      mutation appointmentCreate($patientID: ID!, $data: AppointmentInput!) {
        appointmentCreate(patientID: $patientID, data: $data) {
          ${AppointmentCreateResultOneQuery}
        }
      }
    `,
    param
  );

  return res.appointmentCreate;
};

export const printBarcode = async (param: {
  encounterID: string;
  dataType: string;
}): Promise<PrintBarcodeResultMutation> => {
  const client = new GqlClient({ module: 'appointment' });
  const res = await client.request(
    gql`
      mutation printBarcode(
        $encounterID: ID!
        $dataType: String!
      ) {
        printBarcode(
          encounterID: $encounterID
          dataType: $dataType
        ) {
          ${PrintBarcodeResultMutationQuery}
        }
      }
    `,
    param
  );

  return res.printBarcode;
};

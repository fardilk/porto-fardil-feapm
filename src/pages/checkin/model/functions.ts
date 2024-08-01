import { gql } from 'graphql-request';
import GqlClient from 'src/utils/gql';
import { CheckinResponse } from './types';

const req = new GqlClient({
  endpoint: '/v1/appointment/query',
});

export const getCheckin = async ({ bookingNumber }: { bookingNumber: string }) : Promise<CheckinResponse> => {
  const res = await req.request(
    gql`
      query appointmentGet($bookingNumber: String!) {
        appointmentGet(bookingNumber: $bookingNumber) {
          booking {
            bookingID
            payplanClass
            notes
            patient {
              nik
              name
              birthDttm
              birthPlace
              phone
              email
              address
              gender
              bloodType
              bloodRhesus
            }
            encounter {
              healthcareServiceName,
              practitionerName,
              scheduleSlotDate,
              scheduleSlotStartTime,
            }
            bpjs {
              referralNumber
              referralDate
              performerServiceName
              subscriberInstitution
              subscriberNumber
              subscriberCategory
              subscriberStatus
              subscriberClass
            }
          }
        }
      }
    `,
    { bookingNumber }
  );

  return res.appointmentGet;
};

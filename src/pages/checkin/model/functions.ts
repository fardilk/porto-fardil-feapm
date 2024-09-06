import { gql } from 'graphql-request';
import GqlClient from 'src/utils/gql';
import { BookingType } from './types';

const req = new GqlClient({
  endpoint: '/v1/appointment/query',
});

export const getCheckin = async ({
  bookingNumber,
}: {
  bookingNumber: string;
}): Promise<BookingType> => {
  const res = await req.request(
    gql`
      query bookingGet($bookingNumber: String!) {
        bookingGet(bookingNumber: $bookingNumber) {
          bookingID
          bookingNumber
          notes
          encounter {
            healthcareServiceName
            practitionerName
            scheduleSlotDate
            package {
              packageID
              packageName
            }
          }
          patient {
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
          bpjs {
            subscriberNumber
            subscriberClass
            subscriberCategory
            subscriberInstitution
            subscriberStatus
            referralNumber
            referralDate
            performerServiceName
          }
        }
      }
    `,
    { bookingNumber }
  );

  return res.bookingGet;
};

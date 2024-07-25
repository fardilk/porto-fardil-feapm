/* eslint-disable */

import { gql } from 'graphql-request';
import gqlClient from 'src/utils/gql';

const UserQuery = `
  userName
  startPage
  status
`;

type UserType = {
  userName: string;
  startPage: string;
  status: string;
};

export const getUser = async ({ userID }: { userID: string }): Promise<UserType[] | undefined> => {
  const be = new gqlClient();

  const res = await be.request(
    gql`
      query ($userID: ID) {
        userGet(userID: $userID) {
          ${UserQuery}
        }
      }
    `,
    { userID }
  );

  return res.userGet;
};

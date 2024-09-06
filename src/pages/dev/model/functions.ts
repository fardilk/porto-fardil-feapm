/* eslint-disable */

import { gql } from 'graphql-request';
import GqlClient from 'src/utils/gql';
import { UserType } from './types';
import { UserQuery } from './query';

export const getUser = async ({ userID }: { userID: string }): Promise<UserType[] | undefined> => {
  const be = new GqlClient();

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

import { gql } from 'graphql-request';
import GqlClient from 'src/utils/gql';
import { DepartmentResultListQuery } from './query';
import { DepartmentResultList } from './types';

export const departmentList = async (param: {
  keyword: string;
  page: number;
  take: number;
}): Promise<DepartmentResultList> => {
  const client = new GqlClient({ module: 'department' });
  const res = await client.request(
    gql`
    query departmentList($keyword: String!,  $page: Int!, $take: Int!) {
      departmentList(
        keyword:$keyword
        page:$page
        take:$take
      ) {
        ${DepartmentResultListQuery}
      }
    }
  `,
    param
  );

  return res.departmentList;
};

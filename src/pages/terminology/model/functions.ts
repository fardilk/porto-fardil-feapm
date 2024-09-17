import gqlClient from 'src/utils/gql';
import {
  TerminologyInput,
  TerminologyResultList,
  TerminologyResultOne,
  ValueSetInput,
  ValueSetResultList,
  ValueSetResultOne,
} from './types';
import {
  TerminologyResultListQuery,
  TerminologyResultOneQuery,
  ValueSetResultListQuery,
  ValueSetResultOneQuery,
} from './query';
import { gql } from 'graphql-request';

export const terminologyGet = async (params: {
  attributePath: string;
  codeSystem: string;
  keywords?: string;
  limit?: number;
  valueSet?: string;
}): Promise<TerminologyResultList> => {
  const client = new gqlClient({ module: 'terminology' });
  const response = await client.request(
    gql`
      query terminologyGet(
        $attributePath: String!
        $codeSystem: String!
        $keywords: String
        $limit: Int
        $valueSet: String
      ) {
        terminologyGet(
          attributePath: $attributePath
          codeSystem: $codeSystem
          keywords: $keywords
          limit: $limit
          valueSet: $valueSet
        ) {
          ${TerminologyResultListQuery}
        }
      }
    `,
    params
  );

  return response.terminologyGet;
};

export const terminologySearch = async (params: {
  keywords: string;
  attributePath: string;
  codeSystem: string;
  limit: number;
}): Promise<TerminologyResultList> => {
  const client = new gqlClient({ module: 'terminology' });
  const response = await client.request(
    gql`
      query terminologySearch(
        $keywords: String!
        $attributePath: String!
        $codeSystem: String!
        $limit: Int!
      ) {
        terminologySearch(
          keywords: $keywords
          attributePath: $attributePath
          codeSystem: $codeSystem
          limit: $limit
        ) {
          ${TerminologyResultListQuery}
        }
      }
    `,
    params
  );

  return response.terminologySearch;
};

export const terminologyLookup = async (params: {
  code: string;
  attributePath: string;
  codeSystem: string;
}): Promise<TerminologyResultList> => {
  const client = new gqlClient({ module: 'terminology' });
  const response = await client.request(
    gql`
      query terminologyLookup(
        $code: String!
        $attributePath: String!
        $codeSystem: String!
      ) {
        terminologyLookup(
          code: $code
          attributePath: $attributePath
          codeSystem: $codeSystem
        ) {
          ${TerminologyResultListQuery}
        }
      }
    `,
    params
  );

  return response.terminologyLookup;
};

export const terminologyList = async (params: {
  page: number;
  limit?: number;
  keywords?: string;
}): Promise<TerminologyResultList> => {
  const client = new gqlClient({ module: 'terminology' });
  const response = await client.request(
    gql`
      query terminologyList(
        $page: Int!
        $limit: Int
        $keywords: String
      ) {
        terminologyList(
          page: $page
          limit: $limit
          keywords: $keywords
        ) {
          ${TerminologyResultListQuery}
        }
      }
    `,
    params
  );

  return response.terminologyList;
};

export const terminologyDetail = async (params: {
  resourceType: string;
  attributePath: string;
  code: string;
  parentCode: string;
  codeSystem: string;
}): Promise<TerminologyResultOne> => {
  const client = new gqlClient({ module: 'terminology' });
  const response = await client.request(
    gql`
      query terminologyDetail(
        $resourceType: String!
        $attributePath: String!
        $code: String!
        $parentCode: String!
        $codeSystem: String!
      ) {
        terminologyDetail(
          resourceType: $resourceType
          attributePath: $attributePath
          code: $code
          parentCode: $parentCode
          codeSystem: $codeSystem
        ) {
          ${TerminologyResultOneQuery}
        }
      }
    `,
    params
  );

  return response.terminologyDetail;
};

export const valueSetList = async (params: {
  page: number;
  limit?: number;
  keywords?: string;
}): Promise<ValueSetResultList> => {
  const client = new gqlClient({ module: 'terminology' });
  const response = await client.request(
    gql`
      query valueSetList(
        $page: Int!
        $limit: Int
        $keywords: String
      ) {
        valueSetList(
          page: $page
          limit: $limit
          keywords: $keywords
        ) {
          ${ValueSetResultListQuery}
        }
      }
    `,
    params
  );

  return response.valueSetList;
};

export const valueSetDetail = async (params: {
  resourceType: string;
  code: string;
  codeSystem: string;
}): Promise<ValueSetResultOne> => {
  const client = new gqlClient({ module: 'terminology' });
  const response = await client.request(
    gql`
      query valueSetDetail(
        $resourceType: String!
        $code: String!
        $codeSystem: String!
      ) {
        valueSetDetail(
          resourceType: $resourceType
          code: $code
          codeSystem: $codeSystem
        ) {
          ${ValueSetResultOneQuery}
        }
      }
    `,
    params
  );

  return response.valueSetDetail;
};

export const terminologyCreate = async (params: {
  resourceType: string;
  attributePath: string;
  code: string;
  parentCode: string;
  codeSystem: string;
  data: TerminologyInput;
}): Promise<TerminologyResultOne> => {
  const client = new gqlClient({ module: 'terminology' });
  const response = await client.request(
    gql`
      mutation terminologyCreate(
        $resourceType: String!
        $attributePath: String!
        $code: String!
        $parentCode: String!
        $codeSystem: String!
        $data: TerminologyInput!
      ) {
        terminologyCreate(
          resourceType: $resourceType
          attributePath: $attributePath
          code: $code
          parentCode: $parentCode
          codeSystem: $codeSystem
          data: $data
        ) {
          ${TerminologyResultOneQuery}
        }
      }
    `,
    params
  );

  return response.terminologyCreate;
};

export const terminologyUpdate = async (params: {
  resourceType: string;
  attributePath: string;
  code: string;
  parentCode: string;
  codeSystem: string;
  data: TerminologyInput;
}): Promise<TerminologyResultOne> => {
  const client = new gqlClient({ module: 'terminology' });
  const response = await client.request(
    gql`
      mutation terminologyUpdate(
        $resourceType: String!
        $attributePath: String!
        $code: String!
        $parentCode: String!
        $codeSystem: String!
        $data: TerminologyInput!
      ) {
        terminologyUpdate(
          resourceType: $resourceType
          attributePath: $attributePath
          code: $code
          parentCode: $parentCode
          codeSystem: $codeSystem
          data: $data
        ) {
          ${TerminologyResultOneQuery}
        }
      }
    `,
    params
  );

  return response.terminologyUpdate;
};

export const terminologyDelete = async (params: {
  resourceType: string;
  attributePath: string;
  code: string;
  parentCode: string;
  codeSystem: string;
}): Promise<TerminologyResultOne> => {
  const client = new gqlClient({ module: 'terminology' });
  const response = await client.request(
    gql`
      mutation terminologyDelete(
        $resourceType: String!
        $attributePath: String!
        $code: String!
        $parentCode: String!
        $codeSystem: String!
      ) {
        terminologyDelete(
          resourceType: $resourceType
          attributePath: $attributePath
          code: $code
          parentCode: $parentCode
          codeSystem: $codeSystem
        ) {
          ${TerminologyResultOneQuery}
        }
      }
    `,
    params
  );

  return response.terminologyDelete;
};

export const valueSetCreate = async (params: {
  name: string;
  code: string;
  codeSystem: string;
  data: ValueSetInput;
}): Promise<ValueSetResultOne> => {
  const client = new gqlClient({ module: 'terminology' });
  const response = await client.request(
    gql`
      mutation valueSetCreate(
        $name: String!
        $code: String!
        $codeSystem: String!
        $data: ValueSetInput!
      ) {
        valueSetCreate(
          name: $name
          code: $code
          codeSystem: $codeSystem
          data: $data
        ) {
          ${ValueSetResultOneQuery}
        }
      }
    `,
    params
  );

  return response.valueSetCreate;
};

export const valueSetUpdate = async (params: {
  name: string;
  code: string;
  codeSystem: string;
  data: ValueSetInput;
}): Promise<ValueSetResultOne> => {
  const client = new gqlClient({ module: 'terminology' });
  const response = await client.request(
    gql`
      mutation valueSetUpdate(
        $name: String!
        $code: String!
        $codeSystem: String!
        $data: ValueSetInput!
      ) {
        valueSetUpdate(
          name: $name
          code: $code
          codeSystem: $codeSystem
          data: $data
        ) {
          ${ValueSetResultOneQuery}
        }
      }
    `,
    params
  );

  return response.valueSetUpdate;
};

export const valueSetDelete = async (params: {
  name: string;
  code: string;
  codeSystem: string;
}): Promise<ValueSetResultOne> => {
  const client = new gqlClient({ module: 'terminology' });
  const response = await client.request(
    gql`
      mutation valueSetDelete(
        $name: String!
        $code: String!
        $codeSystem: String!
      ) {
        valueSetDelete(
          name: $name
          code: $code
          codeSystem: $codeSystem
        ) {
          ${ValueSetResultOneQuery}
        }
      }
    `,
    params
  );

  return response.valueSetDelete;
};

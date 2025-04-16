import { gql } from 'graphql-request';
import GqlClient from 'src/utils/gql';

export type regionalsType = {
  regionalCd: string;
  regionalNm: string;
  proCd: string;
  kabCd: string;
  kecCd: string;
  kelCd: string;
  statusCd: string;
  oldNm: string;
  proNm: string;
  kabNm: string;
  kecNm: string;
  kelNm: string;
};

export const getDataWilayah = async (
  inputValue: string,
  regionalCode: string | undefined
): Promise<regionalsType[]> => {
  const be = new GqlClient({ module: 'regional' });

  const res = await be.request(
    gql`
      query ($inputValue: String!, $regionalCode: String) {
        regionalSearch(query: $inputValue, regionalCd: $regionalCode) {
          regionalCd
          regionalNm
          proCd
          kabCd
          kecCd
          kelCd
          statusCd
          oldNm
          proNm
          kabNm
          kecNm
          kelNm
        }
      }
    `,
    { inputValue, regionalCode }
  );

  return res.regionalSearch;
};

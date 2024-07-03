import { timeout } from 'src/utils/timeout';

export const getDummyData = async (): Promise<any> => {
  await timeout(1000);
  return { data: 'medrec_exit' };
};

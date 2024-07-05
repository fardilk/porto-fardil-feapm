import { timeout } from 'src/utils/timeout';

export const getDummyData = async (param: string): Promise<any> => {
  await timeout(1000);
  return { data: param };
};

import { timeout } from 'src/utils/timeout';

export const getDummyData = async (param: string, tout?: number): Promise<any> => {
  await timeout(tout || 1000);
  return { data: param };
};

export const timeout = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

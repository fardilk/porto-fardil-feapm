export type ConfigIForm = {
  checkin: boolean;
  encounter: boolean;
  reservation: boolean;
  registration: boolean;
  simplify: boolean;
  mode: 'fluid' | 'fixed';
  useKeyboard: boolean;
  apmID: string;
};

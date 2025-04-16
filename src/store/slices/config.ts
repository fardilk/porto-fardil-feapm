import { createSlice } from '@reduxjs/toolkit';

export type ConfigType = {
  checkin: boolean;
  encounter: boolean;
  reservation: boolean;
  registration: boolean;
  simplify: boolean;
  mode: 'fluid' | 'fixed';
  useKeyboard: boolean;
  apmID: string;
};

export const initialState: ConfigType = {
  checkin: true,
  encounter: true,
  reservation: true,
  registration: true,
  simplify: false,
  mode: 'fixed',
  useKeyboard: true,
  apmID: '',
};

export const slice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig(state, actions) {
      state.checkin = actions.payload.checkin;
      state.encounter = actions.payload.encounter;
      state.registration = actions.payload.registration;
      state.reservation = actions.payload.reservation;
      state.simplify = actions.payload.simplify;
      state.mode = actions.payload.mode;
      state.useKeyboard = actions.payload.useKeyboard;
      state.apmID = actions.payload.apmID;
    },
  },
});

export const { setConfig } = slice.actions;
export default slice.reducer;

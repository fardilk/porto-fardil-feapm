import { createSlice } from '@reduxjs/toolkit';

export type AppType = {
  loading: boolean;
};

export const initialState: AppType = {
  loading: false,
};

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading(state, actions) {
      state.loading = actions.payload;
    },
  },
});

export const { setLoading } = slice.actions;
export default slice.reducer;

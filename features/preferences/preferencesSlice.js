import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTrack: 'All',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    trackSelected(state, action) {
      state.selectedTrack = action.payload;
    },
  },
});

export const { trackSelected } = preferencesSlice.actions;
export default preferencesSlice.reducer;

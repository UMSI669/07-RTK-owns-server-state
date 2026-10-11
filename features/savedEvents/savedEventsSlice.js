import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [],
};

const savedEventsSlice = createSlice({
  name: 'savedEvents',
  initialState,
  reducers: {
    eventSaved(state, action) {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },
    eventUnsaved(state, action) {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export const { eventSaved, eventUnsaved } = savedEventsSlice.actions;
export default savedEventsSlice.reducer;

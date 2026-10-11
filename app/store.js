import { configureStore } from '@reduxjs/toolkit';
import { eventsApi } from '../services/eventsApi';
import preferencesReducer from '../features/preferences/preferencesSlice';
import savedEventsReducer from '../features/savedEvents/savedEventsSlice';

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    savedEvents: savedEventsReducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(eventsApi.middleware),
});

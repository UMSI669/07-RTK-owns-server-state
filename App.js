import React from 'react';
import { Provider } from 'react-redux';
import EventsScreen from './screens/EventsScreen';
import { store } from './app/store';

export default function App() {
  return (
    <Provider store={store}>
      <EventsScreen />
    </Provider>
  );
}

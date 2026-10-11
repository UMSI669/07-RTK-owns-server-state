export const selectSavedEventIds = (state) => state.savedEvents.ids;
export const selectIsEventSaved = (state, eventId) => state.savedEvents.ids.includes(eventId);

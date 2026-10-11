export function selectEventsForTrack(events, selectedTrack) {
  return selectedTrack === 'All'
    ? events
    : events.filter((event) => event.track === selectedTrack);
}

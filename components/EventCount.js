import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetEventsQuery } from '../services/eventsApi';
import { selectSelectedTrack } from '../features/preferences/preferencesSelectors';
import { selectSavedEventIds } from '../features/savedEvents/savedEventsSelectors';
import { selectEventsForTrack } from '../services/selectors';
import { styles } from '../styles';

export default function EventCount() {
  const query = useGetEventsQuery();
  const selectedTrack = useSelector(selectSelectedTrack);
  const savedEventIds = useSelector(selectSavedEventIds);
  const displayedEvents = useMemo(
    () => selectEventsForTrack(query.data || [], selectedTrack),
    [query.data, selectedTrack]
  );
  const savedCount = savedEventIds.length;

  return (
    <View style={styles.countCard}>
      <View style={styles.countMain}>
        <Text style={styles.sectionEyebrow}>SUBSCRIBER B · SUMMARY</Text>
        <Text style={styles.countTitle}>
          {query.isLoading && !query.data ? 'Loading events…' : `${displayedEvents.length} ${displayedEvents.length === 1 ? 'event' : 'events'} in ${selectedTrack}`}
        </Text>
        <Text style={styles.countSubtitle}>{savedCount} saved by you · count is derived from the client-owned saved IDs</Text>
      </View>
      <View style={styles.countNumberBox}>
        <Text style={styles.countNumber}>{query.isLoading && !query.data ? '—' : displayedEvents.length}</Text>
        <Text style={styles.countNumberLabel}>visible</Text>
      </View>
      <Text style={styles.cacheNote}>
        Both subscribers use <Text style={styles.cacheCode}>getEvents(undefined)</Text> and the same RTK Query cache entry.
        {query.requestId ? ` Request ${query.requestId.slice(0, 8)}…` : ''}
      </Text>
    </View>
  );
}

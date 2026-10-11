import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetEventsQuery } from '../services/eventsApi';
import { selectSelectedTrack } from '../features/preferences/preferencesSelectors';
import EventCard from './EventCard';
import QueryStatus from './QueryStatus';
import { selectEventsForTrack } from '../services/selectors';
import { styles } from '../styles';

export default function EventList() {
  const selectedTrack = useSelector(selectSelectedTrack);
  const query = useGetEventsQuery();
  const displayedEvents = useMemo(
    () => selectEventsForTrack(query.data || [], selectedTrack),
    [query.data, selectedTrack]
  );

  return (
    <View style={styles.listSection}>
      <View style={styles.listHeading}>
        <View>
          <Text style={styles.sectionEyebrow}>SUBSCRIBER A · EVENT LIST</Text>
          <Text style={styles.sectionTitle}>Conference events</Text>
        </View>
        <Text style={styles.resultCount}>{displayedEvents.length} shown</Text>
      </View>
      <QueryStatus
        data={query.data}
        error={query.error}
        isError={query.isError}
        isFetching={query.isFetching}
        isLoading={query.isLoading}
        requestId={query.requestId}
        startedTimeStamp={query.startedTimeStamp}
        fulfilledTimeStamp={query.fulfilledTimeStamp}
        onRefetch={query.refetch}
      />
      {!query.isLoading && !query.error && displayedEvents.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>◇</Text>
          <Text style={styles.emptyTitle}>{query.data?.length ? 'No events in this track' : 'The events collection is empty'}</Text>
          <Text style={styles.emptyCopy}>{query.data?.length ? 'Choose All or another track to view sessions.' : 'The query succeeded and returned no records.'}</Text>
        </View>
      ) : null}
      {displayedEvents.length > 0 ? displayedEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      )) : null}
    </View>
  );
}

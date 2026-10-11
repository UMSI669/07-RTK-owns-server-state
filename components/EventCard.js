import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { eventSaved, eventUnsaved } from '../features/savedEvents/savedEventsSlice';
import { selectIsEventSaved } from '../features/savedEvents/savedEventsSelectors';
import { styles } from '../styles';

export default function EventCard({ event }) {
  const dispatch = useDispatch();
  const isSaved = useSelector((state) => selectIsEventSaved(state, event.id));

  return (
    <View style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <View style={styles.timePill}><Text style={styles.timeText}>{event.time}</Text></View>
        <Text style={styles.trackLabel}>{event.track.toUpperCase()}</Text>
      </View>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.eventDescription}>{event.description}</Text>
      <View style={styles.eventMetaRow}>
        <Text style={styles.eventMeta}>{event.speaker}</Text>
        <Text style={styles.metaDot}>·</Text>
        <Text style={styles.eventMeta}>{event.duration || 'Conference session'}</Text>
      </View>
      <Pressable
        onPress={() => dispatch(isSaved ? eventUnsaved(event.id) : eventSaved(event.id))}
        accessibilityRole="button"
        accessibilityLabel={`${isSaved ? 'Unsave' : 'Save'} ${event.title}`}
        style={[styles.saveButton, isSaved && styles.saveButtonSaved]}
      >
        <Text style={[styles.saveButtonText, isSaved && styles.saveButtonTextSaved]}>
          {isSaved ? '✓  Saved · Remove' : '+  Save event'}
        </Text>
      </Pressable>
    </View>
  );
}

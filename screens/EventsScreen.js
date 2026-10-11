import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import EventCount from '../components/EventCount';
import EventList from '../components/EventList';
import StateOwnershipMap from '../components/StateOwnershipMap';
import { selectSelectedTrack } from '../features/preferences/preferencesSelectors';
import { trackSelected } from '../features/preferences/preferencesSlice';
import { selectSavedEventIds } from '../features/savedEvents/savedEventsSelectors';
import { TRACKS } from '../services/eventsApi';
import { styles } from '../styles';

export default function EventsScreen() {
  const dispatch = useDispatch();
  const selectedTrack = useSelector(selectSelectedTrack);
  const savedCount = useSelector(selectSavedEventIds).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>RTK QUERY · SERVER-STATE OWNERSHIP</Text>
          <Text style={styles.heroTitle}>Conference events</Text>
          <Text style={styles.heroCopy}>
            Redux slices own your preferences and saved IDs. RTK Query owns the fetched conference records and their request lifecycle.
          </Text>
        </View>

        <StateOwnershipMap />
        <EventCount />

        <View style={styles.filterCard}>
          <View style={styles.filterHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>CLIENT-OWNED PREFERENCE</Text>
              <Text style={styles.filterTitle}>Filter by track</Text>
            </View>
            <Text style={styles.savedCount}>{savedCount} saved</Text>
          </View>
          <View style={styles.trackChoices}>
            {TRACKS.map((track) => {
              const selected = selectedTrack === track;
              return (
                <Pressable
                  key={track}
                  onPress={() => dispatch(trackSelected(track))}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  style={[styles.trackChoice, selected && styles.trackChoiceSelected]}
                >
                  <Text style={[styles.trackChoiceText, selected && styles.trackChoiceTextSelected]}>{track}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <EventList />

        <View style={styles.lessonCard}>
          <Text style={styles.sectionEyebrow}>THE DISTINCTION</Text>
          <Text style={styles.lessonTitle}>One cache entry, two subscribers</Text>
          <Text style={styles.lessonCopy}>
            EventList and EventCount both call the generated query hook with the same endpoint and arguments. RTK Query shares the request and cached result; each component subscribes to that cache entry.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

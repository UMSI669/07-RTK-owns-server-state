import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';

function OwnershipColumn({ title, subtitle, items, server = false }) {
  return (
    <View style={[styles.ownershipColumn, server && styles.serverColumn]}>
      <View style={styles.ownershipHeading}>
        <View style={[styles.ownershipMarker, server && styles.serverMarker]}>
          <Text style={styles.ownershipMarkerText}>{server ? '↻' : 'C'}</Text>
        </View>
        <View>
          <Text style={styles.ownershipTitle}>{title}</Text>
          <Text style={styles.ownershipSubtitle}>{subtitle}</Text>
        </View>
      </View>
      {items.map((item) => (
        <View key={item} style={styles.ownershipItem}>
          <Text style={styles.ownershipCheck}>{server ? '↗' : '✓'}</Text>
          <Text style={styles.ownershipItemText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export default function StateOwnershipMap() {
  return (
    <View style={styles.ownershipCard}>
      <Text style={styles.sectionEyebrow}>WHO OWNS EACH VALUE?</Text>
      <Text style={styles.ownershipCardTitle}>Separate client intent from server records</Text>
      <View style={styles.ownershipColumns}>
        <OwnershipColumn
          title="Client-owned"
          subtitle="Regular Redux slices"
          items={['Selected track', 'Saved event IDs']}
        />
        <OwnershipColumn
          title="Server-owned"
          subtitle="RTK Query cache"
          items={['Event records', 'Request status', 'Cached responses']}
          server
        />
      </View>
      <Text style={styles.ownershipFootnote}>Query results stay in RTK Query. Filters read query data; they never copy the event list into a client slice.</Text>
    </View>
  );
}

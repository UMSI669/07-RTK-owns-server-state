import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { styles } from '../styles';

function describeError(error) {
  if (!error) return 'The request failed.';
  if (typeof error === 'string') return error;
  if (error.data?.message) return error.data.message;
  if (error.error) return error.error;
  if (error.status) return `The events service returned ${error.status}.`;
  return 'The request failed. Check your connection and retry.';
}

export default function QueryStatus({
  data,
  error,
  isError,
  isFetching,
  isLoading,
  requestId,
  startedTimeStamp,
  fulfilledTimeStamp,
  onRefetch,
}) {
  const [requestLog, setRequestLog] = useState([]);
  const hasData = Array.isArray(data);

  useEffect(() => {
    if (!requestId) return;
    const status = isFetching ? 'fetching' : isError ? 'failed' : hasData ? 'succeeded' : 'waiting';
    setRequestLog((entries) => {
      const existing = entries.some((entry) => entry.id === requestId);
      const entry = {
        id: requestId,
        status,
        started: startedTimeStamp ? new Date(startedTimeStamp).toLocaleTimeString() : '—',
        completed: isFetching
          ? null
          : fulfilledTimeStamp && !isError
            ? new Date(fulfilledTimeStamp).toLocaleTimeString()
            : new Date().toLocaleTimeString(),
      };
      return existing
        ? entries.map((current) => current.id === requestId ? { ...current, ...entry } : current)
        : [entry, ...entries].slice(0, 4);
    });
  }, [requestId, isFetching, isError, hasData, startedTimeStamp, fulfilledTimeStamp]);

  return (
    <View style={styles.queryStatusWrap}>
      {isLoading && !hasData ? (
        <View style={styles.initialLoading}>
          <ActivityIndicator size="large" color="#4b63dd" />
          <Text style={styles.initialLoadingTitle}>Loading events from the server</Text>
          <Text style={styles.initialLoadingCopy}>The collection query is warming the shared cache.</Text>
        </View>
      ) : null}

      {isFetching && hasData ? (
        <View style={styles.refreshBanner}>
          <ActivityIndicator size="small" color="#4b63dd" />
          <Text style={styles.refreshText}>Refreshing in the background · cached records stay visible</Text>
        </View>
      ) : null}

      {isError ? (
        <View style={[styles.errorBanner, hasData && styles.errorBannerStale]}>
          <View style={styles.errorCopy}>
            <Text style={styles.errorTitle}>{hasData ? 'Refresh failed · showing cached data' : 'Could not load events'}</Text>
            <Text style={styles.errorMessage}>{describeError(error)}</Text>
          </View>
          <Pressable onPress={onRefetch} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      ) : null}

      <View style={styles.queryMetaRow}>
        <Text style={styles.queryMetaText}>Query: {isFetching ? 'fetching' : isError ? 'error' : hasData ? 'fulfilled / cached' : 'uninitialized'}</Text>
        <Pressable onPress={onRefetch} style={styles.refetchButton}>
          <Text style={styles.refetchText}>↻  Refetch</Text>
        </Pressable>
      </View>

      <View style={styles.logBox}>
        <View style={styles.logTitleRow}>
          <Text style={styles.logTitle}>Simple request log</Text>
          <Text style={styles.logSharedLabel}>1 shared cache key</Text>
        </View>
        {requestLog.length ? requestLog.map((entry) => (
          <View key={entry.id} style={styles.logEntry}>
            <Text style={styles.logRequestId}>{entry.id.slice(0, 8)}…</Text>
            <Text style={styles.logEntryStatus}>{entry.status}</Text>
            <Text style={styles.logEntryTime}>{entry.completed || entry.started}</Text>
          </View>
        )) : <Text style={styles.logEmpty}>The first request will appear here.</Text>}
      </View>
    </View>
  );
}

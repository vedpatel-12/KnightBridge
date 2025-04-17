// src/screens/Inbox.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebaseConfig';
import { ref, onValue, remove } from 'firebase/database';

type Notification = {
  key: string;
  type: string;
  message: string;
  timestamp: string;
};

export default function Inbox() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const notifRef = ref(db, `notifications/${user.uid}`);
    const unsub = onValue(notifRef, snap => {
      const val = snap.val() || {};
      const items = Object.entries(val).map(([key, data]) => ({
        key,
        ...(data as any),
      })) as Notification[];
      items.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
      setNotifications(items);
    });
    return () => unsub();
  }, [user]);

  const handleDismiss = async (key: string) => {
    try {
      if (user) await remove(ref(db, `notifications/${user.uid}/${key}`));
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Could not dismiss notification');
    }
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <View style={styles.item}>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.time}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
      <TouchableOpacity onPress={() => handleDismiss(item.key)}>
        <Text style={styles.dismiss}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Inbox</Text>
      {notifications.length === 0 ? (
        <Text style={styles.empty}>No notifications yet.</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={i => i.key}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 60, backgroundColor: '#fff' },
  header:    { fontSize: 32, fontWeight: 'bold', marginBottom: 10,textAlign: 'center' },
  empty:     { marginTop: 50, textAlign: 'center', color: 'gray' },
  item:      {
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 12,
  },
  message:   { fontSize: 16, marginBottom: 4 },
  time:      { fontSize: 12, color: 'gray' },
  dismiss:   { color: '#d00', marginTop: 8, alignSelf: 'flex-end' },
});

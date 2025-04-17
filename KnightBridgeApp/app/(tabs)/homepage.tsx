import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebaseConfig';
import { ref, set, get, remove, push } from 'firebase/database';
import { LinearGradient } from 'expo-linear-gradient';


export default function HomePage() {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [activityOpen, setActivityOpen]       = useState(false);

  const [selectedSport, setSelectedSport]     = useState<string | null>(null);
  const [sportOpen, setSportOpen]             = useState(false);

  // Clear sport whenever you switch away
  useEffect(() => {
    if (selectedActivity !== 'sports') {
      setSelectedSport(null);
    }
  }, [selectedActivity]);

  const activityItems = [
    { label: 'Studying', value: 'studying' },
    { label: 'Sports',   value: 'sports'   },
    { label: 'Eating',   value: 'eating'   },
  ];
  const sportItems = [
    { label: 'Basketball', value: 'basketball' },
    { label: 'Soccer',     value: 'soccer'     },
    { label: 'Tennis',     value: 'tennis'     },
  ];

  const handleConnect = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      return Alert.alert('Not signed in', 'Please sign in first.');
    }
    if (!selectedActivity) {
      return Alert.alert('Missing Activity', 'Please select an activity.');
    }
    if (selectedActivity === 'sports' && !selectedSport) {
      return Alert.alert('Missing Sport', 'Please select a sport.');
    }

    const uid       = user.uid;
    const timestamp = new Date().toISOString();

    try {
      // 1) save user profile
      await set(ref(db, `users/${uid}`), {
        activity: selectedActivity,
        sport:    selectedSport || null,
        email:    user.email,
        timestamp,
      });

      // 2) if sports, enqueue & possibly match
      if (selectedActivity === 'sports') {
        const membersRef = ref(db, `sports/${selectedSport}/members`);
        const snap       = await get(membersRef);
        const members    = snap.val() || {};
        const count      = Object.keys(members).length;

        // add self
        await set(ref(db, `sports/${selectedSport}/members/${uid}`), {
          email:     user.email,
          timestamp,
        });

        // if that makes two, match right away
        if (count + 1 === 2) {
          await matchUsers(selectedSport!);
          return Alert.alert(
            'Matched!',
            `🎉 We've found someone for ${selectedSport}! Check your Inbox.`
          );
        }
      }

      // 3) otherwise, just confirm they're in the queue
      Alert.alert(
        'You’re In!',
        `👍 You’ll be notified as soon as we find another ${selectedActivity}${selectedActivity === 'sports' ? ` (${selectedSport})` : ''} partner.`
      );
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong saving your activity.');
    }
  };

  const matchUsers = async (sport: string) => {
    const sportRef = ref(db, `sports/${sport}/members`);
    const snap     = await get(sportRef);
    const members  = snap.val() || {};
    const uids     = Object.keys(members);

    if (uids.length >= 2) {
      const [uid1, uid2] = uids;
      const user1        = members[uid1];
      const user2        = members[uid2];
      const ts           = new Date().toISOString();

      // push notifications
      const n1 = push(ref(db, `notifications/${uid1}`));
      await set(n1, {
        type:    'match',
        message: `You’ve been matched with ${user2.email} for ${sport}!`,
        timestamp: ts,
      });
      const n2 = push(ref(db, `notifications/${uid2}`));
      await set(n2, {
        type:    'match',
        message: `You’ve been matched with ${user1.email} for ${sport}!`,
        timestamp: ts,
      });

      // remove from queue
      await Promise.all([
        remove(ref(db, `sports/${sport}/members/${uid1}`)),
        remove(ref(db, `sports/${sport}/members/${uid2}`)),
      ]);

      console.log(`Matched ${user1.email} ↔ ${user2.email} for ${sport}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome!</Text>
      <Text style={styles.subHeader}>Pick an activity</Text>

      {/* Activity */}
      <View style={styles.pickerContainer}>
        <DropDownPicker
          open={activityOpen}
          value={selectedActivity}
          items={activityItems}
          setOpen={setActivityOpen}
          setValue={setSelectedActivity}
          setItems={() => {}}
          placeholder="Select an activity"
          zIndex={3000}
        />
      </View>

      {/* Sport only if needed */}
      {selectedActivity === 'sports' && (
        <View style={styles.pickerContainer}>
          <DropDownPicker
            open={sportOpen}
            value={selectedSport}
            items={sportItems}
            setOpen={setSportOpen}
            setValue={setSelectedSport}
            setItems={() => {}}
            placeholder="Select a sport"
            zIndex={2000}
          />
        </View>
      )}

      <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
        <LinearGradient colors={['#4A90E2', '#005BB5']} style={styles.connectButtonGradient}>
          <Text style={styles.connectText}>Connect</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 15,
  },
  pickerContainer: {
    width: '85%',
    marginBottom: 20,
  },
  connectButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  connectButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 70,
  },
  connectText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

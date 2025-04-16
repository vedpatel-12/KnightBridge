import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { db } from '../firebaseConfig'; // ensure this includes the updated db import
import { getAuth } from 'firebase/auth';
import { ref, set, get, remove } from 'firebase/database';

export default function HomePage() {
  const router = useRouter();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);
  const [activityOpen, setActivityOpen] = useState(false);
  const [sportOpen, setSportOpen] = useState(false);

  const activityItems = [
    { label: 'Studying', value: 'studying' },
    { label: 'Sports', value: 'sports' },
    { label: 'Eating', value: 'eating' },
  ];

  const sportItems = [
    { label: 'Basketball', value: 'basketball' },
    { label: 'Soccer', value: 'soccer' },
    { label: 'Tennis', value: 'tennis' },
  ];

  const handleConnect = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Not signed in', 'Please sign in first.');
      return;
    }

    if (!selectedActivity) {
      Alert.alert('Missing Activity', 'Please select an activity.');
      return;
    }

    const uid = user.uid;

    try {
      // Save activity to user profile
      await set(ref(db, `users/${uid}`), {
        activity: selectedActivity,
        sport: selectedSport || null,
        email: user.email,
        timestamp: new Date().toISOString(),
      });

      // If sports, add user to sport group
      if (selectedActivity === 'sports' && selectedSport) {
        const sportRef = ref(db, `sports/${selectedSport}/members`);
        const snapshot = await get(sportRef);
        const members = snapshot.val() || {};

        // Add user to the sport group
        await set(ref(db, `sports/${selectedSport}/members/${uid}`), {
          email: user.email,
          timestamp: new Date().toISOString(),
        });

        // If there are 2 members, match them
        if (Object.keys(members).length + 1 === 2) {
          await matchUsers(selectedSport);
        }
      }

      // Navigate to activity screen
      router.push(`/activities/${selectedActivity}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong saving your activity.');
    }
  };

  const matchUsers = async (sport: string) => {
    const sportRef = ref(db, `sports/${sport}/members`);
    const snapshot = await get(sportRef);
    const members = snapshot.val();

    if (members) {
      const memberKeys = Object.keys(members);
      if (memberKeys.length >= 2) {
        const user1 = members[memberKeys[0]];
        const user2 = members[memberKeys[1]];

        // Send SMS to both users (implement your own function to send SMS)
       // await sendMatchSMS(user1.email, user2.email, sport);

        // Remove both users from the database
        await remove(ref(db, `sports/${sport}/members/${memberKeys[0]}`));
        await remove(ref(db, `sports/${sport}/members/${memberKeys[1]}`));

        console.log(`Matched ${user1.email} and ${user2.email} for ${sport}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome!</Text>
      <Text style={styles.subHeader}>Pick An Activity</Text>

      <View style={styles.pickerContainer}>
        <DropDownPicker
          open={activityOpen}
          value={selectedActivity}
          items={activityItems}
          setOpen={setActivityOpen}
          setValue={setSelectedActivity}
          setItems={() => {}}
          placeholder="Select an activity"
          zIndex={2000}
        />
      </View>

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
            zIndex={1000}
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
    zIndex: 10,
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

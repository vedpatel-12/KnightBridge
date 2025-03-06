import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomePage() {
  const router = useRouter();
  const [selectedActivity, setSelectedActivity] = useState('studying');

  return (
    <View style={styles.container}>
      {/* Header with profile icon */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          <Text style={styles.italicBold}>Hello, user!</Text>
        </Text>
      </View>

      <Text style={styles.subHeader}>Who’s joining you today?</Text>

      {/* Activity Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedActivity}
          onValueChange={(itemValue) => setSelectedActivity(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Find an activity" value="" />
          <Picker.Item label="Studying" value="studying" />
          <Picker.Item label="Sports" value="sports" />
        </Picker>
      </View>

      {/* Circular Connect Button */}
      <TouchableOpacity style={styles.connectButton} onPress={() => router.push('/loading')}>
        <LinearGradient colors={['#4A90E2', '#005BB5']} style={styles.connectButtonGradient}>
          <Text style={styles.connectText}>Connect</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Auto-Join Groups Section */}
      <Text style={styles.sectionHeader}>Auto-Join Groups</Text>
      {Array(3).fill(null).map((_, index) => (
        <TouchableOpacity key={index} style={styles.groupButton} onPress={() => router.push('/loading')}>
          <Text style={styles.groupText}>2 spots: Basketball</Text>
        </TouchableOpacity>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#f9f9f9',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
  },
  italicBold: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  subHeader: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 15,
  },
  pickerContainer: {
    width: '85%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  connectButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  connectButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  connectText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  groupButton: {
    width: '85%',
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#005BB5',
  },
  groupText: {
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  navIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ddd',
  },
});

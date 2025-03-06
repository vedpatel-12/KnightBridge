import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the correct package
import { useRouter } from 'expo-router';

export default function HomePage() {
  const router = useRouter();
  const [selectedActivity, setSelectedActivity] = useState('studying');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello, user!</Text>
      <Text style={styles.subHeader}>Who’s joining you today?</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedActivity}
          onValueChange={(itemValue: string) => setSelectedActivity(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Studying" value="studying" />
          <Picker.Item label="Sports" value="sports" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.connectButton} onPress={() => router.push('/loading')}>
        <Text style={styles.connectText}>Connect</Text>
      </TouchableOpacity>

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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  pickerContainer: {
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  connectButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 20,
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
    width: '80%',
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  groupText: {
    fontSize: 16,
  },
});

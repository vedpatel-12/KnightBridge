import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function QuestionTwoScreen() {
  const router = useRouter();
  const [selectedActivity, setSelectedActivity] = useState('studying');
  const [open, setOpen] = useState(false);
  const [activities, setActivities] = useState([
    { label: 'Studying', value: 'studying' },
    { label: 'Sports', value: 'sports' },
    { label: 'Eating', value: 'eating' },
  ]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Question 2</Text>

      {/* Activity Dropdown */}
      <View style={styles.pickerContainer}>
        <DropdownPicker
          open={open}
          setOpen={setOpen}
          value={selectedActivity}
          setValue={setSelectedActivity}
          items={activities}
          setItems={setActivities}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownStyle}
          listMode="SCROLLVIEW"
          zIndex={1000}
          placeholder="Select an activity"
          textStyle={{
            fontSize: 16
          }}
        />
      </View>

      {/* Circular Connect Button */}
      <TouchableOpacity style={styles.connectButton} onPress={() => router.push('/loading')}>
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    padding: 10,
  },
  header: {
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 20,
  },
  pickerContainer: {
    width: '85%',
    marginBottom: 20,
    zIndex: 1000,
  },
  dropdownContainer: {
    width: '100%',
  },
  dropdown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    minHeight: 50,
  },
  dropdownStyle: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  connectButton: {
    width: 140,
    height: 140,
    borderRadius: 50,
    overflow: 'hidden',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
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
}); 
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomePage() {
  const router = useRouter();
  const [selectedActivity, setSelectedActivity] = useState('');
  const [open, setOpen] = useState(false);
  const [activities, setActivities] = useState([
    { label: 'Studying', value: 'studying' },
    { label: 'Sports', value: 'sports' },
    { label: 'Eating', value: 'eating' },
  ]);

  const handleConnect = () => {
    switch(selectedActivity) {
      case 'studying':
        router.push('/activities/studying');
        break;
      case 'sports':
        router.push('/activities/sports');
        break;
      case 'eating':
        router.push('/activities/eating');
        break;
      default:
        // If no activity is selected, show an alert
        alert('Please select an activity first');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with profile icon */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          <Text style={styles.italicBold}>Hello, user!</Text>
        </Text>
      </View>

      <Text style={styles.subHeader}>Pick An Activity</Text>

      {/* Activity Picker */}
      <View style={styles.pickerContainer}>
        <DropdownPicker
          open={open}
          setOpen={setOpen}
          value={selectedActivity}
          setValue={setSelectedActivity}
          items={[
            { label: 'Studying', value: 'studying' },
            { label: 'Sports', value: 'sports' },
            { label: 'Eating', value: 'eating' }
          ]}
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
      <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
        <LinearGradient colors={['#4A90E2', '#005BB5']} style={styles.connectButtonGradient}>
          <Text style={styles.connectText}>Connect</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Auto-Join Groups Section */}
      <Text style={styles.sectionHeader}>Auto-Join Groups</Text>
      {Array(4).fill(null).map((_, index) => (
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
    paddingTop: 80,
    backgroundColor: '#f9f9f9',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    alignItems: 'center',
  },
  header: {
    fontSize: 29,
  },
  italicBold: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  subHeader: {
    fontSize: 15,
    color: 'gray',
    paddingTop: 40,
    marginBottom: 15,
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
});

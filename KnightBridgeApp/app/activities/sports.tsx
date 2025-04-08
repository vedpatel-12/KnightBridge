import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import DropdownPicker from 'react-native-dropdown-picker';

export default function SportsScreen() {
  const router = useRouter();
  
  // Sport dropdown state
  const [openSport, setOpenSport] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);
  const [sports, setSports] = useState([
    { label: 'Basketball', value: 'basketball' },
    { label: 'Soccer', value: 'soccer' },
    { label: 'Tennis', value: 'tennis' },
    { label: 'Volleyball', value: 'volleyball' },
    { label: 'Swimming', value: 'swimming' }
  ]);

  // Location dropdown state
  const [openLocation, setOpenLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([
    { label: 'Recreation Center', value: 'rec_center' },
    { label: 'Main Gym', value: 'main_gym' },
    { label: 'Outdoor Courts', value: 'outdoor_courts' },
    { label: 'Tennis Courts', value: 'tennis_courts' },
    { label: 'Swimming Pool', value: 'pool' }
  ]);

  const handleConnect = () => {
    if (!selectedSport || !selectedLocation) {
      alert('Please select both a sport and location');
      return;
    }
    router.push({
      pathname: '/activities/sports-details',
      params: { 
        sport: selectedSport,
        location: selectedLocation
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Sports Match</Text>
      
      <Text style={styles.description}>
        Find teammates for your favorite sports!
      </Text>

      {/* Sport Dropdown */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Select Sport</Text>
        <DropdownPicker
          open={openSport}
          setOpen={setOpenSport}
          value={selectedSport}
          setValue={setSelectedSport}
          items={sports}
          setItems={setSports}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
          listMode="SCROLLVIEW"
          placeholder="Choose a sport"
          zIndex={2000}
          textStyle={styles.dropdownText}
        />
      </View>

      {/* Location Dropdown */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Select Location</Text>
        <DropdownPicker
          open={openLocation}
          setOpen={setOpenLocation}
          value={selectedLocation}
          setValue={setSelectedLocation}
          items={locations}
          setItems={setLocations}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
          listMode="SCROLLVIEW"
          placeholder="Choose a location"
          zIndex={1000}
          textStyle={styles.dropdownText}
        />
      </View>

      {/* Circular Connect Button */}
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    padding: 10,
  },
  header: {
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  description: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 40,
  },
  dropdownContainer: {
    width: '85%',
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  dropdown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    minHeight: 50,
  },
  dropdownList: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
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
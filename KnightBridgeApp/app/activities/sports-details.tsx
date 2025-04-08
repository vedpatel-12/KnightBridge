import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SportsDetailsScreen() {
  const router = useRouter();
  const { sport, location } = useLocalSearchParams();

  // Function to convert sport value to readable text
  const getSportText = (value: string) => {
    const sportMap: { [key: string]: string } = {
      'basketball': 'Basketball',
      'soccer': 'Soccer',
      'tennis': 'Tennis',
      'volleyball': 'Volleyball',
      'running': 'Running'
    };
    return sportMap[value as string] || value;
  };

  // Function to convert location value to readable text
  const getLocationText = (value: string) => {
    const locationMap: { [key: string]: string } = {
      'rec_center': 'Recreation Center',
      'sports_complex': 'Sports Complex',
      'track_field': 'Track & Field',
      'tennis_courts': 'Tennis Courts',
      'basketball_courts': 'Basketball Courts',
      'main_gym': 'Main Gym',
      'outdoor_courts': 'Outdoor Courts',
      'pool': 'Swimming Pool'
    };
    return locationMap[value as string] || value;
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Your Sports Details</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Selected Sport:</Text>
          <Text style={styles.value}>{getSportText(sport as string)}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Selected Location:</Text>
          <Text style={styles.value}>{getLocationText(location as string)}</Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Looking for sports buddies...</Text>
          <Text style={styles.subStatusText}>We'll notify you when someone wants to join!</Text>
        </View>
      </View>
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
  detailsContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statusContainer: {
    marginTop: 30,
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 10,
  },
  subStatusText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
}); 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function QuestionOneScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Find Your Match</Text>

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
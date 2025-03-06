import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

// Import profile image (make sure profile.png exists in assets folder)
const profileImage = require('../../assets/images/profile.png'); // Adjust path if needed

export default function InboxScreen() {
  const router = useRouter();
  
  const messages = Array(5).fill({
    name: "Person’s Name",
    message: "Liked a message - 3d",
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Profile Logo (Left Side) */}
        <TouchableOpacity style={styles.profileIcon}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>

        {/* Centered Inbox Title */}
        <Text style={styles.title}>Inbox</Text>
      </View>

      {/* Message List */}
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            {/* Profile Avatar for Messages */}
            <Image source={profileImage} style={styles.avatar} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  title: { flex: 1, textAlign: 'center', fontSize: 24, fontWeight: 'bold', fontStyle: 'italic' },
  profileIcon: { marginRight: 10 }, // Ensures spacing
  profileImage: { width: 40, height: 40, borderRadius: 20 }, // Circular profile image
  messageContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 }, // Profile avatars in messages
  name: { fontWeight: 'bold', fontSize: 16 },
  message: { color: 'gray' },
});
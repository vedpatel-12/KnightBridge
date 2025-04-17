// src/screens/SettingsScreen.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';

export default function SettingsScreen() {
  const router = useRouter();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (err) {
      console.error(err);
      Alert.alert('Logout failed', 'Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Settings Options */}
      <View style={styles.settingOption}>
        <Text style={styles.settingTitle}>Change display name:</Text>
        <TextInput style={styles.input} placeholder="Enter new display name" />
        <Text style={styles.checkmark}>✔</Text>
      </View>

      <View style={styles.settingOption}>
        <Text style={styles.settingTitle}>Change username:</Text>
        <TextInput style={styles.input} placeholder="Enter new username" />
        <Text style={styles.checkmark}>✔</Text>
      </View>

      <View style={styles.settingOption}>
        <Text style={styles.settingTitle}>Change password:</Text>
        <TextInput style={styles.input} placeholder="Enter new password" secureTextEntry />
        <Text style={styles.checkmark}>✔</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 45,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
  },
  checkmark: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 40,
    paddingVertical: 12,
    backgroundColor: '#d00',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  navIcon: {
    width: 30,
    height: 30,
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import Firebase authentication instance

export default function SignUpScreen() {
  const router = useRouter();

  // State variables to store user input
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Function to handle user sign-up
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
  
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
      Alert.alert('Success', 'Account created successfully!');
      router.replace('/homepage'); // Navigate to home screen after successful sign-up
    } catch (error) {
      const errMsg = (error as Error).message; // 👈 Fix here
      console.error('Sign up error:', errMsg);
      Alert.alert('Sign Up Failed', errMsg);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Sign Up</Text>

      {/* Input Fields */}
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor="#bbb" 
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail} // Updates email state
      />
      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        placeholderTextColor="#bbb" 
        value={username}
        onChangeText={setUsername} // Updates username state
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        placeholderTextColor="#bbb" 
        secureTextEntry 
        value={password}
        onChangeText={setPassword} // Updates password state
      />
      <TextInput 
        style={styles.input} 
        placeholder="Phone Number" 
        placeholderTextColor="#bbb" 
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone} // Updates phone state
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    backgroundColor: '#1e3a8a',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    color: 'white',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

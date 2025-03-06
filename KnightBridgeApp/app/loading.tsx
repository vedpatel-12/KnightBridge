import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function LoadingScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.text}>Finding Buddy</Text>
      <View style={styles.dotContainer}>
        <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(to bottom,rgb(5, 20, 80), #0F1E55)',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(80, 192, 192, 0.2)',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
    marginBottom: 20,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});
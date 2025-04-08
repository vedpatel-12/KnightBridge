import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Entry screen */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        
        {/* Login & Signup Screens */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />

        {/* Main App (Tabs) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Activity Screens */}
        <Stack.Screen name="activities/studying" options={{ headerShown: false }} />
        <Stack.Screen name="activities/sports" options={{ headerShown: false }} />
        <Stack.Screen name="activities/eating" options={{ headerShown: false }} />
        <Stack.Screen name="activities/studying-details" options={{ headerShown: false }} />
        <Stack.Screen name="activities/sports-details" options={{ headerShown: false }} />
        <Stack.Screen name="activities/eating-details" options={{ headerShown: false }} />
        <Stack.Screen name="loading" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

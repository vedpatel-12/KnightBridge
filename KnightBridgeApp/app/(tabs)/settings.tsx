import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20, paddingTop:45 },
  title: { paddingTop: 0,flex: 1, textAlign: 'center', fontSize: 35, fontWeight: 'bold', fontStyle: 'italic',marginBottom: 20 },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
  settingOption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 },
  settingTitle: { fontSize: 16, fontWeight: 'bold' },
  input: { flex: 1, marginLeft: 10, borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 5 },
  checkmark: { fontSize: 18, color: 'green', fontWeight: 'bold' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, position: 'absolute', bottom: 10, width: '100%' },
  navIcon: { width: 30, height: 30 },
});

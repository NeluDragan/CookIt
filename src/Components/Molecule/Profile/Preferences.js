import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Preferences = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('light');

  const toggleNotifications = () => {
    setIsNotificationsEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferences</Text>

      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceText}>Enable Notifications</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isNotificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotifications}
          value={isNotificationsEnabled}
        />
      </View>

      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceText}>Select Theme</Text>
        <Picker
          selectedValue={selectedTheme}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedTheme(itemValue)}>
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  preferenceText: {
    fontSize: 18,
  },
  picker: {
    width: 150,
  },
});

export default Preferences;

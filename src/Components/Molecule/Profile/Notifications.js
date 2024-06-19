import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

const Notifications = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const toggleSwitch = (setFunction, value) => {
    setFunction(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.text}>Enable Notifications</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleSwitch(setIsEnabled, isEnabled)}
          value={isEnabled}
        />
      </View>
      {isEnabled && (
        <>
          <View style={styles.switchContainer}>
            <Text style={styles.text}>Email Notifications</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={emailEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch(setEmailEnabled, emailEnabled)}
              value={emailEnabled}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.text}>Push Notifications</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={pushEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch(setPushEnabled, pushEnabled)}
              value={pushEnabled}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.text}>SMS Notifications</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={smsEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch(setSmsEnabled, smsEnabled)}
              value={smsEnabled}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default Notifications;

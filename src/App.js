import React, {useEffect} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {useFonts} from 'expo-font';

import {AuthProvider} from './context/AuthContext';
import AppNav from './Navigation/AppNav';

const App = () => {
  return (
    <AuthProvider styles={styles.container}>
      <AppNav />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto',
    maxWidth: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default App;

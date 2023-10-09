import React, {useEffect} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';

import {AuthProvider} from './context/AuthContext';
import AppNav from './Navigation/AppNav';

const App = () => {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Futura',
    maxWidth: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default App;

import React from 'react';
import {StyleSheet} from 'react-native';
// import {registerRootComponent} from 'expo'; //for expo
import Toast from 'react-native-toast-message';
import {AuthProvider} from './context/AuthContext';
import AppNav from './Navigation/AppNav';

const App = () => {
  return (
    <AuthProvider styles={styles.container}>
      <AppNav />
      <Toast />
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
// registerRootComponent(App);//for expo

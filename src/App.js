import React, {useEffect} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import SignInScreen from './Screens/SignInScreen';
// import SearchBarMolecule from './Components/Molecule/SearchBarMolecule';
// import ButtonAtom from './Components/Atoms/ButtonAtom';
// import UserProfileOrganism from './Components/Organism/UserProfileOrganism';
// import {globalStyles} from './Components/Style/GlobalStyles';
// import {NavigationContainer} from '@react-navigation/native';
// import AppNavigator from './Screens/Navigator/AppNavigator';
// import {
//   navigationRef,
//   isReadyRef,
// } from '../src/Screens/Navigator/RootNavigation';

const App = () => {
  // useEffect(() => {
  //   return () => {
  //     isReadyRef.current = false;
  //   };
  // }, []);

  return (
    <View style={styles.container}>
      <SignInScreen />
      {/* <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <AppNavigator />
      </NavigationContainer> */}
    </View>
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

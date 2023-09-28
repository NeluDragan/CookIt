import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import SearchBarMolecule from './Components/Molecule/SearchBarMolecule';
import ButtonAtom from './Components/Atoms/ButtonAtom';
import UserProfileOrganism from './Components/Organism/UserProfileOrganism';
import {globalStyles} from './Components/Style/GlobalStyles';

const App = () => {
  const showMessage = () => {
    alert('Hello, CookIt! Your React Native app is working!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CookIt App</Text>
      <ButtonAtom label="Check It" onPress={showMessage} />

      <UserProfileOrganism />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Futura',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default App;

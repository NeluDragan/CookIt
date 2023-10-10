import React, {useContext} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';

import ButtonAtom from '../Components/Atoms/ButtonAtom';
import {AuthContext} from '../context/AuthContext';

const AppStack = () => {
  const {logout} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>AppStack</Text>
      <ButtonAtom
        label="Logout"
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Futura',
    maxWidth: '100%',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default AppStack;

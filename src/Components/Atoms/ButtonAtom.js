import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {PRIMARY_COLOR} from '../Style/Colors.js';

const ButtonAtom = ({label, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
    borderRadius: 50,
    width: 300,
    maxWidth: '95%',
  },
  label: {
    color: 'black',
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
  },
});

export default ButtonAtom;

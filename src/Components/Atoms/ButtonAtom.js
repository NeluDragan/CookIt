import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {PRIMARY_COLOR} from '../Style/Colors.js';

const ButtonAtom = ({label, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
    borderRadius: 50,
  },
  label: {
    color: 'black',
    textAlign: 'center',
  },
});

export default ButtonAtom;

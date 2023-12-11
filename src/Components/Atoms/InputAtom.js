import React from 'react';
import {INPUT_BACKGROUND} from '../Style/Colors';
import {View, TextInput, StyleSheet} from 'react-native';

const InputAtom = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: INPUT_BACKGROUND,
    height: 40,
    borderRadius: 15,
    width: 300,
    paddingLeft: 10,
    maxWidth: '95%',
  },
  container: {
    padding: 3,
    alignItems: 'center',
  },
});
export default InputAtom;

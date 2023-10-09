import React, {useState} from 'react';
import {PRIMARY_COLOR, SECONDARY_COLOR_2} from '../Style/Colors.js';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import ButtonAtom from '../Atoms/ButtonAtom.js';

const SearchBarMolecule = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchText);
  };

  return (
    <View>
      <TextInput
        placeholder="Search..."
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <ButtonAtom style={styles.button} label="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    color: SECONDARY_COLOR_2,
    padding: 10,
    borderRadius: 5,
  },
  label: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SearchBarMolecule;

import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Feather, Entypo} from '@expo/vector-icons';

const SearchBarMolecule = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }>
        <Feather
          name="search"
          size={20}
          color="black"
          style={{marginLeft: 1}}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {clicked && (
          <TouchableOpacity onPress={() => setSearchPhrase('')}>
            <Entypo name="cross" size={20} color="black" style={{padding: 1}} />
          </TouchableOpacity>
        )}
      </View>
      {clicked && (
        <Button
          title="Cancel"
          onPress={() => {
            Keyboard.dismiss();
            setClicked(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '95%',
  },
  searchBar__unclicked: {
    padding: 8,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 10,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 8,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    width: '90%',
  },
});

export default SearchBarMolecule;

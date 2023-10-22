import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

const SearchBarMolecule = ({searchPhrase, setSearchPhrase}) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleTextInputFocus = () => {
    if (isTyping) {
      setSearchPhrase('');
    }
    setIsTyping(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Image
            source={require('../../images/icons/search/search.png')}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search recipes"
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            onFocus={handleTextInputFocus}
          />
          <Image
            source={require('../../images/icons/search/edit.png')}
            style={styles.icon}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  searchBar: {
    padding: 8,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
  },
  icon: {
    width: 13,
    height: 13,
    marginHorizontal: 10,
  },
});

export default SearchBarMolecule;

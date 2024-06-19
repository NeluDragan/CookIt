import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  Text,
} from 'react-native';
import axios from 'axios';

const SearchBarMolecule = ({searchPhrase, setSearchPhrase}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleTextInputFocus = () => {
    setIsTyping(true);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      if (searchPhrase.trim().length >= 3) {
        try {
          const response = await axios.get(
            'http://localhost:3001/searchRecipes',
            {
              params: {query: searchPhrase},
            },
          );
          setSearchResults(response.data);
          console.log('Search results:', response.data);
        } catch (error) {
          console.error(
            'Error searching recipes:',
            error.response?.data || error.message,
          );
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchRecipes();
  }, [searchPhrase]);

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
        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <View style={styles.resultItem}>
                <Text>{item.name}</Text>
              </View>
            )}
          />
        )}
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
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SearchBarMolecule;

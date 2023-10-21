import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import ButtonAtom from '../Components/Atoms/ButtonAtom';
import {AuthContext} from '../context/AuthContext';
import RecipeList from '../Components/Molecule/RecipeMolecule/RecipeList';
import SearchBarMolecule from '../Components/Molecule/SearchBarMolecule';

const HomeScreen = () => {
  const {logout} = useContext(AuthContext);

  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);

  return (
    <View style={styles.container}>
      <SearchBarMolecule
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <ScrollView style={styles.scrollContainer}>
        <RecipeList title={'Salads'} />
        <RecipeList title={'Breakfast'} />
        <RecipeList title={'Lunch'} />
        <RecipeList title={'Dinner'} />
        <RecipeList title={'Desserts'} />
        <RecipeList title={'Drinks'} />
      </ScrollView>

      {/* <ButtonAtom
        label="Logout"
        onPress={() => {
          logout();
        }}
        style={styles.logoutButton}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    paddingTop: 50,
  },
  scrollContainer: {
    flex: 1,
  },
  logoutButton: {
    marginTop: 20, // Adjust the margin as needed
  },
});

export default HomeScreen;

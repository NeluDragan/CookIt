import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import axios from 'axios';
import RecipeList from '../Components/Molecule/RecipeMolecule/RecipeList';
import SearchBarMolecule from '../Components/Molecule/SearchBarMolecule';

const HomeScreen = ({navigation}) => {
  const [recipesByType, setRecipesByType] = useState({});
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state

  const fetchRecipes = () => {
    axios
      .get('http://localhost:3001/recipe')
      .then(response => {
        const organizedRecipes = response.data.reduce((acc, recipe) => {
          let type = recipe.type;

          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push(recipe);
          return acc;
        }, {});

        setRecipesByType(organizedRecipes);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRecipes();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <SearchBarMolecule
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {Object.entries(recipesByType).map(([type, recipes]) => (
          <View key={type}>
            <RecipeList
              title={type}
              recipes={recipes}
              navigation={navigation}
              type={type}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  scrollContainer: {
    flex: 1,
  },
});

export default HomeScreen;

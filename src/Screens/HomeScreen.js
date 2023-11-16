import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import RecipeList from '../Components/Molecule/RecipeMolecule/RecipeList';
import SearchBarMolecule from '../Components/Molecule/SearchBarMolecule';

const HomeScreen = ({navigation}) => {
  const [recipesByType, setRecipesByType] = useState({});
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/recipe')
      .then(response => {
        const organizedRecipes = response.data.reduce((acc, recipe) => {
          let type = recipe.type;

          switch (type) {
            case 'Dessert1':
              type = 'Desserts';
              break;
            case 'Breackfast1':
              type = 'Breakfasts';
              break;
            case 'Salad1':
              type = 'Salads';
              break;
            case 'Soup1':
              type = 'Soups';
              break;
            case 'Dinner1':
              type = 'Dinners';
              break;
            case 'Lunch1':
              type = 'Lunches';
              break;
            case 'Drinks1':
              type = 'Drinks';
              break;
          }

          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push(recipe);
          return acc;
        }, {});

        setRecipesByType(organizedRecipes);
      })
      .catch(error => {
        console.error('Eroare la obținerea retetelor:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <SearchBarMolecule
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <ScrollView style={styles.scrollContainer}>
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

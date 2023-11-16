import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import RecipeBlock from '../Molecule/RecipeMolecule/RecipeBlock';

const SeeAllType = ({route, navigation}) => {
  const {type} = route.params;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/recipe', {
        params: {
          type: type,
        },
      })
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }, [type]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All {type} Recipes</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {recipes.map(recipe => (
          <RecipeBlock
            key={recipe._id}
            recipe={recipe}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 35,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default SeeAllType;

import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';
import RecipeBlock from '../Components/Molecule/RecipeMolecule/RecipeBlock';

const FavoriteRecipesScreen = ({navigation}) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const {userToken} = useContext(AuthContext);

  const loadFavoriteRecipes = async () => {
    try {
      if (!userToken) {
        console.error('Authentication required.');
        return;
      }

      const headers = {
        Authorization: userToken,
      };

      const response = await axios.get(
        'http://localhost:3001/getFavoriteRecipes',
        {
          headers,
        },
      );

      if (response.data) {
        setFavoriteRecipes(response.data);
      }
    } catch (error) {
      console.error('Error fetching favorite recipes:', error.response.data);
    }
  };

  useEffect(() => {
    loadFavoriteRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Recipes</Text>
      <ScrollView>
        {favoriteRecipes.length === 0 ? (
          <Text style={styles.Text}>No favorite recipes.</Text>
        ) : (
          <View style={styles.recipeContainer}>
            {favoriteRecipes.map(recipe => (
              <RecipeBlock
                key={recipe._id}
                navigation={navigation}
                recipe={recipe}
                isFavorite={favoriteRecipes}
                viewType="block"
              />
            ))}
          </View>
        )}
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  Text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default FavoriteRecipesScreen;

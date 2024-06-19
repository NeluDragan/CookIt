import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ScrollView, StyleSheet, RefreshControl} from 'react-native';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import RecipeBlock from '../RecipeMolecule/RecipeBlock';

const UserRecipesScreen = ({navigation}) => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {userToken} = useContext(AuthContext);

  const loadUserRecipes = async () => {
    try {
      if (!userToken) {
        console.error('Autentificare necesară.');
        return;
      }

      const headers = {
        Authorization: userToken,
      };

      const response = await axios.get('http://localhost:3001/getUserRecipes', {
        headers,
      });

      if (response.data) {
        setUserRecipes(response.data);
      }
    } catch (error) {
      console.error('Error fetching user recipes:', error.response.data);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserRecipes();
    setRefreshing(false);
  };

  useEffect(() => {
    loadUserRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Recipes</Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {userRecipes.length === 0 ? (
          <Text style={styles.Text}>No recipes created by you.</Text>
        ) : (
          <View style={styles.recipeContainer}>
            {userRecipes.map(recipe => (
              <RecipeBlock
                key={recipe._id}
                navigation={navigation}
                recipe={recipe}
                isFavorite={userRecipes}
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

export default UserRecipesScreen;

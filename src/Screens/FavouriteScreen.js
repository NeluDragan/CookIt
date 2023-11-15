import React, {useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, TouchableOpacity, Button} from 'react-native';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';

const FavoriteRecipesScreen = ({navigation}) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const {userToken} = useContext(AuthContext);

  const handleRecipePress = recipeId => {
    navigation.navigate('RecipeDetail', {recipeId});
  };

  // const handleRemoveFavorite = recipeId => {
  //   try {
  //     axios
  //       .post(
  //         'http://localhost:3001/removeFavoriteRecipe',
  //         {recipeId},
  //         {
  //           headers: {
  //             Authorization: `${userToken}`,
  //           },
  //         },
  //       )
  //       .then(() => {
  //         loadFavoriteRecipes();
  //       });
  //   } catch (error) {
  //     console.error(
  //       'Eroare la eliminarea rețetei din favorite:',
  //       error.response.data,
  //     );
  //   }
  // };

  const loadFavoriteRecipes = async () => {
    try {
      if (!userToken) {
        console.error('Autentificare necesară.');
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
      console.error(
        'Eroare la extragere rețetei din favorite:',
        error.response.data,
      );
    }
  };

  useEffect(() => {
    loadFavoriteRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Rețete favorite</Text>
      {favoriteRecipes.length === 0 ? (
        <Text>Nu aveți rețete favorite.</Text>
      ) : (
        <FlatList
          data={favoriteRecipes}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity onPress={() => handleRecipePress(item._id)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
              {/* <Button
                title="Elimină din favorite"
                onPress={() => handleRemoveFavorite(item._id)}
              /> */}
            </View>
          )}
        />
      )}
      <Button title="Resetează rețete favorite" onPress={loadFavoriteRecipes} />
    </View>
  );
};

export default FavoriteRecipesScreen;

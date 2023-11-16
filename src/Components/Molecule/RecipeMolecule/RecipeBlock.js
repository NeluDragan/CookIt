import React, {useState, useContext} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {AuthContext} from '../../../context/AuthContext';
import axios from 'axios';

const RecipeBlock = ({navigation, recipe}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const {userToken} = useContext(AuthContext);

  const handleRecipeInfoPress = () => {
    console.log(navigation, recipe);
    if (navigation && recipe) {
      navigation.navigate('RecipeInfo', {recipe});
    } else {
      console.log('Navigation or recipe is not available');
    }
  };

  const handleFavoritePress = async () => {
    try {
      if (!userToken) {
        console.error('Autentificare necesară.');
        return;
      }
      const headers = {
        Authorization: `${userToken}`,
      };
      const action = isFavorite ? 'remove' : 'add';
      const response = await axios.post(
        'http://localhost:3001/handleFavoriteRecipes',
        {
          recipeId: recipe._id,
          action,
        },
        {
          headers,
        },
      );
      if (
        response.data.message ===
        'Rețeta a fost adăugată la favorite cu succes.'
      ) {
        setIsFavorite(true);
        console.log('Rețeta a fost adăugată la favorite cu succes.');
      } else if (
        response.data.message ===
        'Rețeta a fost eliminată din favorite cu succes.'
      ) {
        setIsFavorite(false);
        console.log('Rețeta a fost eliminată din favorite cu succes.');
      }
    } catch (error) {
      console.error(
        'Eroare la adăugarea/eliminarea rețetei din favorite:',
        error.response.data,
      );
    }
  };
  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const recipeImage = recipe?.image
    ? {uri: recipe.image}
    : require('../../../images/recipe/defaultimage.png');

  return (
    <TouchableOpacity style={styles.container} onPress={handleRecipeInfoPress}>
      <Image source={recipeImage} style={styles.recipeImage} />
      <Text style={styles.preparationTime}>{recipe.preparationTime} min</Text>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleFavoritePress}>
        <Image
          source={
            isFavorite
              ? require('../../../images/icons/reciepeList/favourite_filled.png')
              : require('../../../images/icons/reciepeList/favourite.png')
          }
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <View style={styles.recipeNameOverlay}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    height: 235,
    maxHeight: 250,
    borderBottomColor: '#ccc',
  },
  recipeImage: {
    width: 150,
    height: 190,
    borderRadius: 9,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  favoriteIcon: {
    width: 20,
    height: 20,
    marginEnd: 15,
    marginTop: 155,
  },
  recipeNameOverlay: {
    position: 'absolute',
    bottom: -10,
    left: -165,
    padding: 5,
    borderRadius: 5,
  },
  recipeName: {
    fontSize: 18,
    width: 300,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  preparationTime: {
    position: 'absolute',
    top: 165,
    left: 20,
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default RecipeBlock;

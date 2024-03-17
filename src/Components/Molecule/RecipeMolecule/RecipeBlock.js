import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {AuthContext} from '../../../context/AuthContext';
import axios from 'axios';
import {showToast} from '../../Atoms/ToastAtom';

const RecipeBlock = ({navigation, recipe}) => {
  const [refreshing, setRefreshing] = useState(false);
  const {userToken} = useContext(AuthContext);
  const [checkingFavorites, setCheckingFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (userToken && recipe._id) {
      const checkFavorite = async () => {
        try {
          const headers = {Authorization: userToken};
          const response = await axios.get(
            'http://localhost:3001/getFavoriteRecipes',
            {headers},
          );
          const favoriteRecipeIds = response.data.map(recipeID => recipeID._id);
          setCheckingFavorites(favoriteRecipeIds);
        } catch (error) {
          console.error(
            'Error checking favorite recipes:',
            error.response.data,
          );
        }
      };
      checkFavorite();
    }
  }, [userToken, recipe._id]);

  useEffect(() => {
    // Check if the recipe ID exists in the user's list of favorite recipes
    if (userToken && recipe._id && checkingFavorites.includes(recipe._id)) {
      setIsFavorite(true);
    }
  }, [userToken, recipe._id, checkingFavorites]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleRecipeInfoPress = () => {
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
        showToast(
          'success',
          'Rețeta a fost adăugată la favorite cu succes.',
          '',
        );
        setIsFavorite(true);
      } else if (
        response.data.message ===
        'Rețeta a fost eliminată din favorite cu succes.'
      ) {
        showToast(
          'error',
          'Rețeta a fost eliminata din favorite cu succes.',
          '',
        );
        setIsFavorite(false);
      }
    } catch (error) {
      console.error(
        'Eroare la adăugarea/eliminarea rețetei din favorite:',
        error.response.data,
      );
      showToast(
        'error',
        'Eroare la adăugarea/eliminarea rețetei din favorite:',
        '',
      );
    }
  };

  const recipeImage = recipe?.image
    ? {uri: recipe.image}
    : require('../../../images/recipe/defaultimage.png');

  return (
    <TouchableOpacity
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
      onPress={handleRecipeInfoPress}>
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
          <Text style={styles.recipeName} numberOfLines={1}>
            {recipe.name.length > 200
              ? recipe.name.substring(0, 200) + '...'
              : recipe.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 11,
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
    padding: 6,
    borderRadius: 5,
  },
  recipeName: {
    fontSize: 18,
    width: 300,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'black',
    maxWidth: 165,
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
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 3,
  },
});

export default RecipeBlock;

import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const RecipeRow = ({navigation, recipe}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleRecipeInfoPress = () => {
    if (navigation) {
      navigation.navigate('RecipeInfo', {recipe});
    } else {
      console.log('Navigation is not available');
    }
  };

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
  };

  const recipeImage = recipe.image
    ? {uri: recipe.image}
    : require('../../../images/recipe/defaultimage.png');

  return (
    <TouchableOpacity style={styles.container} onPress={handleRecipeInfoPress}>
      <Image source={recipeImage} style={styles.recipeImage} />
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
    height: 170,
    maxHeight: 170,
    borderBottomColor: '#ccc',
  },
  recipeImage: {
    width: 300,
    height: 160,
    borderRadius: 5,
    marginRight: 10,
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
    marginEnd: 25,
    marginTop: 15,
  },
  recipeNameOverlay: {
    position: 'absolute',
    bottom: 0,
    left: -300,
    padding: 5,
    borderRadius: 5,
  },
  recipeName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default RecipeRow;

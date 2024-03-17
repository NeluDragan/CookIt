/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import IngredientsContent from '../Molecule/RecipeDetails/Ingredients';
import InstructionsContent from '../Molecule/RecipeDetails/Instructions';
import HealthScoreContent from '../Molecule/RecipeDetails/HealthScore';
import {PRIMARY_COLOR, SECONDARY_COLOR_2} from '../Style/Colors';

const RecipeInfo = ({route}) => {
  const {recipe} = route.params;
  const [activeTab, setActiveTab] = useState('ingredients');
  const [isFavorite, setIsFavorite] = useState(false);
  const {userToken} = useContext(AuthContext);
  const [ingredientsDetails, setIngredientsDetails] = useState([]);

  const fetchIngredientDetails = async () => {
    try {
      const detailsPromises = recipe.ingredients.map(async ingredient => {
        const response = await axios.get(
          `http://localhost:3001/getIngredientById/${ingredient.id}`,
        );
        return response.data;
      });

      const details = await Promise.all(detailsPromises);
      setIngredientsDetails(details);
    } catch (error) {
      console.error('Error fetching ingredient details:', error);
    }
  };

  useEffect(() => {
    fetchIngredientDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe.ingredients]);

  const renderContent = () => {
    switch (activeTab) {
      case 'ingredients':
        return (
          <IngredientsContent
            ingredientsDetails={ingredientsDetails}
            recipe={recipe}
          />
        );
      case 'instructions':
        return <InstructionsContent recipe={recipe} />;
      case 'healthScore':
        return <HealthScoreContent recipe={recipe} />;
      default:
        return null;
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
  const recipeImage = recipe.image
    ? {uri: recipe.image}
    : require('../../images/recipe/defaultimage.png');

  return (
    <View>
      <Image style={styles.recipeImage} source={{uri: recipeImage.uri}} />

      <View style={styles.titleOfRecipe}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}>
          <Image
            source={
              isFavorite
                ? require('../../images/icons/reciepeList/favourite_filled.png')
                : require('../../images/icons/reciepeList/favourite.png')
            }
            style={styles.favoriteIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setActiveTab('ingredients')}>
          <View style={styles.tabTitle}>
            <Text
              style={{
                color: activeTab === 'ingredients' ? PRIMARY_COLOR : 'black',
                fontWeight: 'bold',
              }}>
              {recipe.ingredients.length}
            </Text>
            <Text
              style={{
                color: activeTab === 'ingredients' ? PRIMARY_COLOR : 'black',
              }}>
              Ingredients
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('instructions')}>
          <View style={styles.tabTitle}>
            <Text
              style={{
                color: activeTab === 'instructions' ? PRIMARY_COLOR : 'black',
                fontWeight: 'bold',
              }}>
              {recipe.preparationTime} min
            </Text>
            <Text
              style={{
                color: activeTab === 'instructions' ? PRIMARY_COLOR : 'black',
              }}>
              Instructions
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('healthScore')}>
          <View style={[styles.tabTitle, {marginTop: -10}]}>
            <Text
              style={{
                color: activeTab === 'healthScore' ? PRIMARY_COLOR : 'black',
                fontWeight: 'bold',
              }}
            />
            <Image
              source={require('../../images/icons/heart.png')}
              resizeMode="contain"
              style={{
                width: 22,
                height: 22,
                tintColor:
                  activeTab === 'healthScore'
                    ? PRIMARY_COLOR
                    : SECONDARY_COLOR_2,
              }}
            />
            <Text
              style={{
                color: activeTab === 'healthScore' ? PRIMARY_COLOR : 'black',
              }}>
              Health Score
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </View>
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
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingBottom: 20,
  },
  recipeImage: {
    width: '100%',
    height: 240,
  },
  titleOfRecipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  favoriteButton: {
    marginTop: -190,
  },
  favoriteIcon: {
    width: 20,
    height: 20,
    marginEnd: 25,
    marginTop: 15,
  },
  recipeName: {
    fontSize: 25,
    width: 300,
    marginLeft: 30,
    marginTop: -180,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 3,
  },
  preparationTime: {
    fontSize: 14,
    marginLeft: -85,
    marginTop: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  tabTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  healthScoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
});

export default RecipeInfo;

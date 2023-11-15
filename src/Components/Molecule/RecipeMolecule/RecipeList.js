import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import RecipeRow from './RecipeRow';
import axios from 'axios';

const RecipeList = ({navigation, title}) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/recipe')
      .then(response => {
        const filteredRecipes = response.data.filter(
          recipe => recipe.type === title,
        );
        setRecipes(filteredRecipes);
      })
      .catch(error => {
        console.error('Eroare la obținerea retetelor:', error);
      });
  }, [title]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={styles.TouchableOpacity}
          onPress={() => {
            navigation.navigate('AllRecipes', {title});
          }}>
          <Text style={styles.showAllButton}>See all</Text>
          <Image
            source={require('../../../images/icons/reciepeList/next.png')}
            style={styles.nextIcon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} horizontal>
        {recipes.map(recipe => (
          <RecipeRow key={recipe._id} navigation={navigation} recipe={recipe} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    position: 'relative',
    marginVertical: 22,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  showAllButton: {
    fontSize: 14,
  },
  scrollViewContainer: {
    flexDirection: 'row',
  },
  nextIcon: {
    width: 17,
    height: 17,
  },
  TouchableOpacity: {
    flexDirection: 'row',
    marginEnd: 7,
  },
});

export default RecipeList;

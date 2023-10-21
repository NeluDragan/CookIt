import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import RecipeRow from './RecipeRow';

const RecipeList = ({navigation, title}) => {
  // An array of recipe data (you can fetch this data from an API or your data source)
  const recipes = [
    {
      id: 1,
      name: 'Recipe 1',
      description: 'Description 1',
      image: require('../../../images/recipe/recipe1.jpg'),
    },
    {
      id: 2,
      name: 'Recipe 2',
      description: 'Description 2',
      image: require('../../../images/recipe/recipe2.jpg'),
    },
    // Add more recipe data
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.showAllButton}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        horizontal={true}>
        {recipes.map(recipe => (
          <RecipeRow key={recipe.id} navigation={navigation} recipe={recipe} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // Stack children vertically
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
    marginEnd: 10,
  },
  scrollViewContainer: {
    flexDirection: 'row', // Stack children horizontally
  },
});

export default RecipeList;

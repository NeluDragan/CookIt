import React from 'react';
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
  // An array of recipe data (you can fetch this data from an API or your data source)
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    // Efectuează cererea HTTP pentru a obține retetele de la server
    axios
      .get('URL_API_Retete')
      .then(response => {
        setRecipes(response.data); // Setează retetele în starea componentei
      })
      .catch(error => {
        console.error('Eroare la obținerea retetelor:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.TouchableOpacity}>
          <Text style={styles.showAllButton}>See all</Text>
          <Image
            source={require('../../../images/icons/reciepeList/next.png')}
            style={styles.nextIcon}
          />
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

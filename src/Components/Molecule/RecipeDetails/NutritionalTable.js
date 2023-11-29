/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SECONDARY_COLOR_2, SECONDARY_COLOR_3} from '../../Style/Colors';

const NutrientsTable = ({totalNutrients}) => {
  if (!totalNutrients) {
    return null;
  }

  const dailyValues = {
    calories: 2000,
    fat: 70,
    carbs: 275,
    sodium: 2300,
    vitaminA: 9000,
    vitaminC: 90,
    calcium: 1300,
    iron: 18,
    sugars: 50,
    protein: 50,
    fibre: 50,
  };

  const dailyValuePercentage = {};
  Object.keys(totalNutrients).forEach(nutrient => {
    dailyValuePercentage[nutrient] =
      (totalNutrients[nutrient] / dailyValues[nutrient]) * 100;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nutritional Information</Text>
      <View style={styles.table}>
        {Object.keys(totalNutrients).map((nutrient, index) => (
          <View
            style={[
              styles.row,
              {
                backgroundColor: index % 2 !== 0 ? SECONDARY_COLOR_3 : 'white',
                borderTopEndRadius: index === 0 ? 10 : 0,
                borderTopStartRadius: index === 0 ? 10 : 0,
                borderBottomEndRadius:
                  index === Object.keys(totalNutrients).length - 1 ? 10 : 0,
                borderBottomStartRadius:
                  index === Object.keys(totalNutrients).length - 1 ? 10 : 0,
              },
            ]}
            key={nutrient}>
            <Text style={styles.column}>{nutrient}</Text>
            <Text
              style={[styles.column, {textAlign: 'center', marginLeft: 40}]}>
              {totalNutrients[nutrient].toFixed(1)}
            </Text>
            <Text style={[styles.column, {textAlign: 'center', color: 'grey'}]}>
              {dailyValuePercentage[nutrient].toFixed(0)}%
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.info}>
        * Percent Daily Values are based on a 2000 calorie diet.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  header: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  columnHeader: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
  },
  column: {
    flex: 1,
    padding: 8,
    marginLeft: 10,
  },
  info: {
    marginTop: 5,
    color: SECONDARY_COLOR_2,
    fontSize: 12,
  },
});

export default NutrientsTable;

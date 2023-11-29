import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import NutritionalTable from './NutritionalTable';
import HealthScoreFlashcard from './HealthScoreFlashcard';

const HealthScoreContent = ({recipe}) => {
  const {ingredients} = recipe;
  const [normalizedScore, setNormalizedScore] = useState(0);
  const [totalIngredientsInfo, setTotalIngredientsInfo] = useState({});
  const [totalWeights, setTotalWeights] = useState({});

  useEffect(() => {
    const referenceValues = {
      calcium: 1300,
      calories: 2000,
      carbs: 130,
      fat: 70,
      fibre: 25,
      iron: 18,
      protein: 65,
      sodium: 2300,
      sugars: 125,
      vitaminA: 900,
      vitaminC: 90,
    };

    const fetchNutritionalInfo = async () => {
      let totalScore = 0;

      for (const ingredient of ingredients) {
        try {
          const response = await axios.get(
            `http://localhost:3001/getIngredientById/${ingredient.id}`,
          );

          const nutritionalInfo = response.data.nutritionalInfo;
          const unit = response.data.unit;

          // Check unit of measurement and adjust quantity accordingly
          let adjustedQuantity = ingredient.quantity;
          if (unit === 'g' || unit === 'ml') {
            adjustedQuantity = adjustedQuantity / 100;
          }

          // Add nutritional info to the totalIngredientsInfo
          Object.keys(nutritionalInfo).forEach(nutrient => {
            const weightedNutrient =
              nutritionalInfo[nutrient] * adjustedQuantity;

            totalIngredientsInfo[nutrient] =
              (totalIngredientsInfo[nutrient] || 0) + weightedNutrient;

            // Add weight to totalWeights
            totalWeights[nutrient] =
              (totalWeights[nutrient] || 0) + weightedNutrient;

            totalScore += (weightedNutrient / referenceValues[nutrient]) * 10;
          });
        } catch (error) {
          console.error('Error fetching ingredient nutritional info:', error);
        }
      }

      const minScore = 0;
      const maxScore = 100;
      const targetMin = 1;
      const targetMax = 10;

      let normalized =
        ((totalScore - minScore) / (maxScore - minScore)) *
          (targetMax - targetMin) +
        targetMin;

      normalized = Math.min(Math.max(normalized, targetMin), targetMax);

      setNormalizedScore(normalized);
      setTotalIngredientsInfo(totalIngredientsInfo);
      setTotalWeights(totalWeights);
    };

    fetchNutritionalInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HealthScoreFlashcard healthScore={normalizedScore.toFixed(2)} />
        <NutritionalTable totalNutrients={totalWeights} />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    marginBottom: 650,
  },
});

export default HealthScoreContent;

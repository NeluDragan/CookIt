/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-paper';

const HealthScoreFlashcard = ({healthScore}) => {
  const filledRectangles = Math.round((healthScore / 10) * 10);

  const rectangles = Array.from({length: 10}, (_, index) => ({
    id: index + 1,
    color:
      index < filledRectangles
        ? healthScore >= 6
          ? 'green'
          : 'orange'
        : 'lightgrey',
  }));

  const healthScoreTextStyle =
    healthScore > 6 ? styles.greenText : styles.orangeText;

  return (
    <Card style={styles.cardStyle}>
      <Card.Content>
        <View style={styles.contentContainer}>
          <View style={styles.container}>
            {rectangles.map((rectangle, index) => (
              <View
                key={rectangle.id}
                style={[styles.rectangle, {backgroundColor: rectangle.color}]}>
                {index === 0 && (
                  <View style={styles.horizontalLine}>
                    <Text style={styles.lowText}>Low</Text>
                  </View>
                )}
                {index === 6 && (
                  <View style={styles.horizontalLine}>
                    <Text style={styles.mediumText}>Medium</Text>
                  </View>
                )}
                {index === 9 && (
                  <View style={styles.horizontalLine}>
                    <Text style={styles.highText}>High</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
          <View style={styles.ratingNumber}>
            <Text style={[styles.healthScoreText, healthScoreTextStyle]}>
              {healthScore}
            </Text>
            <Text style={{color: 'grey'}}> /10</Text>
          </View>
          <View style={styles.verticalLine} />
          <Text style={styles.aboutText}>About ></Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column-reverse',
    marginTop: 10,
  },
  rectangle: {
    width: 30,
    height: 9,
    marginVertical: 0.5,
    borderRadius: 10,
  },
  borderLine: {
    borderRightWidth: 1,
    borderColor: 'black',
  },
  ratingNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 40,
  },
  healthScoreText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  greenText: {
    color: 'green',
  },
  orangeText: {
    color: 'orange',
  },
  aboutText: {
    fontSize: 15,
    color: 'grey',
    justifyContent: 'center',
  },
  verticalLine: {
    width: 1.5,
    height: 100,
    left: '30%',
    backgroundColor: 'grey',
    marginHorizontal: 5,
  },
  horizontalLine: {
    width: 60,
    height: 1.5,
    backgroundColor: 'lightgrey',
    position: 'absolute',
    top: 8,
    left: 31,
  },
  lowText: {
    position: 'absolute',
    top: -12,
    left: 40,
    fontSize: 10,
    color: 'grey',
  },
  mediumText: {
    position: 'absolute',
    top: -12,
    left: 21,
    fontSize: 10,
    color: 'grey',
  },
  highText: {
    position: 'absolute',
    top: -12,
    left: 37,
    fontSize: 10,
    color: 'grey',
  },
});

export default HealthScoreFlashcard;

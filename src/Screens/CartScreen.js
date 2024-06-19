import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
// import {useNotification} from '../Components/Molecule/Notification';

const CartScreen = () => {
  // const {
  //   displayNotification,
  //   displayTriggerNotification,
  //   cancelAllNotifications,
  // } = useNotification();

  // const handleDisplayNotification = async () => {
  //   // Display notification
  //   displayNotification('NotificationTitle', 'NotificationBody');
  // };

  // const handleCreateTriggerNotification = () => {
  //   // Display notification in 3 seconds
  //   displayTriggerNotification(
  //     'NotificationTitle',
  //     'NotificationBody',
  //     Date.now() + 3000,
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.center, {flex: 1}]}>
        <Text>CartScreen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});

export default CartScreen;

import React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PRIMARY_COLOR, SECONDARY_COLOR_2} from '../Components/Style/Colors';

import FavouriteScreen from '../Screens/FavouriteScreen';
import PontryScreen from '../Screens/PontryScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import HomeScreen from '../Screens/HomeScreen';
import CartScreen from '../Screens/CartScreen';

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  const tabBarOptions = {
    showLabel: false,
  };
  return (
    <Tab.Navigator
      tabBarOptions={tabBarOptions}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={
          (tabBarOptions,
          {
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={require('../images/icons/tab/home.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? PRIMARY_COLOR : SECONDARY_COLOR_2,
                  }}
                />
                <Text
                  style={{
                    color: focused ? PRIMARY_COLOR : SECONDARY_COLOR_2,
                    fontSize: 12,
                  }}></Text>
              </View>
            ),
          })
        }
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={
          (tabBarOptions,
          {
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={require('../images/icons/tab/favourite.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? PRIMARY_COLOR : SECONDARY_COLOR_2,
                  }}
                />
                <Text
                  style={{
                    color: focused ? PRIMARY_COLOR : SECONDARY_COLOR_2,
                    fontSize: 12,
                  }}></Text>
              </View>
            ),
          })
        }
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={
          (tabBarOptions,
          {
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={require('../images/icons/tab/cart.png')}
                  resizeMode="contain"
                  style={{
                    width: 40,
                    height: 40,
                    tintColor: focused ? PRIMARY_COLOR : SECONDARY_COLOR_2,
                  }}
                />
                <Text
                  style={{
                    color: focused ? PRIMARY_COLOR : SECONDARY_COLOR_2,
                    fontSize: 12,
                  }}></Text>
              </View>
            ),
          })
        }
      />
      <Tab.Screen
        name="Pontry"
        component={PontryScreen}
        options={
          (tabBarOptions,
          {
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={require('../images/icons/tab/pontry.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? PRIMARY_COLOR : SECONDARY_COLOR_2,
                  }}
                />
                <Text
                  style={{
                    color: focused ? PRIMARY_COLOR : SECONDARY_COLOR_2,
                    fontSize: 12,
                  }}></Text>
              </View>
            ),
          })
        }
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={
          (tabBarOptions,
          {
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={require('../images/icons/tab/user.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? PRIMARY_COLOR : SECONDARY_COLOR_2,
                  }}
                />
                <Text
                  style={{
                    color: focused ? PRIMARY_COLOR : SECONDARY_COLOR_2,
                    fontSize: 12,
                  }}></Text>
              </View>
            ),
          })
        }
      />
    </Tab.Navigator>
  );
};

export default Tabs;

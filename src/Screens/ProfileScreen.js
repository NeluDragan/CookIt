import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {SECONDARY_COLOR_2} from '../Components/Style/Colors';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';

const ProfileScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [mail, setMail] = useState('');

  const {userToken} = useContext(AuthContext);

  useEffect(() => {
    if (userToken) {
      axios
        .get('http://localhost:3001/getUserByToken', {
          headers: {
            Authorization: userToken,
          },
        })
        .then(response => {
          const {name, email} = response.data;
          setUserName(name);
          setMail(email);
        })
        .catch(error => {
          console.error('Error fetching user information:', error);
        });
    }
  }, [userToken]);

  const navigateToScreen = screenName => {
    navigation.navigate(screenName, {
      name: userName,
      email: mail,
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/profile/user.png')}
        style={styles.profileImage}
      />
      <Text style={styles.profileText}>{userName}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToScreen('Account')}>
        <Text style={styles.buttonText}>Account</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: SECONDARY_COLOR_2}}>{mail}</Text>
          <Image
            source={require('../images/icons/reciepeList/next.png')}
            style={styles.nextIcon}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToScreen('Notifications')}>
        <Text style={styles.buttonText}>Notifications</Text>
        <Image
          source={require('../images/icons/reciepeList/next.png')}
          style={styles.nextIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToScreen('Preferences')}>
        <Text style={styles.buttonText}>Preferences</Text>
        <Image
          source={require('../images/icons/reciepeList/next.png')}
          style={styles.nextIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToScreen('About')}>
        <Text style={styles.buttonText}>About CookIt</Text>
        <Image
          source={require('../images/icons/reciepeList/next.png')}
          style={styles.nextIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToScreen('Feedback')}>
        <Text style={styles.buttonText}>Feedback & Support</Text>
        <Image
          source={require('../images/icons/reciepeList/next.png')}
          style={styles.nextIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: SECONDARY_COLOR_2,
  },
  profileDetails: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    padding: 18,
    borderRadius: 5,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: SECONDARY_COLOR_2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
  },
  nextIcon: {
    width: 17,
    height: 17,
  },
});

export default ProfileScreen;

import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';

import Logo from '../images/logo.png';
import InputAtom from '../Components/Atoms/InputAtom';
import ButtonAtom from '../Components/Atoms/ButtonAtom';
import {AuthContext} from '../context/AuthContext';

import BackgroundImage from '../images/background/bg1.jpg';

const SignInScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {height} = useWindowDimensions();
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState(null);

  const handleSignUpPress = () => {
    navigation.navigate('Register');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
    setRightIcon(passwordVisibility ? 'eye-off' : 'eye');
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/signIn', {
        email: username,
        password: password,
      });

      const {token, user} = response.data;
      console.log(token);
      login(token, user);
      setLoginError(null);
      // navigation.navigate('Home');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed. Please check your credentials.');
    }
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.root}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.15}]}
          resizeMode="contain"
        />
        <Text style={styles.errorText}>{loginError}</Text>

        <View style={styles.loginContainer}>
          <InputAtom
            placeholder="Username"
            value={username}
            setValue={setUsername}
          />
          <InputAtom
            placeholder="Password"
            value={password}
            setValue={setPassword}
            onChangeText={UserPassword => setPassword(UserPassword)}
            secureTextEntry={passwordVisibility}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.visibilityBtn}
            onPress={togglePasswordVisibility}>
            <Image
              source={
                rightIcon === 'eye'
                  ? require('../images/view.png')
                  : require('../images/hide.png')
              }
              style={styles.visibilityBtn}
            />
          </TouchableOpacity>

          <SafeAreaView style={styles.mainContainer}>
            <View style={styles.button}>
              <ButtonAtom label="Log In" onPress={handleLogin} />
            </View>
          </SafeAreaView>
        </View>
        <View style={styles.signupText}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUpPress}>
            <Text style={{color: 'blue'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    maxWidth: 300,
    maxHeight: 200,
    marginTop: 50,
  },
  button: {
    marginTop: 20,
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: '20%',
  },
  signupText: {
    marginTop: 20,
    flexDirection: 'row',
  },
  inputFlex: {
    alignSelf: 'stretch',
    width: '100%',
    padding: 0,
    backgroundColor: '#ddd',
  },
  visibilityBtn: {
    position: 'absolute',
    right: 7,
    height: 22,
    width: 22,
    padding: 0,
    marginTop: 29.5,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 10,
  },
});

export default SignInScreen;

import React, {useState} from 'react';
import {View, Text} from 'react-native';
import ButtonAtom from '../Atoms/ButtonAtom.js';
import SearchBarMolecule from '../Molecule/SearchBarMolecule.js';

const UserProfileOrganism = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  });

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <View>
      <Text>Welcome, {user.name}!</Text>
      <Text>Email: {user.email}</Text>
      <ButtonAtom label="Logout" onPress={handleLogout} />
      <SearchBarMolecule />
    </View>
  );
};

export default UserProfileOrganism;

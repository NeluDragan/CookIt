import React, {useState} from 'react';
import {View, Text} from 'react-native';
import ButtonAtom from '../Atoms/ButtonAtom.js'; // Reuse the Atom
import SearchBarMolecule from '../Molecule/SearchBarMolecule.js'; // Reuse the Molecule

const UserProfileOrganism = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  });

  const handleLogout = () => {
    // Handle logout logic here
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

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigate } from 'react-router-native';
import { MaterialIcons } from '@expo/vector-icons';

const NavBar = () => {
  const navigate = useNavigate();
  const screenWidth = Dimensions.get('window').width; // Get screen width for responsive design

  return (
    <View style={[styles.navBar, { width: screenWidth }]}>
      <TouchableOpacity onPress={() => navigate('/')}>
        <MaterialIcons name="home" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/projects')}>
        <Text style={styles.navText}>Projects</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/skills')}>
        <Text style={styles.navText}>Skills</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/contact')}>
        <Text style={styles.navText}>Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#274373',
    position: 'absolute',
    top: 50, // clearance from my camera notch!!!
    left: 0,
    right: 0,
  },
  navText: {
    color: 'white',
  },
});

export default NavBar;


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from './NavBar';

export default function HomePage() {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(require('../assets/profile.jpg'));

  useEffect(() => {
    const getProfilePicture = async () => {
      try {
        const storedProfilePicture = await AsyncStorage.getItem('profilePicture');
        if (storedProfilePicture) {
          setProfilePicture({ uri: storedProfilePicture });
        }
      } catch (error) {
        console.error('Error retrieving profile picture from AsyncStorage:', error);
      }
    };
    getProfilePicture();
  }, []);

  const handleProfilePictureUpdate = async () => {
    // Request camera roll permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedProfilePicture = result.assets[0].uri;
      setProfilePicture({ uri: updatedProfilePicture });
      try {
        await AsyncStorage.setItem('profilePicture', updatedProfilePicture);
      } catch (error) {
        console.error('Error saving profile picture to AsyncStorage:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleProfilePictureUpdate}>
        <Image source={profilePicture} style={styles.profilePic} />
      </TouchableOpacity>
      <Text style={styles.titlename}>B B.</Text>
      <Text style={styles.title}>Welcome to My Portfolio</Text>
      <Text style={styles.paragraph1}>This is an exciting oportunity for me to work on mobile app development. Inside the Projects tab, there are two projects that i am currently contributing to.</Text>
      <Text style={styles.paragraph2}>In this app, you will be able to change your profile image and the projects image as needed. When you navigate through the tabs, the app keeps the pictures you update in place. How cool is that!</Text>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5c80bd',
  },

 paragraph1: {
  padding: 10,
  fontSize: 15,
 },

 paragraph2: {
  padding: 10,
  fontSize: 15,
 },

  title: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 20,
  },

titlename: {
  fontSize: 20,
  color: 'black',
  fontWeight: 'bold',
  marginBottom: 30,
},

  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from './NavBar';

const ProjectsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectImages, setProjectImages] = useState([
    { id: 1, image: require('../assets/project1.png') },
    { id: 2, image: require('../assets/project2.png') },
  ]);

  useEffect(() => {
    const getProjectImages = async () => {
      try {
        const storedProjectImages = await AsyncStorage.getItem('projectImages');
        if (storedProjectImages) {
          setProjectImages(JSON.parse(storedProjectImages));
        }
      } catch (error) {
        console.error('Error retrieving project images from AsyncStorage:', error);
      }
    };
    getProjectImages();
  }, []);

  const handleProjectImageUpdate = async (projectId) => {
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
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedProjectImages = projectImages.map((project) =>
        project.id === projectId
          ? { ...project, image: { uri: result.assets[0].uri } }
          : project
      );
      setProjectImages(updatedProjectImages);
      try {
        await AsyncStorage.setItem('projectImages', JSON.stringify(updatedProjectImages));
      } catch (error) {
        console.error('Error saving project images to AsyncStorage:', error);
      }
    }
  };

  const projects = [
    { id: 1, name: 'Project 1', description: 'NSC Events:', link: 'https://github.com/SeattleColleges/nsc-events-nextjs', image: projectImages[0].image },
    { id: 2, name: 'Project 2', description: 'Belindias Closet:', link: 'https://github.com/SeattleColleges/belindas-closet-nextjs', image: projectImages[1].image },
  ];

  const projectDetail = id ? projects.find(p => p.id.toString() === id) : null;

  return (
    <View style={styles.container}>
      <NavBar />
      {projectDetail ? (
        <View style={styles.detailView}>
          <Image source={projectDetail.image} style={styles.projectImage} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleProjectImageUpdate(projectDetail.id)}>
            <Text style={styles.buttonText}>Update Project Image</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{projectDetail.name}</Text>
          <Text style={styles.description}>{projectDetail.description}</Text>
          <Text style={styles.link} onPress={() => Linking.openURL(projectDetail.link)}>View Project on GitHub</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('/projects')}>
            <Text style={styles.buttonText}>All Projects</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.listView}>
          <Text style={styles.title}>All Projects</Text>
          {projects.map((project) => (
            <TouchableOpacity
              key={project.id}
              style={styles.button}
              onPress={() => navigate(`/projects/${project.id}`)}>
              <Text style={styles.buttonText}>{project.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5c80bd',
    alignItems: 'center',
    paddingTop: 120,
  },
  listView: {
    width: '100%',
    alignItems: 'center',
  },
  detailView: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    color: '#ccc',
    marginBottom: 5,
  },
  link: {
    fontSize: 18,
    color: '#add8e6',
    marginBottom: 20,
    textDecorationLine: 'underline'
  },
  button: {
    backgroundColor: '#0056b3',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
  },
  projectImage: {
    width: '100%',
    height: 200,
    marginVertical: 20,
  },
  projectItem: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default ProjectsPage;

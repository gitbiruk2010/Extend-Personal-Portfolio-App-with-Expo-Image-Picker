import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import NavBar from './NavBar'; // importing the navbar component

export default function SkillsPage() {
  const navigate = useNavigate();
  const skills = [
    'JavaScript', 'React Native', 'Node.js', 'HTML/CSS',
    'MySQL DB Admin', 'SharePoint'
  ];

  return (
    <View style={styles.container}>
      <NavBar />
      <Text style={styles.header}>My Skills</Text>
      {skills.map((skill, index) => (
        <Text key={index} style={styles.skillItem}>{skill}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5c80bd',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black'
  },
  skillItem: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10
  },
});

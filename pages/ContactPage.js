import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as MailComposer from 'expo-mail-composer';
import NavBar from './NavBar'; // importing navbar component

export default function ContactPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = () => {
    if(email && message && name) {
      MailComposer.composeAsync({
        recipients: ['buyebeye19@gmail.com'],
        subject: `Contact from ${name}`,
        body: message + `\n\n Reply to: ${email}`,
        isHtml: false,
      }).then(result => {
        if(result.status === 'sent') {
          Alert.alert("Message Sent", "Thank you for contacting us!", [{ text: "OK" }]);
          setName('');
          setEmail('');
          setMessage('');
        } else {
          Alert.alert("Message Failed", "Something went wrong. Please try again.", [{ text: "OK" }]);
        }
      });
    } else {
      Alert.alert("Missing Fields", "Please fill all the fields.", [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.container}>
      <NavBar />
      <Text style={styles.header}>Contact Me</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address" />
      <TextInput
        style={styles.input}
        placeholder="Your Message"
        value={message}
        onChangeText={setMessage}
        multiline />
      <TouchableOpacity style={styles.button} onPress={sendEmail}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
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
    color: 'black',
    marginBottom: 20
  },
  input: {
    width: '95%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'lightgray'
  },
  button: {
    backgroundColor: '#0056b3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  }
});

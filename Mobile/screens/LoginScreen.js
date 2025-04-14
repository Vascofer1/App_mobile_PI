// screens/LoginScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nome da app</Text>

            <Text style={styles.label}>Username:</Text>
            <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#ccc" />

            <Text style={styles.label}>Password:</Text>
            <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="#ccc" />

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')} // Navigate to Home screen
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}


// Update the styles to change the background to white and adjust text and input colors
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Set background to white
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#000000', // Set text color to black
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    color: '#000000', // Set label color to black
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0', // Light gray for input background
    color: '#000000', // Black text for input
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cccccc', // Add a border for better visibility
  },
  button: {
    backgroundColor: '#007bff', // Slightly darker blue for better contrast
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // Keep button text white
    fontWeight: 'bold',
  },
});


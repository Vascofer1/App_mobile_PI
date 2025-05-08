// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://172.22.21.136:80/api/mobile/check-login', {
        email,
        password,
      });

      // Example: Use the response data (e.g., token) if needed
      console.log('Login successful:', response.data);

      setMensagem('Login com sucesso!');
      navigation.navigate('Home'); // ou a dashboard do evento, etc.
    } catch (error) {
      console.log(error.response?.data);
      if (error.response?.status === 401) {
        setMensagem('Credenciais inválidas.');
      } else if (error.response?.data?.message) {
        setMensagem(error.response.data.message);
      } else {
        setMensagem('Erro ao tentar fazer login.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meetra</Text>

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
      />

      {mensagem && <Text style={styles.error}>{mensagem}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    color: '#000000',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    color: '#000000',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
});

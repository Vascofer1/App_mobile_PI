import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function NovaInscricao({ route }) {
  const { eventoId } = route.params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleInscricao = () => {
    axios.post(`http://172.22.21.136:80/api/eventos/${eventoId}/inscrever`, {
      name,
      email,
      phone
    }).then(response => {
      setMensagem('Inscrição feita com sucesso!');
      setName('');
      setEmail('');
    setPhone('');
    }).catch(error => {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        const mensagens = Object.values(errors).flat().join('\n');
        setMensagem(<Text style={{ color: 'red' }}>{mensagens}</Text>);
      } else {
        setMensagem(<Text style={{ color: 'red' }}>Erro inesperado ao inscrever. Tenta novamente.</Text>);
      }
    });      
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />

      <Text style={styles.label}>Telemóvel:</Text>
      <TextInput value={phone} onChangeText={setPhone} style={styles.input} />

      <Button title="Inscrever" onPress={handleInscricao} />
      {mensagem && <Text>{mensagem}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 5 }
});

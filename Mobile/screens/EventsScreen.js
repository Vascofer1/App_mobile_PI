import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function EventosScreen({ navigation }) {
  
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchEventos = async () => {
    try {
      const response = await axios.get('http://172.22.21.136:80/api/eventos'); // substitui pelo teu IP local
      setEventos(response.data);
      setFilteredEventos(response.data); // Inicialmente, todos os eventos são exibidos
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleFilterChange = (text) => {
    setFilterText(text);
    if (text === '') {
      setFilteredEventos(eventos); // Se o filtro estiver vazio, exibe todos os eventos
    } else {
      const filtered = eventos.filter(evento =>
        evento.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEventos(filtered);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos ativos</Text>

      <TextInput
        style={styles.input}
        placeholder="Filtrar por: Nome do evento"
        value={filterText}
        onChangeText={handleFilterChange}
      />

      <FlatList
        data={filteredEventos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Dashboard", { eventoId: item.id })}>
            <View style={styles.eventBox}>
              <Ionicons
                name="checkmark-circle"
                size={24}
                color="green"
                style={{ marginRight: 8 }}
              />
              <View>
                <Text>{item.start_date}</Text>
                <Text style={styles.eventTitle}>{item.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#6afc6a",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { fontWeight: "bold" },
  eventBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  eventTitle: { fontWeight: "bold" },
});

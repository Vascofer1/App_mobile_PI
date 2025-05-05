import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,

} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

export default function ParticipantesScreen( { navigation }) {
  const route = useRoute();
  const { eventoId } = route.params;

  const [participantes, setParticipantes] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipantes = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.78:8000/api/eventos/${eventoId}/participantes`
        );
        setParticipantes(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao carregar participantes");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipantes();
  }, [eventoId]);

  const participantesFiltrados = participantes.filter((p) =>
    p.name?.toLowerCase().includes(filterText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate("ParticipantDetails", { participanteId: item.id })}
  >
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>
        {item.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()}
      </Text>
    </View>
    <Text style={styles.nome}>{item.name}</Text>
  </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Participants</Text>

      <TextInput
        placeholder="🔍 Search participants"
        style={styles.input}
        value={filterText}
        onChangeText={setFilterText}
      />

      {participantesFiltrados.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No participants found.
        </Text>
      ) : (
        <FlatList
          data={participantesFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        {participantesFiltrados.length} participant(s) found.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontWeight: "bold",
    color: "#000",
  },
  nome: {
    fontSize: 16,
  },
});

import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const eventos = [
  { id: "1", data: "Terça-feira, 12/03/2025", nome: "Conferencia xxxxxxxxx" },
  { id: "2", data: "Terça-feira, 12/03/2025", nome: "Conferencia xxxxxxxxx" },
  { id: "3", data: "Terça-feira, 12/03/2025", nome: "Conferencia xxxxxxxxx" },
];

export default function EventosScreen({ navigation }) {
  const navigateToDashboard = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos ativos</Text>

      <TextInput
        style={styles.input}
        placeholder="Filtrar por: Nome do evento"
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Registar entrada</Text>
      </TouchableOpacity>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={navigateToDashboard}>
            <View style={styles.eventBox}>
              <Ionicons
                name="checkmark-circle"
                size={24}
                color="green"
                style={{ marginRight: 8 }}
              />
              <View>
                <Text>{item.data}</Text>
                <Text style={styles.eventTitle}>{item.nome}</Text>
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

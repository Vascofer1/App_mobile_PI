import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

export default function DashboardScreen({ navigation }) {
  const route = useRoute();
  const { eventoId } = route.params;
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://172.22.21.136:80/api/eventos/${eventoId}`)
      .then((response) => {
        setEvento(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar evento:", error);
        setLoading(false);
      });
  }, [eventoId]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const navigateToScanner = (params) => {
    navigation.navigate("Scanner", params);
  };

  const navigateToParticipants = (params) => {
    navigation.navigate("Participants", params);
  };

  const data = [
    {
      name: "Confirmados",
      population: evento.confirmed_count,
      color: "#64cfff",
      legendFontColor: "#000",
      legendFontSize: 12,
    },
    {
      name: "Não confirmados",
      population: evento.waiting_count,
      color: "#ff8bb7",
      legendFontColor: "#000",
      legendFontSize: 12,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evento: {evento.name}</Text>

      <PieChart
        data={data}
        width={Dimensions.get("window").width - 40}
        height={220}
        chartConfig={{
          color: () => `rgba(0, 0, 0, 1)`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToScanner({ eventoId: evento.id })} // envia o ID!
      >
        <Text style={styles.buttonText}>Validate entry</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NovaInscricao", { eventoId })}
      >
        <Text style={styles.buttonText}>Manual registration</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.button}
        onPress={() => navigateToParticipants({ eventoId: evento.id })} // envia o ID!
      >
        <Text style={styles.buttonText}>See participants</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  button: {
    backgroundColor: "#4cf25a",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { fontWeight: "bold", color: "#000" },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#7faaff",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  tabItem: { fontSize: 15, color: "#000" },
});

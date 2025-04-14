import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { PieChart } from "react-native-chart-kit";


export default function DashboardScreen({navigation }) {

    const navigateToScanner = () => {
        navigation.navigate("Scanner");
      };

  const data = [
    {
      name: "Confirmados",
      population: 16,
      color: "#64cfff",
      legendFontColor: "#000",
      legendFontSize: 12,
    },
    {
      name: "Não confirmados",
      population: 6,
      color: "#ff8bb7",
      legendFontColor: "#000",
      legendFontSize: 12,
    },
  ];

return (
    <View style={styles.container}>
        <Text style={styles.title}>
            {"Título do evento"}
        </Text>

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

        <TouchableOpacity style={styles.button} onPress={navigateToScanner}>
            <Text style={styles.buttonText}>Validar entrada</Text>
        </TouchableOpacity>

        <View style={styles.tabBar}>
            <Text style={styles.tabItem}>📊 Dashboard</Text>
            <Text style={styles.tabItem}>👥 Participantes</Text>
            <Text style={styles.tabItem}>⚙️ Opções</Text>
        </View>
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

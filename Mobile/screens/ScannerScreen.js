import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions, Alert } from "react-native";
import { CameraView, Camera } from "expo-camera";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const squareSize = screenWidth * 0.8; // 80% da largura da tela
  const route = useRoute();
  const navigation = useNavigation();
  const { eventoId } = route.params; // Obter o ID do evento da rota

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = async ({ type, data }) => {
    setScanned(true);

    try {
      const response = await axios.post("http://192.168.1.78:8000/api/validar-qrcode", {
        code: data,
        event_id: eventoId,
      });

      const participante = response.data;

      if (participante.status === "Confirmed") {
        alert(`⚠️ Participante encontrado, mas status: ${participante.status}`);
      } else {
        alert(`✅ ${participante.nome} confirmado com sucesso!`);
      }

    } catch (error) {
      

        // Se o erro for 404 (participante não encontrado), oferecer inscrição manual
        if (error.response.status === 404) {
          Alert.alert(
            " ❌ Participante não encontrado",
            "Deseja se inscrever manualmente?",
            [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Sim",
                onPress: () => {
                  navigation.navigate("NovaInscricao", { eventoId });
                },
              },
            ]
          );
        } else {
          console.error(error);
        }
      
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão da câmera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.cameraContainer, { width: squareSize, height: squareSize }]}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={styles.camera}
        />
      </View>

      {scanned && (
        <View style={styles.buttonContainer}>
          <Button title={"Scan again"} onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
});

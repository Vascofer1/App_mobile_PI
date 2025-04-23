import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { CameraView, Camera } from "expo-camera";
import axios from "axios";
import {useRoute} from "@react-navigation/native";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const squareSize = screenWidth * 0.8; // 80% da largura da tela
  const route = useRoute();
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
    //alert(`Barcode of type ${type} and data ${data} has been scanned!`);

    try {
      // Enviar para a API para atualizar o status
      const response = await axios.post("http://192.168.1.78:8000/api/validar-qrcode", {
        code: data,
        event_id: eventoId, 
      });
      
      const participante = response.data;
  
      if (participante.status === "confirmado") {
        alert(`✅ ${participante.nome} confirmado com sucesso!`);
      } else {
        alert(`⚠️ Participante encontrado, mas status: ${participante.status}`);
      }
  
    } catch (error) {
      // Se a API respondeu com um erro conhecido (ex: 404 com mensagem customizada)
      if (error.response && error.response.data?.error) {
        alert(`❌ ${error.response.data.error}`);
        
        // Opcional: só mostra no console se for outro erro que não o 404
        if (error.response.status !== 404) {
          console.error(error);
        }
      } else {
        console.error(error);
        alert("❌ Erro ao confirmar participante.");
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
    overflow: "hidden", // Para garantir que a câmera respeite o border radius
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
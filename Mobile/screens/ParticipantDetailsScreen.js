import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

export default function ParticipanteDetalhesScreen() {
    const route = useRoute();
    const { participanteId } = route.params;
    const [participante, setParticipante] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParticipante = async () => {
            try {
                const response = await axios.get(`http://192.168.1.78:8000/api/participantes/${participanteId}`);
                setParticipante(response.data);
            } catch (error) {
                console.error(error);
                alert("Erro ao carregar detalhes do participante.");
            } finally {
                setLoading(false);
            }
        };

        fetchParticipante();
    }, [participanteId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    if (!participante) {
        return (
            <View style={styles.container}>
            <Text style={styles.errorText}>Participant not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>{participante.name}</Text>
            <View style={styles.card}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{participante.email}</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.label}>Telefone:</Text>
                <Text style={styles.value}>{participante.phone}</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>{participante.status}</Text>
            </View>
            {/* Adicione outros campos conforme necessário */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: "#F5F5F5",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
    },
    titulo: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
    },
    value: {
        fontSize: 16,
        color: "#777",
        marginTop: 4,
    },
    errorText: {
        fontSize: 18,
        color: "#FF0000",
        textAlign: "center",
    },
});

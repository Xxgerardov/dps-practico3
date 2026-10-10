import React, { useState, useCallback } from "react";
import { FlatList, Alert, StyleSheet } from "react-native";
import { Button, FAB, Text, ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { obtenerRecursos, eliminarRecurso } from "../../services/recursosService";
import TarjetaRecurso from "../../components/TarjetaRecurso";

export default function GestionRecursosScreen({ navigation }) {
  const [recursos, setRecursos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);

  const cargar = async () => {
    try {
      const datos = await obtenerRecursos();
      setRecursos(datos);
    } catch (e) {
      Alert.alert("Error", "No se pudieron cargar los recursos");
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [])
  );

  const confirmarEliminar = (recurso) => {
    Alert.alert(
      "Eliminar recurso",
      `¿Seguro que deseas eliminar "${recurso.titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await eliminarRecurso(recurso.id);
              setRecursos((actuales) => actuales.filter((r) => r.id !== recurso.id));
              Alert.alert("Listo", "Recurso eliminado correctamente");
            } catch (e) {
              Alert.alert("Error", "No se pudo eliminar el recurso");
            }
          },
        },
      ]
    );
  };

  if (cargando) {
    return (
      <SafeAreaView style={estilos.centro}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.contenedor} edges={["top"]}>
      <Text variant="headlineSmall" style={estilos.titulo}>
        Gestión de recursos
      </Text>
      <FlatList
        data={recursos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TarjetaRecurso
            recurso={item}
            acciones={
              <>
                <Button
                  onPress={() =>
                    navigation.navigate("FormularioRecurso", { recurso: item })
                  }
                >
                  Editar
                </Button>
                <Button textColor="#b3261e" onPress={() => confirmarEliminar(item)}>
                  Eliminar
                </Button>
              </>
            }
          />
        )}
        ListEmptyComponent={
          <Text style={estilos.mensaje}>Aún no hay recursos. Crea el primero.</Text>
        }
        contentContainerStyle={estilos.lista}
        refreshing={refrescando}
        onRefresh={() => {
          setRefrescando(true);
          cargar();
        }}
      />
      <FAB
        icon="plus"
        label="Nuevo recurso"
        style={estilos.fab}
        onPress={() => navigation.navigate("FormularioRecurso")}
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: "#fff" },
  titulo: { padding: 16, paddingBottom: 0, fontWeight: "bold" },
  lista: { padding: 16, paddingBottom: 100 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center" },
  mensaje: { textAlign: "center", marginVertical: 24 },
  fab: { position: "absolute", right: 16, bottom: 16 },
});
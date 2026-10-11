import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";

export default function PerfilScreen() {
  const { usuario, logout } = useAuth();
  const rolMostrado = usuario.rol === "docente" ? "Docente" : "Estudiante";

  return (
    <SafeAreaView style={estilos.contenedor}>
      <View style={estilos.centro}>
        <Text variant="headlineSmall">Bienvenido, {usuario.nombre}</Text>
        <Text variant="titleMedium">Rol: {rolMostrado}</Text>
        <Text variant="bodyMedium">{usuario.correo}</Text>
        <Button mode="outlined" onPress={logout} style={estilos.boton}>
          Cerrar sesión
        </Button>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
contenedor: { flex: 1 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center", gap: 8 },
  boton: { marginTop: 16 },
});
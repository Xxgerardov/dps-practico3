import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

export default function Estrellas({ valor = 0, onSeleccionar }) {
  return (
    <View style={estilos.fila}>
      {[1, 2, 3, 4, 5].map((n) => (
        <IconButton
          key={n}
          icon={n <= valor ? "star" : "star-outline"}
          iconColor="#f5a623"
          size={28}
          style={estilos.estrella}
          onPress={() => onSeleccionar(n)}
        />
      ))}
    </View>
  );
}

const estilos = StyleSheet.create({
  fila: { flexDirection: "row" },
  estrella: { margin: 0 },
});
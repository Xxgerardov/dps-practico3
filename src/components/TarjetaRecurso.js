 import React from "react";
import { View, Linking, Alert, StyleSheet } from "react-native";
import { Card, Text, Chip, Button, IconButton } from "react-native-paper";
import Estrellas from "./Estrellas";
import { obtenerResumenCalificaciones } from "../utils/calificaciones";

export default function TarjetaRecurso({
  recurso,
  acciones,
  esFavorito,
  onFavorito,
  miCalificacion,
  onCalificar,
}) {
  const { promedio, total } = obtenerResumenCalificaciones(recurso.calificaciones);

  const abrirEnlace = () => {
    Linking.openURL(recurso.enlace).catch(() =>
      Alert.alert("Error", "No se pudo abrir el enlace")
    );
  };

  return (
    <Card style={estilos.tarjeta}>
      {recurso.imagen ? <Card.Cover source={{ uri: recurso.imagen }} /> : null}
      <Card.Content style={estilos.contenido}>
        <Text variant="titleMedium">{recurso.titulo}</Text>
        <Chip compact style={estilos.chip}>
          {recurso.tipo}
        </Chip>
        <Text variant="bodyMedium" numberOfLines={2}>
          {recurso.descripcion}
        </Text>
        <Text variant="labelMedium">
          ID: {recurso.id} ·{" "}
          {total > 0 ? `${promedio.toFixed(1)} / 5 (${total})` : "Sin calificar"}
        </Text>
        {onCalificar && (
          <View>
            <Text variant="labelMedium">Tu calificación</Text>
            <Estrellas valor={miCalificacion} onSeleccionar={onCalificar} />
          </View>
        )}
      </Card.Content>
      <Card.Actions>
        {onFavorito && (
          <IconButton
            icon={esFavorito ? "heart" : "heart-outline"}
            iconColor="#e91e63"
            onPress={onFavorito}
          />
        )}
        <Button onPress={abrirEnlace}>Abrir enlace</Button>
        {acciones}
      </Card.Actions>
    </Card>
  );
}

const estilos = StyleSheet.create({
  tarjeta: { marginBottom: 16 },
  contenido: { gap: 6, paddingTop: 12 },
  chip: { alignSelf: "flex-start" },
});
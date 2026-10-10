import React, { useState } from "react";
import { View, ScrollView, Alert, StyleSheet } from "react-native";
import { TextInput, Button, Chip, HelperText, Text } from "react-native-paper";
import { crearRecurso, actualizarRecurso } from "../../services/recursosService";
import { validarRecurso } from "../../utils/validaciones";

const TIPOS = ["libro", "video", "tutorial", "artículo"];

export default function FormularioRecursoScreen({ route, navigation }) {
  const recursoEditar = route.params?.recurso;

  const [titulo, setTitulo] = useState(recursoEditar?.titulo || "");
  const [descripcion, setDescripcion] = useState(recursoEditar?.descripcion || "");
  const [tipo, setTipo] = useState(recursoEditar?.tipo || "");
  const [enlace, setEnlace] = useState(recursoEditar?.enlace || "");
  const [imagen, setImagen] = useState(recursoEditar?.imagen || "");
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  const opciones = tipo && !TIPOS.includes(tipo) ? [...TIPOS, tipo] : TIPOS;

  const guardar = async () => {
    const datos = { titulo, descripcion, tipo, enlace, imagen };
    const nuevos = validarRecurso(datos);
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    const limpios = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      tipo,
      enlace: enlace.trim(),
      imagen: imagen.trim(),
    };

    setCargando(true);
    try {
      if (recursoEditar) {
        await actualizarRecurso(recursoEditar.id, { ...recursoEditar, ...limpios });
      } else {
        await crearRecurso({ ...limpios, calificaciones: [] });
      }
      Alert.alert(
        "Listo",
        recursoEditar ? "Recurso actualizado correctamente" : "Recurso creado correctamente",
        [{ text: "Aceptar", onPress: () => navigation.goBack() }]
      );
    } catch (e) {
      Alert.alert("Error", "No se pudo guardar el recurso");
    } finally {
      setCargando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={estilos.contenido}>
      <TextInput
        label="Título"
        mode="outlined"
        value={titulo}
        onChangeText={setTitulo}
        error={!!errores.titulo}
      />
      <HelperText type="error" visible={!!errores.titulo}>
        {errores.titulo}
      </HelperText>

      <TextInput
        label="Descripción"
        mode="outlined"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={3}
        error={!!errores.descripcion}
      />
      <HelperText type="error" visible={!!errores.descripcion}>
        {errores.descripcion}
      </HelperText>

      <Text variant="labelLarge">Tipo</Text>
      <View style={estilos.tipos}>
        {opciones.map((t) => (
          <Chip key={t} selected={tipo === t} onPress={() => setTipo(t)}>
            {t}
          </Chip>
        ))}
      </View>
      <HelperText type="error" visible={!!errores.tipo}>
        {errores.tipo}
      </HelperText>

      <TextInput
        label="Enlace al recurso"
        mode="outlined"
        value={enlace}
        onChangeText={setEnlace}
        autoCapitalize="none"
        keyboardType="url"
        error={!!errores.enlace}
      />
      <HelperText type="error" visible={!!errores.enlace}>
        {errores.enlace}
      </HelperText>

      <TextInput
        label="URL de la imagen"
        mode="outlined"
        value={imagen}
        onChangeText={setImagen}
        autoCapitalize="none"
        keyboardType="url"
        error={!!errores.imagen}
      />
      <HelperText type="error" visible={!!errores.imagen}>
        {errores.imagen}
      </HelperText>

      <Button
        mode="contained"
        onPress={guardar}
        loading={cargando}
        disabled={cargando}
        style={estilos.boton}
      >
        {recursoEditar ? "Guardar cambios" : "Crear recurso"}
      </Button>
      <Button mode="text" onPress={() => navigation.goBack()}>
        Cancelar
      </Button>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenido: { padding: 16, backgroundColor: "#fff", flexGrow: 1 },
  tipos: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
  boton: { marginTop: 8 },
});
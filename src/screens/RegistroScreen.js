import React, { useState } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import {
  TextInput,
  Button,
  Text,
  HelperText,
  SegmentedButtons,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { registrarUsuario, existeCorreo } from "../services/usuariosService";
import { validarPassword, validarCorreo } from "../utils/validaciones";

export default function RegistroScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [rol, setRol] = useState("estudiante");
  const [verPassword, setVerPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState({});

  const erroresPassword = password ? validarPassword(password) : [];

  const registrar = async () => {
    const nuevos = {};
    if (!nombre.trim()) nuevos.nombre = "El nombre es obligatorio";
    if (!validarCorreo(correo.trim())) nuevos.correo = "Correo no válido";
    if (validarPassword(password).length > 0)
      nuevos.password = "La contraseña no cumple los requisitos";
    if (password !== confirmar) nuevos.confirmar = "Las contraseñas no coinciden";
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    setCargando(true);
    try {
      if (await existeCorreo(correo.trim())) {
        setErrores({ correo: "Este correo ya está registrado" });
        return;
      }
      await registrarUsuario({
        nombre: nombre.trim(),
        correo: correo.trim(),
        password,
        rol,
      });
      Alert.alert("Registro exitoso", "Ya puedes iniciar sesión", [
        { text: "Aceptar", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (e) {
      Alert.alert("Error", "No se pudo completar el registro");
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      <ScrollView contentContainerStyle={estilos.contenido}>
        <Text variant="headlineMedium" style={estilos.titulo}>
          Crear cuenta
        </Text>

        <TextInput
          label="Nombre"
          mode="outlined"
          value={nombre}
          onChangeText={setNombre}
          error={!!errores.nombre}
        />
        <HelperText type="error" visible={!!errores.nombre}>
          {errores.nombre}
        </HelperText>

        <TextInput
          label="Correo"
          mode="outlined"
          value={correo}
          onChangeText={setCorreo}
          autoCapitalize="none"
          keyboardType="email-address"
          error={!!errores.correo}
        />
        <HelperText type="error" visible={!!errores.correo}>
          {errores.correo}
        </HelperText>

        <TextInput
          label="Contraseña"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!verPassword}
          error={!!errores.password}
          right={
            <TextInput.Icon
              icon={verPassword ? "eye-off" : "eye"}
              onPress={() => setVerPassword(!verPassword)}
            />
          }
        />
        {erroresPassword.map((e) => (
          <HelperText key={e} type="error">
            • {e}
          </HelperText>
        ))}
        <HelperText type="error" visible={!!errores.password}>
          {errores.password}
        </HelperText>

        <TextInput
          label="Confirmar contraseña"
          mode="outlined"
          value={confirmar}
          onChangeText={setConfirmar}
          secureTextEntry={!verPassword}
          error={!!errores.confirmar}
        />
        <HelperText type="error" visible={!!errores.confirmar}>
          {errores.confirmar}
        </HelperText>

        <Text variant="labelLarge" style={estilos.etiqueta}>
          Rol
        </Text>
        <SegmentedButtons
          value={rol}
          onValueChange={setRol}
          buttons={[
            { value: "estudiante", label: "Estudiante" },
            { value: "docente", label: "Docente" },
          ]}
          style={estilos.roles}
        />

        <Button
          mode="contained"
          onPress={registrar}
          loading={cargando}
          disabled={cargando}
          style={estilos.boton}
        >
          Registrarme
        </Button>
        <Button mode="text" onPress={() => navigation.navigate("Login")}>
          ¿Ya tienes cuenta? Inicia sesión
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
contenedor: { flex: 1 },
  contenido: { padding: 24 },
  titulo: { textAlign: "center", fontWeight: "bold", marginBottom: 16 },
  etiqueta: { marginBottom: 8 },
  roles: { marginBottom: 16 },
  boton: { marginTop: 8, marginBottom: 8 },
});
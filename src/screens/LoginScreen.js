import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { iniciarSesion } from "../services/usuariosService";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const entrar = async () => {
    if (!correo.trim() || !password) {
      setError("Completa todos los campos");
      return;
    }
    setCargando(true);
    setError("");
    try {
      const usuario = await iniciarSesion(correo.trim(), password);
      if (!usuario) {
        setError("Correo o contraseña incorrectos");
      } else {
        await login(usuario);
      }
    } catch (e) {
      setError("No se pudo conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      <ScrollView contentContainerStyle={estilos.contenido}>
        <Text variant="headlineMedium" style={estilos.titulo}>
          Recursos de Aprendizaje
        </Text>
        <Text variant="titleMedium" style={estilos.subtitulo}>
          Inicia sesión
        </Text>

        <TextInput
          label="Correo"
          mode="outlined"
          value={correo}
          onChangeText={setCorreo}
          autoCapitalize="none"
          keyboardType="email-address"
          style={estilos.campo}
        />
        <TextInput
          label="Contraseña"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!verPassword}
          right={
            <TextInput.Icon
              icon={verPassword ? "eye-off" : "eye"}
              onPress={() => setVerPassword(!verPassword)}
            />
          }
          style={estilos.campo}
        />
        <HelperText type="error" visible={error !== ""}>
          {error}
        </HelperText>

        <Button
          mode="contained"
          onPress={entrar}
          loading={cargando}
          disabled={cargando}
          style={estilos.boton}
        >
          Entrar
        </Button>
        <Button mode="text" onPress={() => navigation.navigate("Registro")}>
          ¿No tienes cuenta? Regístrate
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
contenedor: { flex: 1 },
  contenido: { padding: 24, justifyContent: "center", flexGrow: 1 },
  titulo: { textAlign: "center", fontWeight: "bold", marginBottom: 8 },
  subtitulo: { textAlign: "center", marginBottom: 24 },
  campo: { marginBottom: 12 },
  boton: { marginTop: 8, marginBottom: 8 },
});
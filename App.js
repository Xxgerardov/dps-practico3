import React from "react";
import { ActivityIndicator, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { temaPaper, temaNavegacion } from "./src/theme/tema";
import LoginScreen from "./src/screens/LoginScreen";
import RegistroScreen from "./src/screens/RegistroScreen";
import TabsPrincipales from "./src/navigation/TabsPrincipales";
import FormularioRecursoScreen from "./src/screens/docente/FormularioRecursoScreen";

const Stack = createNativeStackNavigator();

const Navegacion = () => {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: temaPaper.colors.background,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={temaNavegacion}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {usuario ? (
          <>
            <Stack.Screen name="Inicio" component={TabsPrincipales} />
            <Stack.Screen
              name="FormularioRecurso"
              component={FormularioRecursoScreen}
              options={({ route }) => ({
                headerShown: true,
                title: route.params?.recurso ? "Editar recurso" : "Nuevo recurso",
              })}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registro" component={RegistroScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider
        theme={temaPaper}
        settings={{
          icon: (props) => <MaterialCommunityIcons {...props} />,
        }}
      >
        <AuthProvider>
          <StatusBar style="light" />
          <Navegacion />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
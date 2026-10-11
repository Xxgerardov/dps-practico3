 import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import ListaRecursosScreen from "../screens/ListaRecursosScreen";
import PerfilScreen from "../screens/PerfilScreen";
import GestionRecursosScreen from "../screens/docente/GestionRecursosScreen";

const Tab = createBottomTabNavigator();

export default function TabsPrincipales() {
  const { usuario } = useAuth();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Recursos"
        component={ListaRecursosScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon source="book-open-variant" size={size} color={color} />
          ),
        }}
      />
      {usuario.rol === "estudiante" && (
        <Tab.Screen
          name="Favoritos"
          component={ListaRecursosScreen}
          initialParams={{ soloFavoritos: true }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon source="heart" size={size} color={color} />
            ),
          }}
        />
      )}
      {usuario.rol === "docente" && (
        <Tab.Screen
          name="Gestión"
          component={GestionRecursosScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon source="pencil" size={size} color={color} />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon source="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
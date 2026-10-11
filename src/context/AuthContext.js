import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarSesion = async () => {
      const guardado = await AsyncStorage.getItem("sesion");
      if (guardado) setUsuario(JSON.parse(guardado));
      setCargando(false);
    };
    cargarSesion();
  }, []);

  const login = async (datos) => {
    setUsuario(datos);
    await AsyncStorage.setItem("sesion", JSON.stringify(datos));
  };

  const logout = async () => {
    setUsuario(null);
    await AsyncStorage.removeItem("sesion");
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
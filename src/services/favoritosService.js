import AsyncStorage from "@react-native-async-storage/async-storage";

const clave = (usuarioId) => `favoritos_${usuarioId}`;

export const obtenerFavoritos = async (usuarioId) => {
  const guardado = await AsyncStorage.getItem(clave(usuarioId));
  return guardado ? JSON.parse(guardado) : [];
};

export const alternarFavorito = async (usuarioId, recursoId) => {
  const id = String(recursoId);
  const actuales = await obtenerFavoritos(usuarioId);
  const nuevos = actuales.includes(id)
    ? actuales.filter((f) => f !== id)
    : [...actuales, id];
  await AsyncStorage.setItem(clave(usuarioId), JSON.stringify(nuevos));
  return nuevos;
};
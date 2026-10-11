import { API_URL } from "../config/api";

const URL = `${API_URL}/usuarios`;

export const obtenerUsuarios = async () => {
  const respuesta = await fetch(URL);
  if (respuesta.status === 404) return [];
  if (!respuesta.ok) throw new Error("No se pudieron cargar los usuarios");
  return respuesta.json();
};

export const registrarUsuario = async (usuario) => {
  const respuesta = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  if (!respuesta.ok) throw new Error("No se pudo registrar el usuario");
  return respuesta.json();
};

export const iniciarSesion = async (correo, password) => {
  const usuarios = await obtenerUsuarios();
  return usuarios.find(
    (u) =>
      u.correo.toLowerCase() === correo.toLowerCase() && u.password === password
  );
};

export const existeCorreo = async (correo) => {
  const usuarios = await obtenerUsuarios();
  return usuarios.some((u) => u.correo.toLowerCase() === correo.toLowerCase());
};
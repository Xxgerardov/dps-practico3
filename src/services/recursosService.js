import { API_URL } from "../config/api";

const URL = `${API_URL}/recursos`;

export const obtenerRecursos = async () => {
  const respuesta = await fetch(URL);
  if (respuesta.status === 404) return [];
  if (!respuesta.ok) throw new Error("No se pudieron cargar los recursos");
  return respuesta.json();
};

export const crearRecurso = async (recurso) => {
  const respuesta = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recurso),
  });
  if (!respuesta.ok) throw new Error("No se pudo crear el recurso");
  return respuesta.json();
};

export const actualizarRecurso = async (id, recurso) => {
  const respuesta = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recurso),
  });
  if (!respuesta.ok) throw new Error("No se pudo actualizar el recurso");
  return respuesta.json();
};

export const eliminarRecurso = async (id) => {
  const respuesta = await fetch(`${URL}/${id}`, { method: "DELETE" });
  if (!respuesta.ok) throw new Error("No se pudo eliminar el recurso");
  return respuesta.json();
};



export const calificarRecurso = async (id, usuarioId, valor) => {
  const respuesta = await fetch(`${URL}/${id}`);
  if (!respuesta.ok) throw new Error("No se pudo obtener el recurso");
  const recurso = await respuesta.json();
  const anteriores = Array.isArray(recurso.calificaciones)
    ? recurso.calificaciones
    : [];
  const calificaciones = [
    ...anteriores.filter((c) => String(c.usuarioId) !== String(usuarioId)),
    { usuarioId, valor },
  ];
  return actualizarRecurso(id, { ...recurso, calificaciones });
};
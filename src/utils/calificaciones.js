export const obtenerResumenCalificaciones = (calificaciones) => {
  const validas = Array.isArray(calificaciones)
    ? calificaciones.filter((c) => c && !isNaN(Number(c.valor)))
    : [];
  if (validas.length === 0) return { promedio: 0, total: 0 };
  const suma = validas.reduce((acumulado, c) => acumulado + Number(c.valor), 0);
  return { promedio: suma / validas.length, total: validas.length };
};


export const obtenerCalificacionUsuario = (calificaciones, usuarioId) => {
  if (!Array.isArray(calificaciones)) return 0;
  const encontrada = calificaciones.find(
    (c) => c && String(c.usuarioId) === String(usuarioId)
  );
  return encontrada ? Number(encontrada.valor) : 0;
};
export const validarPassword = (password) => {
  const errores = [];
  if (password.length < 12) errores.push("Mínimo 12 caracteres");
  if (!/[A-Z]/.test(password)) errores.push("Al menos una mayúscula");
  if (!/[a-z]/.test(password)) errores.push("Al menos una minúscula");
  if (!/[0-9]/.test(password)) errores.push("Al menos un número");
  if (!/[!@#$%^&*]/.test(password))
    errores.push("Al menos un carácter especial (! @ # $ % ^ & *)");
  return errores;
};

export const validarCorreo = (correo) => /\S+@\S+\.\S+/.test(correo);



export const validarUrl = (url) => /^https?:\/\/\S+\.\S+/.test(url);

export const validarRecurso = (datos) => {
  const errores = {};
  if (datos.titulo.trim().length < 3)
    errores.titulo = "El título debe tener al menos 3 caracteres";
  if (datos.descripcion.trim().length < 10)
    errores.descripcion = "La descripción debe tener al menos 10 caracteres";
  if (!datos.tipo) errores.tipo = "Selecciona un tipo";
  if (!validarUrl(datos.enlace.trim()))
    errores.enlace = "Ingresa una URL válida (http:// o https://)";
  if (!validarUrl(datos.imagen.trim()))
    errores.imagen = "Ingresa una URL de imagen válida (http:// o https://)";
  return errores;
};
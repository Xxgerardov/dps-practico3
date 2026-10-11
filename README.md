

**Este proyecto es:**
Es una app móvil hecha con expo y con react native que sirve como un espacio de aprendizaje en donde se tienen distintos docentes con capacidad de poder subir espacios como cursos, libros, videos y para que los alumnos tengan un espacio para aprender con posibilidad de guardar e dar su opinión acerca de los recursos de aprendizaje ayudando asi a dar una idea a los demás usuarios de que tan bueno mediante el promedio de estrellas, también pueden buscar e filtrar cursos a su antojo.



**Como funciona el proyecto?**

** 1) se comienza por el index.ts es el primero de todos y este le dice a expo que abra la app y se dirija a app.js


** 2) sigue app.js: arranca 3 acciones que son: 
El tema del color(será azul oscuro), ejecuta authcontext y la navegación esta decide que pantalla será la que se mostrara.


** 3) authcontext: revisa si en el celular ya hay una sesión iniciada y dependiendo de si la hay o no toma 1 de 2 caminos el programa. 


** 4) camino A (no hay sesión):

Saltaran 2 pantallas(opciones): 

1ro loginscreen: la persona escribe su email con su contraseña y se compararan con los datos de mock.io y si coincide dará acceso y si no coincide saltaran advertencias diciendo que el lo que pudo salir mal.

2do registroscreen: este apartado saltara si se le da a la opción crear cuenta o registrarse dentro de la pagina loginscreen y registroscreen servirá para crear una cuenta ósea registrarse como lo dice su nombre.


** 5) camino B (si hay sesión iniciada (también pasa cuando se inicia sesión por primera vez)): 

Se abrirá tabsprincipales esta es la barra de opciones que aparece abajo y este tab ira cambiando las opciones que posee según el rol del usuario que inicio sesión.


 ** 6) listarecursosscreen  pide los recursos a las API y los muestra en un espacio tipo tarjeta y luego estas tarjetas se pueden buscar en el buscador ya sea por su nombre, id o categoría dependiendo de la opción de búsqueda seleccionada, también se pueden ordenar de manera       “A a Z”, “Z a A” o id. 

También se posibilita el poder agregar la tarjeta que se desee a favoritas guardando determinada tarjeta(recurso) para el usuario que la haya añadido 

También posibilita calificar la tarjeta(recurso) que haya añadido el docente a cada alumno y la calificación en estrellas se guardara la calificación de cada usuario y se promediara entre todos los alumnos que hayan calificado.


** 7) GestionRecursosScreen(solo para docentes): apartir de aquí el docente tendrá la posibilidad de crear, borrar o editar un recurso(tarjeta) en formulariorecursoscreen(este además valida los campos antes de editarlos o añadirlos)


** 8) perfilscreen.js: muestra el nombre y ell rol del usuario y también el botón cerrar sesión este botón borra la sesión guardada y manda al usuario de vuelta a la pantalla loginscreen


Los archivos de la carpeta services son los que hablan con la API, las screen le piden a los services que hablen con estas APIS



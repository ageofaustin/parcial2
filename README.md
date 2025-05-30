# Parcial # 2 BookShelf

## Instrucciones
 ### Objetivos:

Aplicar conceptos de manipulación del DOM con JavaScript.

Implementar módulos organizados para el manejo de datos y vista.

Almacenar y recuperar información utilizando localStorage.

Aplicar lógica condicional y estructuras de control para validaciones.

Utilizar estilos visuales y gráficos sencillos para representar información.


 ## I. Resolver
Crear una página web con las siguientes funcionalidades:


1. Registro y login de libros leídos (30%)

Crear una vista de login (15%) y una vista de registro (15%) para un sistema de seguimiento de libros leídos por el usuario.

El registro debe almacenar: username, nombre completo, contraseña. Utilizar un algoritmo de hash como el que se muestra abajo para almacenar la contraseña en localStorage.

Si el usuario ya tiene sesión activa, debe redireccionarse automáticamente al dashboard.

Si el usuario no tiene sesión, cualquier ruta debe redirigirlo al login.


2. Dashboard de libros (30%)

Mostrar el nombre del usuario actualmente logueado.

Mostrar una tabla con los libros que ha leído. Cada libro debe tener: título, autor, fecha de lectura, número de páginas, y si lo recomendaría o no.

Permitir agregar y eliminar libros desde esta vista.

Al guardar un nuevo libro, debe persistir en localStorage.


3. Perfil del usuario (15%)

Mostrar el nombre y permitir editarlo.

Permitir cambiar la contraseña. Aplicar nuevamente el hash.


4. Estadísticas de lectura (20%)

Mostrar la cantidad total de libros leídos y el promedio de páginas por libro.

Dibujar un gráfico (de barras o pastel) que muestre:


Cantidad de libros que recomendaría vs los que no recomendaría.


5. Extras de validación (5%)

Validar que todos los campos estén llenos antes de guardar datos.

Validar que el usuario no pueda registrarse con un username ya existente.



Hash sugerido

```

function hashCode(str) {

    let hash = 0;

    for (let i = 0; i < str.length; i++) {

        let chr = str.charCodeAt(i);

        hash = (hash << 5) - hash + chr;

        hash |= 0; // Convierte a 32 bits

    }

    return hash;

}

```
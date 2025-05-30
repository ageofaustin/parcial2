import Session from "./session.js";
const Libros = (() => {
  const localStorageItems = {
    libros: "libros",
  };

  const metodos = {
    existeLibro(tituloLibro) {
      const key = localStorageItems.libros;
      const usuario = Session.getUsername();
      const libros = JSON.parse(localStorage.getItem(key)) || [];

      if (
        libros.find(
          (libro) =>
            libro.tituloLibro === tituloLibro && libro.usuario === usuario
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
  };

  return {
    agregarLibros(tituloLibro, autor, fechaInicio, numPags, recomendado) {
      const key = localStorageItems.libros;
      const usuario = Session.getUsername();
      const libroObj = {
        tituloLibro: tituloLibro,
        autor: autor,
        fechaInicio: fechaInicio,
        numPags: numPags,
        recomendado: recomendado,
        usuario: usuario,
      };
      if (metodos.existeLibro(tituloLibro)) {
        window.alert(`${libroObj.tituloLibro} ya fue agregado anteriormente`);
        return false;
      }

      const libros = JSON.parse(localStorage.getItem(key)) || [];
      libros.push(libroObj);
      localStorage.setItem(key, JSON.stringify(libros));
      return true;
    },

    getLibros() {
      const key = localStorageItems.libros;
      const libros = JSON.parse(localStorage.getItem(key));
      const usuario = Session.getUsername();

      return libros?.filter((it) => it.usuario === usuario);
    },
    borrarLibro(tituloLibro) {
      const key = localStorageItems.libros;
      const usuario = Session.getUsername();
      let libros = JSON.parse(localStorage.getItem(key)) || [];

      
      libros = libros.filter(
        (libro) =>
          !(libro.tituloLibro === tituloLibro && libro.usuario === usuario)
      );

      localStorage.setItem(key, JSON.stringify(libros));
      return true;
    },
  }; //Fin del Return
})();

export default Libros;

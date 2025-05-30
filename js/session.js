const Session = (() => {
  const localStorageItems = {
    users: "users",
    logged: "logged",
  };

  const metodos = {
    hashCode(str) {
      let hash = 0;

      for (let i = 0; i < str.length; i++) {
        let chr = str.charCodeAt(i);

        hash = (hash << 5) - hash + chr;

        hash |= 0; // Convierte a 32 bits
      }

      return hash;
    },
    existeUsuario(usuario1) {
      const key = localStorageItems.users;

      const usuarios = JSON.parse(localStorage.getItem(key)) || [];

      if (usuarios.find((it) => it.usuario === usuario1)) {
        return true;
      } else {
        return false;
      }
    },
    validacionDeContraseña(inputcontraseña, hashPassword) {
      const contraseña = metodos.hashCode(inputcontraseña);

      if (contraseña === hashPassword) {
        return true;
      } else {
        return false;
      }
    },
  };

  return {
    registrarUsuario(newnombreCompleto, newusuario, newcontraseña,newrepeatcontraseña) {
      const key = localStorageItems.users;
      const userObj = {
        usuario: newusuario,
        nombreCompleto: newnombreCompleto,
        contraseña: metodos.hashCode(newcontraseña),
      };
      
       if(newcontraseña!==newrepeatcontraseña){
         window.alert("Las Contraseñas No coinciden");
         return false;

       }

      const usuarios = JSON.parse(localStorage.getItem(key)) || [];

      if (metodos.existeUsuario(newusuario)) {
        window.alert("Usuario ya existente!");
        return false;
      } else {
        usuarios.push(userObj);
        localStorage.setItem(key, JSON.stringify(usuarios));
        window.alert("Registrado Existosamente");
        return true;
      }
    },

    inciarSesion(usuario, contraseña) {
      const key = localStorageItems.users;
      const logged = localStorageItems.logged;
      const usuarios = JSON.parse(localStorage.getItem(key)) || [];

      if (metodos.existeUsuario(usuario)) {
        console.log("existe usuario");
        const datoUsuario = usuarios.find((it) => it.usuario === usuario);
        console.log(datoUsuario);
        const contraseñaHashed = datoUsuario["contraseña"];

        if (metodos.validacionDeContraseña(contraseña, contraseñaHashed)) {
          console.log("contraseña correcta");
          localStorage.setItem(logged, JSON.stringify(datoUsuario));

          return true;
        }
      } else {
        return false;
      }
    },

    sesionIniciada() {
      const logged = localStorageItems?.logged;
      localStorage.getItem(logged) !== null
        ? true
        : (window.location.href = "index.html");
    },

    cerrarSesion() {
      const logged = localStorageItems?.logged;
      localStorage.removeItem(logged);
    },

    getNombreCompleto() {
      const logged = localStorageItems?.logged;

      const nombreCompleto = JSON.parse(localStorage.getItem(logged))[
        "nombreCompleto"
      ];

      return nombreCompleto;
    },

    getUsername() {
      const logged = localStorageItems?.logged;

      const usuario = JSON.parse(localStorage.getItem(logged))["usuario"];

      return usuario;
    },
    cambiarContraseña(nuevaContraseña,actualContraseña) {
      const key = localStorageItems.users;
      const logged = localStorageItems.logged;
      const usuarioActual = JSON.parse(localStorage.getItem(logged))["usuario"];
      const usuarioLog = JSON.parse(localStorage.getItem(logged));
      
      const usuarios = JSON.parse(localStorage.getItem(key)) || [];
      if (metodos.hashCode(actualContraseña) !== usuarioLog.contraseña) {
          window.alert("La contraseña actual no es correcta.");
          return false;
        }
      const idx = usuarios.findIndex((u) => u.usuario === usuarioActual);
      if (idx !== -1) {
        usuarios[idx].contraseña = metodos.hashCode(nuevaContraseña);
        localStorage.setItem(key, JSON.stringify(usuarios));

        
        const usuarioLog = JSON.parse(localStorage.getItem(logged));
        usuarioLog.contraseña = metodos.hashCode(nuevaContraseña);
        localStorage.setItem(logged, JSON.stringify(usuarioLog));
        return true;
      }
      return false;
    },
    modificarNombreCompleto(nuevoNombre) {
      const key = localStorageItems.users;
      const logged = localStorageItems.logged;
      const usuarioActual = JSON.parse(localStorage.getItem(logged))["usuario"];

      const usuarios = JSON.parse(localStorage.getItem(key)) || [];

      
      const idx = usuarios.findIndex((u) => u.usuario === usuarioActual);
      if (idx !== -1) {
        usuarios[idx].nombreCompleto = nuevoNombre;
        localStorage.setItem(key, JSON.stringify(usuarios));

        const usuarioLog = JSON.parse(localStorage.getItem(logged));
        usuarioLog.nombreCompleto = nuevoNombre;
        localStorage.setItem(logged, JSON.stringify(usuarioLog));
        return true;
      }
      return false;
    },
  }; //Fin del Return
})();

export default Session;

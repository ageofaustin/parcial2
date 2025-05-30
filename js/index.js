import Session from "./session.js";
(() => {
  const App = (() => {
    const htmlElements = {
      signinform: document.querySelector("#signin-form"),
      loginform: document.querySelector("#login-form"),
      showSigin: document.querySelector("#show-signin"),
      dialogRegistro: document.querySelector("#registerDialog"),
      closeSignin: document.querySelector("#close-signin"),
    };

    const handlers = {
      registrarUsuarioForm(f) {
        f.preventDefault();

        const newnombreCompleto =
          htmlElements.signinform["signin-fullname"].value;
        const newusuario = htmlElements.signinform["signin-username"].value;
        const newcontraseña = htmlElements.signinform["signin-password"].value;
        const newrepeatcontraseña = htmlElements.signinform['signin-repeatpassword'].value

        const registrarUsuario = Session.registrarUsuario(
          newnombreCompleto,
          newusuario,
          newcontraseña,
          newrepeatcontraseña
        );

        if (registrarUsuario) {
          console.log("Registrado");
          window.location.href = "index.html";
        } else {
          console.log("Nope");
        }
      },

      inciarSesion(f) {
        f.preventDefault();

        const usario = htmlElements.loginform["login-username"].value;
        const contraseña = htmlElements.loginform["login-password"].value;

        if (Session.inciarSesion(usario, contraseña)) {
          window.location.href = "dashboard.html";
        } else {
          window.alert("Usuario o Contraseña Incorrecta!");
        }
      },

      onClickOpenRegistar() {
        htmlElements.dialogRegistro.showModal();
      },

      onClickCerrarRegistrar() {
        htmlElements.dialogRegistro.close();
      },
    };

    return {
      init() {
        Session.cerrarSesion();

        htmlElements.signinform.addEventListener(
          "submit",
          handlers.registrarUsuarioForm
        );

        htmlElements.loginform.addEventListener(
          "submit",
          handlers.inciarSesion
        );

        htmlElements.showSigin.addEventListener(
          "click",
          handlers.onClickOpenRegistar
        );
        htmlElements.closeSignin.addEventListener(
          "click",
          handlers.onClickCerrarRegistrar
        );

        htmlElements.dialogRegistro.addEventListener("click", (e) => {
          if(!htmlElements.signinform.contains(e.target)){
            handlers.onClickCerrarRegistrar();
          }
        });
      },
    };
  })();
  App.init();
})();

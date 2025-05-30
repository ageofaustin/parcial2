import Session from "./session.js";
(() => {
  const App = (() => {
    const htmlElements = {
      nombreUsuario: document.querySelector("#nombre-Usuario"),
      cambiarNombreForm: document.querySelector("#cambiarNombreForm"),
      inputNombreActual: document.querySelector("#nombreActual"),
      cambiarContraseñaForm: document.querySelector("#cambiarContraseñaForm"),
      dropdown: document.querySelector("#dropdownBtn"),
      dropdownMenu: document.querySelector("#dropdownMenu"),

      editarNombreBtn: document.querySelector("#nombre-div button"),
      newNombre: document.querySelector("#newNombre"),
      popupOverlayCambiarNombre: document.querySelector(
        "#popupOverlayCambiarNombre"
      ),
      closePopupCambiarNombre: document.querySelector(
        "#popupOverlayCambiarNombre .close-btn"
      ),
      cambiarContraseñaBtn: document.querySelector("#Contraseña button"),
      popupOverlayCambiarContraseña: document.querySelector(
        "#popupOverlayCambiarContraseña"
      ),
      closePopupCambiarContraseña: document.querySelector(
        "#popupOverlayCambiarContraseña .close-btn"
      ),
    };
    const localStorageItems = {};

    const metodos = {
      mostrarNombreCompleto() {
        const nombre = Session.getNombreCompleto();
        const nombrehtmltag = htmlElements.nombreUsuario;
        const cambiarNombreHtmlTag = htmlElements.newNombre;

        nombrehtmltag.innerHTML = `${nombre}`;
        cambiarNombreHtmlTag.value = `${nombre}`;
      },

      cargarNombre() {
        const nombre = Session.getNombreCompleto();
        htmlElements.inputNombreActual.value = nombre;
      },
    };

    const handlers = {
      onCambiarNombre(f) {
        const nombreNuevo = htmlElements.cambiarNombreForm["newNombre"].value;

        Session.modificarNombreCompleto(nombreNuevo);
      },

      onCambiarContraseña(f) {
        f.preventDefault();
        const contraseñaNueva =
          htmlElements.cambiarContraseñaForm["newContraseña"].value;

          const actualContraseña=  htmlElements.cambiarContraseñaForm["actualContraseña"].value;
          const newrepeatpassword = htmlElements.cambiarContraseñaForm["newrepeatpassword"].value
          if(contraseñaNueva !== newrepeatpassword){
            window.alert("La contraseña nueva no coinciden")
            return
          }

        if (Session.cambiarContraseña(contraseñaNueva,actualContraseña)) {
          window.alert("Contraseña cambiada con exito");
            window.location.href = "perfil.html";
        }
      },
      onClickMenu(f) {
        
        htmlElements.dropdownMenu.classList.toggle("show");
      },

      onClickDocument(f) {
        if (!htmlElements.dropdownMenu.contains(f.target)) {
          htmlElements.dropdownMenu.classList.remove("show");
        }
      },
      mostrarPopupCambiarNombre() {
        htmlElements.popupOverlayCambiarNombre.showModal();
      },
      
      ocultarPopupCambiarNombre() {
        htmlElements.popupOverlayCambiarNombre.close();
      },
      
      mostrarPopupCambiarContraseña() {
        htmlElements.popupOverlayCambiarContraseña.showModal();
      },
     
      ocultarPopupCambiarContraseña() {
        htmlElements.popupOverlayCambiarContraseña.close();
      },
    };

    return {
      init() {
        Session.sesionIniciada();
        metodos.mostrarNombreCompleto();
        metodos.cargarNombre();

        htmlElements.cambiarNombreForm.addEventListener(
          "submit",
          handlers.onCambiarNombre
        );
        htmlElements.cambiarContraseñaForm.addEventListener(
          "submit",
          handlers.onCambiarContraseña
        );

        htmlElements.dropdown.addEventListener("click", handlers.onClickMenu);
        document.addEventListener("click", handlers.onClickDocument);

        htmlElements.editarNombreBtn.addEventListener(
          "click",
          handlers.mostrarPopupCambiarNombre
        );
        htmlElements.closePopupCambiarNombre.addEventListener(
          "click",
          handlers.ocultarPopupCambiarNombre
        );

        htmlElements.cambiarContraseñaBtn.addEventListener(
          "click",
          handlers.mostrarPopupCambiarContraseña
        );
        htmlElements.closePopupCambiarContraseña.addEventListener(
          "click",
          handlers.ocultarPopupCambiarContraseña
        );
    

        htmlElements.popupOverlayCambiarNombre.addEventListener("click", (e) => {
          if(!htmlElements.cambiarNombreForm.contains(e.target)){
            handlers.ocultarPopupCambiarNombre();
          }
        });

         htmlElements.popupOverlayCambiarContraseña.addEventListener("click", (e) => {
          if(!htmlElements.cambiarContraseñaForm.contains(e.target)){
            handlers.ocultarPopupCambiarContraseña();
          }
        });
        
      },
    };
  })();
  App.init();
})();

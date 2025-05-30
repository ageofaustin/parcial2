import Session from "./session.js";
import Libros from "./libros.js";
(() => {
  const App = (() => {
    const htmlElements = {
      nombreUsuario: document.querySelector("#nombre-Usuario"),
      addlibrosform: document.querySelector("#addlibrosform"),
      tablediv: document.querySelector("#talbe-div"),
      dropdown: document.querySelector("#dropdownBtn"),
      dropdownMenu: document.querySelector("#dropdownMenu"),
      showAddLibros: document.querySelector("#show-addlibros"),
      addLibrosPopup: document.querySelector("#addlibros-popup"),
      closeAddLibros: document.querySelector("#close-addlibros"),
      barsi: document.querySelector('#bar-si'),
      barNo: document.querySelector('.bar-no'),
      barLabelSi: document.querySelector(".bar-label-si"),
      barLabelNo: document.querySelector(".bar-label-no"),
      barChartContainer : document.querySelector('.bar-chart')
    };
    const localStorageItems = {};

    const metodos = {
      mostrarNombreCompleto() {
        const nombre = Session.getNombreCompleto();
        const nombrehtmltag = htmlElements.nombreUsuario;
        console.log(nombre);

        nombrehtmltag.innerHTML = `${nombre}`;
      },
      

     
      generateColumna(obj) {
        console.log(obj);
        return `
               <tr>
                        <td>${obj.tituloLibro}</td>
                        <td>${obj.autor || ""}</td>
                        <td>${obj.fechaInicio || ""}</td>
                        <td>${obj.numPags || ""}</td>
                        <td>${obj.recomendado || ""}</td>
                        <td><button>Eliminar</button></td>
                      </tr>
                    `;
      },

      generarTabla() {
        const librosUsuario = Libros.getLibros();
        console.log(librosUsuario);

        if (librosUsuario === undefined || librosUsuario.length === 0) {
          return `<p id="mensajeLibros"> No Libros Disponibles</p>`;
        } else {
          let table = "";
          let pagTotal = 0;
          let librosTotal = 0;

          librosUsuario.forEach((libro) => {
            table += metodos.generateColumna(libro);
            pagTotal = pagTotal + parseInt(libro.numPags);
            librosTotal++;
          });

          const estadisticaRow = `
               <tr>
                        <td>${librosTotal}</td>
                        <td>${Math.round(pagTotal / librosTotal)}</td>
                      </tr>
                    `;
          metodos.loadvaluesBarChart()
          return `
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Fecha de lectura</th>
                    <th>Número de páginas</th>
                    <th>¿Recomendaría?</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  ${table}
                </tbody>
              </table>

              <br> <br>
                <table>
                <thead>
                  <tr>
                    <th>Total de libros leídos</th>
                    <th>Promedio de páginas leídas</th>
                  </tr>
                </thead>
                <tbody>
                  ${estadisticaRow}
                </tbody>
              </table>

              <br> <br>

              `  ;
             
        }
      },

      cargarTabla() {
        htmlElements.tablediv.innerHTML = metodos.generarTabla();
        metodos.bindEvents();
      },
      removeRow(e) {
        const fila = e.target.closest("tr");
        if (!fila) return;

        const tituloLibro = fila.querySelector("td").textContent;

        Libros.borrarLibro(tituloLibro);

        fila.remove();
        window.location.reload();
      },
      bindEvents() {
        htmlElements.tablediv.querySelectorAll("button").forEach((b) => {
          b.addEventListener("click", metodos.removeRow);
        });
      },
      mostrarPopupAgregarLibro() {
        htmlElements.addLibrosPopup.showModal();
      },
      ocultarPopupAgregarLibro() {
       htmlElements.addLibrosPopup.close();
      },
      loadvaluesBarChart() {
        const librosUsuario = Libros.getLibros();
        let recomendados = 0;
        let noRecomendados = 0;
        
        librosUsuario.forEach((libro) => {
          if (libro.recomendado && libro.recomendado.toLowerCase() === "si") {
            recomendados++;
          } else {
            noRecomendados++;
          }
        });
        const total = recomendados + noRecomendados || 1;
        const porcentajeSi = (recomendados / total) * 100;
        const porcentajeNo = (noRecomendados / total) * 100;

        htmlElements.barsi.style.width =`${porcentajeSi}%`;
        htmlElements.barNo.style.width =`${porcentajeNo}%`;

        htmlElements.barLabelSi.innerHTML =`Si (${recomendados})`;
        htmlElements.barLabelNo.innerHTML =`No (${noRecomendados})`;
        htmlElements.barChartContainer.style.display="block";
      }
    };

    const handlers = {
      agregarLibroForm(f) {
        f.preventDefault();
        const form = htmlElements.addlibrosform;

        const tituloLibro = form["titulo"].value;
        const autor = form["autor"].value;
        const fechaInicio = form["fecha"].value;
        const numPags = form["numpags"].value;
        const recomendado = form["recomendado"].value;

        const agreado = Libros.agregarLibros(
          tituloLibro,
          autor,
          fechaInicio,
          numPags,
          recomendado
        );

        if (agreado) {
          window.location.reload();
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
    };

    return {
      init() {
        Session.sesionIniciada();
        metodos.mostrarNombreCompleto();
        metodos.cargarTabla();
       

        htmlElements.addlibrosform.addEventListener(
          "submit",
          handlers.agregarLibroForm
        );
        htmlElements.dropdown.addEventListener("click", handlers.onClickMenu);
        document.addEventListener("click", handlers.onClickDocument);

        htmlElements.showAddLibros.addEventListener(
          "click",
          metodos.mostrarPopupAgregarLibro
        );
        htmlElements.closeAddLibros.addEventListener(
          "click",
          metodos.ocultarPopupAgregarLibro
        );
        htmlElements.addLibrosPopup.addEventListener("click", (e) => {
          if(!htmlElements.addlibrosform.contains(e.target)){
            metodos.ocultarPopupAgregarLibro();
          }
        });


      },
    };
  })();
  App.init();
})();

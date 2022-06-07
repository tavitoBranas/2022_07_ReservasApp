window.addEventListener("load", onLoadAplicacion);

function onLoadAplicacion() {
  document
    .querySelector("#btnIngresar")
    .addEventListener("click", onClickIngresar);
  document.querySelector(".irSalir").addEventListener("click", onClickSalir);
  document
    .querySelector("#redireccionaAregistrar")
    .addEventListener("click", onClickHablitacionRegistro);
  document
    .querySelector("#btnRegistro")
    .addEventListener("click", onClickRegistrar);
  document
    .querySelector("#ctsRegistro")
    .addEventListener("onkeyup", validacionContraseña); //invento hay que ver si funciona
}

//Registro de nuevos usuarios

//Funcion para validacion de Nombre de usuario

function validacionUserName(userName) {
    for (i = 0; i <= userName.length - 1; i++) {
      if (userName[i] == "") {
        return "faltaIngreso";
      } else if (userName[i] == " ") {
        return "poseeEspacios";
      }
    }
    usuariosPersona.forEach(function (user) {
      if (user.usuario == userName) {
        return "existeNombreDeUsuario";
      }
    });
  }
  
  //Funcion validacion de contraseña, la persona escribe y se despliega un msj
  /* miIngreso.onkeyup = function () Esto esta vinculado a onClickRegistrar,ya lo asocie a otra f(x) en onLoad */
  banderaMayuscula = false;
  banderaMinuscula = false;
  banderaNumeros = false;
  
  function validacionContraseña(contraseña) {
    for (i = 0; i <= contraseña.length - 1; i++) {
      //problemas con los cambios de color para mayus minus y numeros, cuando no me acepta dsp los colores no cambian de verde a rojo
  
      //caractermayusculas
      if (
        contraseña[i].charCodeAt() >= 65 &&
        contraseña[i].charCodeAt() <= 90 &&
        !banderaMayuscula
      ) {
        letraMay.classList.remove("no");
        letraMay.classList.add("si");
        banderaMayuscula = true;
      } else if (banderaMayuscula) {
        letraMay.classList.remove("si");
        letraMay.classList.add("no");
      }
  
      //caracterminusculas
      if (
        contraseña[i].charCodeAt() >= 97 &&
        contraseña[i].charCodeAt() <= 122 &&
        !banderaMinuscula
      ) {
        letraMin.classList.remove("no");
        letraMin.classList.add("si");
        banderaMinuscula = true;
      } else if (banderaMinuscula) {
        letraMin.classList.remove("si");
        letraMin.classList.add("no");
      }
  
      //validacion numeros
      if (
        contraseña[i].charCodeAt() >= 48 &&
        contraseña[i].charCodeAt() <= 57 &&
        !banderaNumeros
      ) {
        num.classList.remove("no");
        num.classList.add("si");
        banderaNumeros = true;
      } else if (banderaNumeros) {
        num.classList.remove("si");
        num.classList.add("no");
      }
  
      //validacion de longitud
  
      if (contraseña.length >= 6) {
        largoMin.classList.remove("no");
        largoMin.classList.add("si");
      } else {
        largoMin.classList.remove("si");
        largoMin.classList.add("no");
      }
  
      if (contraseña.length <= 12) {
        largoMax.classList.remove("no");
        largoMax.classList.add("si");
      } else {
        largoMax.classList.remove("si");
        largoMax.classList.add("no");
      }
    }
  }
  
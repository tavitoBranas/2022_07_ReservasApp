/*Funcion para ocultar o mostrar secciones de HTML*/
function cambioVisibilidad(tipo, id, habilitacion) {
  document.querySelector(tipo + id).style.display = habilitacion;
}

/*funcion para eliminacion de espacios en blanco*/
function eliminarEspacios(frase) {
  let mensaje = "";
  if (frase.length > 0) {
    let indexMaxConEspacios = frase.length - 1;
    if (frase.length != 0) {
      for (i = 0; i <= indexMaxConEspacios; i++) {
        if (frase[i] != " ") {
          mensaje += frase[i];
        }
      }
      return mensaje;
    }
  }
}

/*Funcion para ingreso de usuarios: dos usuarios diferentes (persona/local)*/
function validarIngreso(usuario, contraseña) {
  let miUsuario = null;
  for (i = 0; i <= usuariosPersona.length - 1; i++) {
    if (
      usuario == usuariosPersona[i].usuario &&
      usuariosPersona[i].contraseña == contraseña
    ) {
      miUsuario = usuariosPersona[i];
    }
  }
  for (i = 0; i <= usuariosLocal.length - 1; i++) {
    if (
      usuario == usuariosLocal[i].usuario &&
      contraseña == usuariosLocal[i].contraseña
    ) {
      miUsuario = usuariosLocal[i];
    }
  }
  return miUsuario;
}

/*Registro de nuevos usuarios*/

//validacion espacio vacio en nombre y apellido
function validacionIngresoNombreApellido(nombreYapellido) {
  let usuarioConfirmado = "";
  for (i = 0; i <= nombreYapellido.length - 1; i++) {
    if (
      (nombreYapellido[i] == " " && nombreYapellido[i + 1] != " ") ||
      nombreYapellido[i] != " "
    ) {
      usuarioConfirmado += nombreYapellido[i];
    }
  }
  for (i = 0; i < usuarioConfirmado.length - 1; i++) {
    if (usuarioConfirmado[i] == " " && usuarioConfirmado[i + 1] != " ") {
      return true;
    }
  }
}

//Funcion para validacion de Nombre de usuario
function validacionUserName(userName) {
  if (userName.length < 1) {
    return "faltaIngreso";
  }
  for (i = 0; i <= userName.length - 1; i++) {
    if (userName[i] == "") {
      return "faltaIngreso";
    } else if (userName[i] == " ") {
      return "poseeEspacios";
    }
  }
  for (i = 0; i <= usuariosPersona.length - 1; i++) {
    if (userName == usuariosPersona[i].usuario) {
      return "existeNombreDeUsuario";
    }
  }
}

//Funcion validacion de contraseña, la persona escribe y se despliega un msj
function validacionContraseña(contraseña) {
  let banderaNumeros = true; //cuando encuentra elemento buscado, se baja
  let banderaMayusculas = true;
  let banderaMinusculas = true;
  for (i = 0; i <= contraseña.length - 1; i++) {
    //caractermayusculas
    if (contraseña[i].charCodeAt() >= 65 && contraseña[i].charCodeAt() <= 90) {
      letraMay.classList.remove("no");
      letraMay.classList.add("si");
      banderaMayusculas = false;
    } else if (banderaMayusculas) {
      letraMay.classList.remove("si");
      letraMay.classList.add("no");
    }
    //caracterminusculas
    if (contraseña[i].charCodeAt() >= 97 && contraseña[i].charCodeAt() <= 122) {
      letraMin.classList.remove("no");
      letraMin.classList.add("si");
      banderaMinusculas = false;
    } else if (banderaMinusculas) {
      letraMin.classList.remove("si");
      letraMin.classList.add("no");
    }
    //validacion numeros
    if (contraseña[i].charCodeAt() >= 48 && contraseña[i].charCodeAt() <= 57) {
      num.classList.remove("no");
      num.classList.add("si");
      banderaNumeros = false;
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
  //retorno a la funcion para validar contraseña OK
  if (
    !banderaNumeros &&
    !banderaMayusculas &&
    !banderaMinusculas &&
    contraseña.length >= 6 &&
    contraseña.length <= 12
  ) {
    return true;
  }
  //reinicio para control al ingresar o eliminar letras
  banderaNumeros = true;
  banderaMayusculas = true;
  banderaMinusculas = true;
  if (contraseña.length == 0) {
    removerValidacionContraseña();
  }
}

function removerValidacionContraseña() {
  largoMax.classList.remove("si");
  largoMax.classList.add("no");
  largoMin.classList.remove("si");
  largoMin.classList.add("no");
  num.classList.remove("si");
  num.classList.add("no");
  letraMin.classList.remove("si");
  letraMin.classList.add("no");
  letraMay.classList.remove("si");
  letraMay.classList.add("no");
  document.querySelector("#ctsRegistro").value = "";
  document.querySelector("#txtNamLastNam").value = "";
  document.querySelector("#txtUserName").value = "";
}

//Funcion asignacion id de nuevo usuario
function asignacionId() {
  let listaId = [];
  let maximo = 0;
  usuariosPersona.forEach(function (user) {
    listaId.push(user.id);
  });
  for (i = 0; i <= listaId.length - 1; i++) {
    if (maximo < Number(listaId[i])) {
      maximo = Number(listaId[i]);
    }
  }
  return (maximo + 1).toString();
}

/*Personalizado de alerts*/
function mensajesAlerta(str, accion) {
  if (accion == "alerta") {
    swal("Ups tenemos problemas", str, "error");
  } else if (accion == "confirmacion") {
    swal("Perfecto", str, "success", { buttons: false, timer: 3000 });
  } else if (accion == "consultaAccion") {
    swal(str, {
      buttons: ["Confirmar", "Cancelar"],
    });
  } else if (accion == "bienvenida") {
    swal({
      title: "Bienvenido",
      text: str,
      buttons: false,
      timer: 3000,
    });
  }
}

/*Funcion de retorno a Ingreso desde Registro de nuevo usuario*/
function retornoAingreso() {
  cambioVisibilidad(".", "seleccionIngresar", "block");
  cambioVisibilidad(".", "seleccionRegistro", "none");
  document.querySelector("#txtUserName").value = "";
  document.querySelector("#txtNamLastNam").value = "";
  document.querySelector("#ctsRegistro").value = "";
}

/*Funcion para eliminar ingresos en etapa de registro*/
function borrarDatos() {
  document.querySelector("#ctsRegistro").value = "";
  document.querySelector("#ctsIngreso").value = "";
}

/*Funcion para ir a diferentes menues al hacer click*/
function modificarMenu(str) {
  cambioVisibilidad(".", "paginaPrincipalLocal", "none");
  cambioVisibilidad(".", "paginaPrincipalPersona", "none");
  cambioVisibilidad(".", "estadisticasPersona", "none");
  cambioVisibilidad(".", "estadisticasLocal", "none");
  cambioVisibilidad(".", "disponibilidad", "none");
  cambioVisibilidad(".", "cambiarEstadoReservas", "none");
  cambioVisibilidad(".", "modificacionCupos", "none");
  cambioVisibilidad(".", "realizarReservas", "none");
  cambioVisibilidad(".", "cancelacionReservas", "none");
  cambioVisibilidad(".", "listadoReservas", "none");
  cambioVisibilidad(".", "calificacionReservas", "none");

  if (str == "irReservacion") {
    cambioVisibilidad(".", "realizarReservas", "block");
  } else if (str == "irCancelacion") {
    cambioVisibilidad(".", "cancelacionReservas", "block");
  } else if (str == "irListadoReservas") {
    cambioVisibilidad(".", "listadoReservas", "block");
  } else if (str == "irCalificacion") {
    cambioVisibilidad(".", "calificacionReservas", "block");
  } else if (str == "irEstadisticasPersona") {
    cambioVisibilidad(".", "estadisticasPersona", "block");
  } else if (str == "irMenuPrincipalPersona") {
    cambioVisibilidad(".", "paginaPrincipalPersona", "block");
  }

  if (str == "irHabilitacion") {
    cambioVisibilidad(".", "disponibilidad", "block");
  } else if (str == "irEstadoReservas") {
    cambioVisibilidad(".", "cambiarEstadoReservas", "block");
  } else if (str == "irCupos") {
    cambioVisibilidad(".", "modificacionCupos", "block");
  } else if (str == "irEstadisticasLocal") {
    cambioVisibilidad(".", "estadisticasLocal", "block");
  } else if (str == "irMenuPrincipalLocal") {
    cambioVisibilidad(".", "paginaPrincipalLocal", "block");
  }
}

/*Funcion que se activa al salir*/
function onClickSalir() {
  modificarMenu("salir");
  cambioVisibilidad(".", "seleccionIngresar", "block");
  cambioVisibilidad(".", "menuPrincipalPersona", "none");
  cambioVisibilidad(".", "menuPrincipalLocal", "none");
  cambioVisibilidad(".", "header", "none");
  document.querySelector("#txtBusquedaUSU").value = "";
  document.querySelector("#ctsIngreso").value = "";
}

window.addEventListener("load", onLoadAplicacion);

function onLoadAplicacion() {
  document
    .querySelector("#btnIngresar")
    .addEventListener("click", onClickIngresar);
  document
    .querySelector("#redireccionaAregistrar")
    .addEventListener("click", onClickHablitacionRegistro);
  document
    .querySelector("#btnRegistro")
    .addEventListener("click", onClickRegistrar);
}

//Variables globales
let miUsuario = null;

//Ingreso a la aplicación
function onClickIngresar(e) {
  e.preventDefault();
  //elimino espacios en blanco
  let usuario = eliminarEspacios(
    document.querySelector("#txtBusquedaUSU").value.toLowerCase()
  );
  let contraseña = document.querySelector("#ctsIngreso").value;

  if (usuario == "" || contraseña == "") {
    mensajesAlerta("Por favor complete campos para el ingreso", "alerta");
  } else if (validarIngreso(usuario, contraseña) != null) {
    miUsuario = validarIngreso(usuario, contraseña);
    mensajesAlerta(miUsuario.nombreCompleto, "bienvenida");
    cambioVisibilidad(".", "header", "block");
    cambioVisibilidad(".", "seleccionIngresar", "none");
    document.querySelector("#nombreUsuario").innerHTML =
      "Usuario activo: " + "<i><b>" + miUsuario.nombreCompleto + "</i></b>";

    if (miUsuario.tipo == "persona") {
      cambioVisibilidad(".", "menuPrincipalPersona", "block");
      cambioVisibilidad("#", "paginaPrincipalPersona", "block");
    } else {
      cambioVisibilidad(".", "menuPrincipalLocal", "block");
      cambioVisibilidad("#", "paginaPrincipalLocal", "block");
    }
  } else {
    mensajesAlerta(
      "No coincide la Contraseña con el registro del Usuario ingresado. Por favor, corrobore sus datos",
      "alerta"
    );
    borrarDatos();
  }
}

//Acceso a la seccion registro
function onClickHablitacionRegistro() {
  cambioVisibilidad(".", "seleccionRegistro", "block");
  cambioVisibilidad(".", "seleccionIngresar", "none");
}

//Creacion de uruario nuevo
function onClickRegistrar() {
  let preValidacion1 = false;
  let preValidacion2 = false;
  //se evalua que nombre y apellido este ingresado, si esto esta OK se da paso a Nombre de usuario
  if (
    !validacionIngresoNombreApellido(
      document.querySelector("#txtNamLastNam").value.toLowerCase()
    )
  ) {
    mensajesAlerta(
      "Por favor ingrese Nombre y Apellido para continuar",
      "alerta"
    );
    borrarDatos();
  } else {
    preValidacion1 = true;
  }

  //Validacion nombre de usuario
  //validacion falta ingreso de Nombre de usuario
  if (
    preValidacion1 == true &&
    validacionUserName(document.querySelector("#txtUserName").value) ==
      "faltaIngreso"
  ) {
    mensajesAlerta(
      "Por favor, ingrese Nombre de usuario para continuar",
      "alerta"
    );
    removerValidacionContraseña();
    borrarDatos();
  }
  //validacion espacios en Nombre de usuario
  else if (
    preValidacion1 == true &&
    validacionUserName(document.querySelector("#txtUserName").value) ==
      "poseeEspacios"
  ) {
    mensajesAlerta(
      "El Nombre de usuario no puede contener espacios. Por favor, corrija para continuar",
      "alerta"
    );
    removerValidacionContraseña();
    borrarDatos();
  }
  //validacion no existencia de Nombre de usuario
  else if (
    preValidacion1 == true &&
    validacionUserName(
      document.querySelector("#txtUserName").value.toLowerCase()
    ) == "existeNombreDeUsuario"
  ) {
    mensajesAlerta(
      "El Nombre de usuario ya existe. Por favor, seleccione uno diferente",
      "alerta"
    );
    removerValidacionContraseña();
    borrarDatos();
  } else {
    preValidacion2 = true;
  }
  //validacion de que la contraseña sea OK
  if (
    preValidacion1 &&
    preValidacion2 &&
    !validacionContraseña(document.querySelector("#ctsRegistro").value)
  ) {
    mensajesAlerta(
      "Por favor, corrobore el cumplimiento de las condiciones exigidas para la contraseña",
      "alerta"
    );
    removerValidacionContraseña();
    borrarDatos();
  } else if (
    preValidacion1 &&
    preValidacion2 &&
    validacionContraseña(document.querySelector("#ctsRegistro").value)
  ) {
    //Pusheo al registro usuarioPersona
    usuariosPersona.push(
      new registroPersona(
        asignacionId(),
        document.querySelector("#txtNamLastNam").value.toLowerCase(),
        document.querySelector("#txtUserName").value,
        document.querySelector("#ctsRegistro").value
      )
    );
    //Modifico lo ingresado para dejarlo borrar el contenido ingresado
    mensajesAlerta("Registro exitoso. Ingrese a continuacion", "confirmacion");
    borrarDatos();
    document.querySelector("#txtNamLastNam").value = "";
    document.querySelector("#txtUserName").value = "";
    document.querySelector("#ctsRegistro").value = "";
    removerValidacionContraseña();
    cambioVisibilidad(".", "seleccionIngresar", "block");
    cambioVisibilidad(".", "seleccionRegistro", "none");
  }
}

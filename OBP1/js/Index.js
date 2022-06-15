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
//miUsuario = usuariosLocal[0]; //variable de prueba

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
    cargarAlIngresar();
    document.querySelector("#tablaComparacionEstadisticasLocal").innerHTML = ""; //resetear la pantalla de estadisticas

    finalizarReservas();

    if (miUsuario.tipo == "persona") {
      cambioVisibilidad(".", "menuPrincipalPersona", "block");
      cambioVisibilidad("#", "paginaPrincipalPersona", "block");
      estadisticaPersona();
      reservasPendientesPersona();
    } else {
      cambioVisibilidad(".", "menuPrincipalLocal", "block");
      cambioVisibilidad("#", "paginaPrincipalLocal", "block");
      for (i = 0; i <= usuariosLocal.length - 1; i++) {
        calificacionDeLocales(usuariosLocal[i].id);
      }
      estadisticasLocal();
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

// Cambio disponibilidad de reservas Usuario: Local
function modificarDisponibilidad() {
  if (
    miUsuario.habilitado == true &&
    document.querySelector("#disponibilidad").value == "H"
  ) {
    mensajesAlerta(
      "La opción HABILITADO ya se encuentra seleccionada",
      "aceptacionOcancelacion"
    );
  } else if (
    miUsuario.habilitado == false &&
    document.querySelector("#disponibilidad").value == "D"
  ) {
    mensajesAlerta(
      "La opción DESHABILITADO ya se encuentra seleccionada",
      "aceptacionOcancelacion"
    );
  } else if (
    miUsuario.cuposDisponibles != miUsuario.cuposMaximos &&
    document.querySelector("#disponibilidad").value == "D"
  ) {
    mensajesAlerta(
      "La opcion de DESHABILITAR no se encuentra disponible ya que existen reservas en estado Pendiente. Consultar ESTADO DE RESERVAS",
      "alerta"
    );
  } else {
    if (document.querySelector("#disponibilidad").value == "D") {
      swal({
        text: "¿Está seguro que desea DESHABILITAR la posibilidad de realizar reservas?",
        icon: "warning",
        buttons: true,
        buttons: ["Cancelar", "Confirmar"],
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
      }).then((resultadoSeleccion) => {
        if (resultadoSeleccion || resultadoSeleccion != null) {
          document.querySelector("#msjHabilitacionReserva").innerHTML =
            "<i>Actualmente las reservas se encuentran <b>DESHABILITADAS</b></i>";
          mensajesAlerta(
            "Se ha confirmado su selección",
            "aceptacionOcancelacion"
          );
          miUsuario.habilitado = false;
        } else if (resultadoSeleccion === null) {
          mensajesAlerta(
            "Se ha cancelado la seleccion",
            "aceptacionOcancelacion"
          );
        }
      });
    } else if (document.querySelector("#disponibilidad").value == "H") {
      swal({
        text: "¿Está seguro que desea HABILITAR la posibilidad de realizar reservas?",
        icon: "warning",
        buttons: true,
        buttons: ["Cancelar", "Confirmar"],
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
      }).then((resultadoSeleccion) => {
        if (resultadoSeleccion || resultadoSeleccion != null) {
          document.querySelector("#msjHabilitacionReserva").innerHTML =
            "<i>Actualmente las reservas se encuentran <b>HABILITADAS</b></i>";
          mensajesAlerta(
            "Se ha confirmado su selección",
            "aceptacionOcancelacion"
          );
          miUsuario.habilitado = true;
        } else if (resultadoSeleccion === null) {
          mensajesAlerta(
            "Se ha cancelado la seleccion",
            "aceptacionOcancelacion"
          );
        }
      });
    } else {
      mensajesAlerta(
        "Por favor, seleccione opción para continuar",
        "aceptacionOcancelacion"
      );
    }
  }
}

//Modificacion de cupos de reservas Usuario: Local
function modificacionCupos() {
  strNumerico = document.querySelector("#nuevoCupo").value;
  let validacion =
    strNumerico != "" && !isNaN(strNumerico) && Number(strNumerico) >= 0;
  if (validacion) {
    if (miUsuario.cuposDisponibles == miUsuario.cuposMaximos) {
      swal({
        text: "¿Está seguro que desea modificar el CUPO MAXIMO permitido?",
        icon: "warning",
        buttons: true,
        buttons: ["Cancelar", "Confirmar"],
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
      }).then((resultadoSeleccion) => {
        if (resultadoSeleccion || resultadoSeleccion != null) {
          miUsuario.cuposMaximos = Number(strNumerico);
          miUsuario.cuposDisponibles = Number(strNumerico);
          document.querySelector(
            "#msjCuposActuales"
          ).innerHTML = `Actualmente el <b>CUPO MAXIMO PERMITIDO</b> es de <b>${miUsuario.cuposMaximos} </b>personas.`;
          mensajesAlerta(
            "Operación realizada exitosamente",
            "aceptacionOcancelacion"
          );
        } else if (resultadoSeleccion === null) {
          mensajesAlerta(
            "Se ha cancelado el cambio de cupos",
            "aceptacionOcancelacion"
          );
        }
      });
      document.querySelector("#nuevoCupo").value = "";
    } else {
      mensajesAlerta(
        `Actualemente no se puede modificar el CUPO MAXIMO ya que el local cuenta con RESERVAS en estado PENDIENTE. 
        Por favor, consultar ESTADO DE RESERVAS`,
        "alerta"
      );
      document.querySelector("#nuevoCupo").value = "";
    }
  } else {
    mensajesAlerta(
      "Por favor ingrese un numero entero, comenzado desde cero",
      "alerta"
    );
    document.querySelector("#nuevoCupo").value = "";
  }
}

/*Funcion para cargar tabla en Cambio de estado de reservas y finalizar las mismas*/

//buscador de personas
function buscarPersona() {
  const persona = document
    .querySelector("#busquedaClientes")
    .value.toLowerCase();
  if (persona != "") {
    if (coincidenciasPersona(persona) != -1) {
      finalizarReservas(coincidenciasPersona(persona));
    } else {
      mensajesAlerta("No se encontraron coincidencias", "alerta");
    }
  } else {
    document.querySelector("#busquedaClientes").value = ""; //reseteo input para el buscador
    document.querySelector("#finalizacionReservas").innerHTML = "";
    finalizarReservas();
    mensajesAlerta("Ingrese persona a buscar", "aceptacionOcancelacion");
  }
}

//si hay reservas pendientes genero tabla y botones para finalizar
function finalizarReservas(arrayAbuscar) {
  document.querySelector("#finalizacionReservas").innerHTML = ""; //vacio la tabla de reservas
  if (miUsuario.cuposDisponibles != miUsuario.cuposMaximos) {
    cambioVisibilidad("#", "tableCambioReserva", "block");
    cambioVisibilidad("#", "msjSinReserva", "none");
    cambioVisibilidad("#", "buscadorPersona", "block");

    const tableBody = document.querySelector("#finalizacionReservas");

    reservasPendientes(tableBody, arrayAbuscar);

    document.querySelectorAll(".btnCambioReserva").forEach(function (reserva) {
      reserva.addEventListener("click", onClickCambioEstado);
    });
  }
}

//Funcion para confirmacion y cambio de estado de las reservas
function onClickCambioEstado(e) {
  e.preventDefault();
  swal({
    //funcion para confirmacion de cambio
    text: `¿Está seguro que desea modificar el ESTADO de la reserva seleccionada?`,
    icon: "warning",
    buttons: true,
    buttons: ["Cancelar", "Confirmar"],
    confirmButtonText: "Confirmar",
    denyButtonText: "Cancelar",
  }).then((resultadoSeleccion) => {
    if (resultadoSeleccion || resultadoSeleccion != null) {
      //modificacion de cambio de estado ligada a la decision de arriba
      const idModificarEstadoReserva = this.getAttribute("data-button"); //obtengo el id de la reserva
      reservas.forEach(function (reserva) {
        if (
          reserva.id == idModificarEstadoReserva //compruebo que el id es el mismo para hacer los cambios en la reserva
        ) {
          reserva.status = "FINALIZADO";
          miUsuario.cuposDisponibles =
            miUsuario.cuposDisponibles + Number(reserva.cupos);
          cargarAlIngresar();
        }
      });
      document.querySelector("#busquedaClientes").value = ""; //reseteo el buscador
      document.querySelector("#finalizacionReservas").innerHTML = ""; //vacio la tabla para cargarla nuevamente
      finalizarReservas();
      mensajesAlerta(
        "Se ha realizado exitosamente el cambio de ESTADO",
        "aceptacionOcancelacion"
      );
    }
    if (miUsuario.cuposDisponibles == miUsuario.cuposMaximos) {
      cambioVisibilidad("#", "tableCambioReserva", "none");
      cambioVisibilidad("#", "msjSinReserva", "block");
      cambioVisibilidad("#", "buscadorPersona", "none");
    } else if (resultadoSeleccion === null) {
      mensajesAlerta(
        "Se ha cancelado el cambio de ESTADO",
        "aceptacionOcancelacion"
      );
    }
  });
}

/*Funcion para Estadisticas Local*/

function estadisticasLocal() {
  //estadisticas del local
  const bodyEstadisticas = document.querySelector("#tablaEstadisticasLocal");
  estadisticas(bodyEstadisticas);

  //estadisticas en comparacion con otros locales
  const bodyComparacion = document.querySelector(
    "#tablaComparacionEstadisticasLocal"
  );
  estadisticasComparativas(bodyComparacion);
}

/*Funcion estadistica persona*/
function estadisticaPersona() {
  //involucrado en la impresion de la estadistica de la persona
  const bodyEstadisiticasPersona = document.querySelector(
    "#tablaEstadisticasPersona"
  );

  //involucrado en la impresion del local con mayor reservas de la persona
  const divLocalMayorReservas = document.querySelector(
    "#mayorCantidadReservas"
  );

  tablaEstadisticaPersona(bodyEstadisiticasPersona, divLocalMayorReservas);
}

function reservasPendientesPersona() {
  const reservasRestaurant = document.querySelector("#reservasRestaurant");
  const reservasTeatro = document.querySelector("#reservasTeatro");
  const reservasMuseo = document.querySelector("#reservasMuseo");

  tablaReservasPendientes(reservasRestaurant, reservasTeatro, reservasMuseo);
}

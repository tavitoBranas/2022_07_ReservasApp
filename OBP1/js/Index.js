window.addEventListener("load", onLoadAplicacion);

function onLoadAplicacion() {
  document
    .querySelector("#btnIngresar")
    .addEventListener("click", onClickIngresar); //ingreso a la aplicación
  document
    .querySelector("#redireccionaAregistrar")
    .addEventListener("click", onClickHablitacionRegistro); //acceso a seccion registro
  document
    .querySelector("#btnRegistro")
    .addEventListener("click", onClickRegistrar); //registro de nuevo usuario Persona
}
/////////////////////////////////////////    VARIABLES GLOBALES  //////////////////////////////////////////
let miUsuario = null;
///////////////////////    F02 – Ingresar en la aplicación - Usuarios: Local y Persona  //////////////////////////////
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
    finalizarReservas();
    if (miUsuario.tipo == "persona") {
      cambioVisibilidad(".", "menuPrincipalPersona", "block");
      cambioVisibilidad("#", "paginaPrincipalPersona", "block");
      estadisticaPersona();
      reservasPendientesPersona();
      cancelacionReservas();
      calificacionLocales();
      //no se incluye función de reserva de locales, su lógica se aplica desde otra perspectiva
    } else {
      cambioVisibilidad(".", "menuPrincipalLocal", "block");
      cambioVisibilidad("#", "paginaPrincipalLocal", "block");
      for (i = 0; i <= usuariosLocal.length - 1; i++) {
        calificacionDeLocales(usuariosLocal[i].id);
      }
      estadisticasLocal();
    }
    //cargo al usuario activo en el header
    document.querySelector("#nombreUsuario").innerHTML =
      "Usuario activo: " + "<i><b>" + miUsuario.nombreCompleto + "</i></b>";
  } else {
    mensajesAlerta(
      "No coincide la Contraseña con el registro del Usuario ingresado. Por favor, corrobore sus datos",
      "alerta"
    );
    borrarDatos();
  }
}
////////////////////////////    F01 – Registrarse en la aplicación - Usuario: Persona  ///////////////////////////
//funcion que manda al usuario desde el menu Ingreso al menu Registro
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
      new RegistroPersona(
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
//////////////////////    F04 – Habilitar y Deshabilitar disponibilidad - Usuario: Local  /////////////////////////////
// Cambio disponibilidad de reservas Usuario: Local
function modificarDisponibilidad() {
  if (
    //evaluo si se esta intentando cambiar la opción por la ya seleccionada. Si es así se obtiene error
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
    //se evalua la posibilidad de cambiar el estado a Deshabilitado. Si existen reservas en estado Pendiente se obtiene error
    //las reservas se evaluan comparando los cupos disponibles y los maximos para miUsuario en este caso Local
    miUsuario.cuposDisponibles != miUsuario.cuposMaximos &&
    document.querySelector("#disponibilidad").value == "D"
  ) {
    mensajesAlerta(
      "La opcion de DESHABILITAR no se encuentra disponible ya que existen reservas en estado Pendiente. Consultar ESTADO DE RESERVAS",
      "alerta"
    );
  } else {
    //si no hay reservas Pendientes, se da paso a la posibilidad de realizar el cambio a Deshabilitado
    if (document.querySelector("#disponibilidad").value == "D") {
      //Oportunidad de mejora: trabajar estos swal desde una función y no en cada opción de los if
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
    } //a continuacion el codigo que permite habiitar las reservas
    else if (document.querySelector("#disponibilidad").value == "H") {
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
    } //si la opción es la default, se obtiene este mensaje de error
    else {
      mensajesAlerta(
        "Por favor, seleccione opción para continuar",
        "aceptacionOcancelacion"
      );
    }
  }
  document.querySelector("#disponibilidad").value = "default";
}
//////////////////////    F05 – Cambiar reservas de estado - Usuario: Local  /////////////////////////////
//buscador de personas según str ingresado
function buscarPersona() {
  const persona = document
    .querySelector("#busquedaClientes")
    .value.toLowerCase();
  if (persona != "") {
    if (coincidenciasPersona(persona) != -1) {
      //si se encuentran personas con reservas Pendientes para el local activo
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
//si hay reservas pendientes genero tabla y botones para finalizar las reservas
function finalizarReservas(arrayAbuscar) {
  document.querySelector("#busquedaClientes").value = "";
  document.querySelector("#finalizacionReservas").innerHTML = ""; //vacio la tabla de reservas
  if (miUsuario.cuposDisponibles != miUsuario.cuposMaximos) {
    //cambio de visibilidad de menus si existen reservas pendientes.
    //Default: mensaje que indica que no hay reservas Pendientes (estado block)
    cambioVisibilidad("#", "tableCambioReserva", "block");
    cambioVisibilidad("#", "msjSinReserva", "none");
    cambioVisibilidad("#", "buscadorPersona", "block");

    const tableBody = document.querySelector("#finalizacionReservas");
    //funcion que permite generar la tabla dinámica con las reservas en estado Pendiente
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
      //modificacion de cambio de estado ligada a la decision de arriba.
      //En este caso la opción es Confirmada
      const idModificarEstadoReserva = this.getAttribute("data-button"); //obtengo el id de la reserva
      reservas.forEach(function (reserva) {
        if (
          reserva.id == idModificarEstadoReserva //compruebo que el id es el mismo para hacer los cambios en la reserva
        ) {
          reserva.status = "FINALIZADO";
          miUsuario.cuposDisponibles =
            miUsuario.cuposDisponibles + Number(reserva.cupos);
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
      //si se cancela la posibilidad de cambio de estado
      mensajesAlerta(
        "Se ha cancelado el cambio de ESTADO",
        "aceptacionOcancelacion"
      );
    }
  });
}
/////////////////////    F06 – Modificar cupos máximos - Usuario: Local  //////////////////////////////////////////
//Modificacion de cupos de reservas Usuario: Local
function modificacionCupos() {
  strNumerico = document.querySelector("#nuevoCupo").value;
  let validacion =
    strNumerico != "" && !isNaN(strNumerico) && Number(strNumerico) > 0; //valido que se ingrese numero entero positivo
  if (validacion) {
    if (miUsuario.cuposDisponibles == miUsuario.cuposMaximos) {
      //si no existen reservas en estado pendiente, puedo modificar cupos
      swal({
        text: "¿Está seguro que desea modificar el CUPO MAXIMO permitido?",
        icon: "warning",
        buttons: true,
        buttons: ["Cancelar", "Confirmar"],
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
      }).then((resultadoSeleccion) => {
        if (resultadoSeleccion || resultadoSeleccion != null) {
          //si se acepta, se modifican los cupos maximos permitidos
          miUsuario.cuposMaximos = Number(strNumerico);
          miUsuario.cuposDisponibles = Number(strNumerico);
          document.querySelector(
            "#msjCuposActuales"
          ).innerHTML = `Actualmente el <b>CUPO MAXIMO PERMITIDO</b> es de <b>${miUsuario.cuposMaximos} </b>personas.`;
          mensajesAlerta(
            "Operación realizada exitosamente",
            "aceptacionOcancelacion"
          );
          if (!miUsuario.habilitado) {
            //mensaje que se despliega si se cambian los cupos maximos pero la opcion de realizar
            //reservas se encuentra deshabilitada
            mensajesAlerta(
              "Se le recuerda que actualmente se encuentra DESHABILITADA la posibilidad de realizar reservas",
              "warning"
            );
          }
        } else if (resultadoSeleccion === null) {
          mensajesAlerta(
            "Se ha cancelado el cambio de cupos",
            "aceptacionOcancelacion"
          );
        }
      });
      document.querySelector("#nuevoCupo").value = "";
    } //si existen reservas en estado pendiente, no se puede modificar cupos y se despliega un mensaje de error
    else {
      mensajesAlerta(
        `Actualemente no se puede modificar el CUPO MAXIMO ya que el local cuenta con RESERVAS en estado PENDIENTE. 
        Por favor, consultar ESTADO DE RESERVAS`,
        "alerta"
      );
      document.querySelector("#nuevoCupo").value = "";
    }
  } //mensaje que se muestra si se ingresa un valor no numerico al input
  else {
    mensajesAlerta("Por favor ingrese un numero entero mayor a cero", "alerta");
    document.querySelector("#nuevoCupo").value = "";
  }
}
/////////////////////    F03 – Visualizar información estadística - Usuarios: Local y Persona  ////////////////////////////
/*Funcion para Estadisticas Local*/
function estadisticasLocal() {
  //estadisticas del local
  const bodyEstadisticas = document.querySelector("#tablaEstadisticasLocal");
  document.querySelector("#tablaEstadisticasLocal").innerHTML = "";
  estadisticas(bodyEstadisticas);
  //estadisticas en comparacion con otros locales
  const bodyComparacion = document.querySelector(
    "#tablaComparacionEstadisticasLocal"
  );
  document.querySelector("#tablaComparacionEstadisticasLocal").innerHTML = "";
  estadisticasComparativas(bodyComparacion);
}
/*Funcion estadistica persona*/
function estadisticaPersona() {
  //involucrado en la impresion de la estadistica de la persona
  const bodyEstadisiticasPersona = document.querySelector(
    "#tablaEstadisticasPersona"
  );
  bodyEstadisiticasPersona.innerHTML = "";
  //involucrado en la impresion del local con mayor reservas de la persona
  const divLocalMayorReservas = document.querySelector(
    "#mayorCantidadReservas"
  );
  divLocalMayorReservas.innerHTML = "";
  tablaEstadisticaPersona(bodyEstadisiticasPersona, divLocalMayorReservas);
}
/////////////////////    F10 – Ver listado de reservas pendientes - Usuario: Persona  ////////////////////////////
//funcion que define las variables donde se imprimirán las reservas en el HTML
function reservasPendientesPersona() {
  cambioVisibilidad("#", "tableReservaPersona", "block");
  const reservasRestaurant = document.querySelector("#reservasRestaurant");
  const reservasTeatro = document.querySelector("#reservasTeatro");
  const reservasMuseo = document.querySelector("#reservasMuseo");

  reservasRestaurant.innerHTML = "";
  reservasTeatro.innerHTML = "";
  reservasMuseo.innerHTML = "";

  tablaReservasPendientes(reservasRestaurant, reservasTeatro, reservasMuseo);
}
//////////////////////////    F08 – Cancelar reserva - Usuario: Persona  /////////////////////////////////
//funcion que define las variables donde se imprimirán las reservas en el HTML
//y crea la funcionalidad de los botones de cancelación
function cancelacionReservas() {
  const cancelacionRestaurant = document.querySelector(
    "#cancelacionRestaurant"
  );
  const cancelacionTeatro = document.querySelector("#cancelacionTeatro");
  const cancelacionMuseo = document.querySelector("#cancelacionMuseo");

  cancelacionRestaurant.innerHTML = "";
  cancelacionTeatro.innerHTML = "";
  cancelacionMuseo.innerHTML = "";

  tablaCancelacionReservas(
    cancelacionRestaurant,
    cancelacionTeatro,
    cancelacionMuseo
  );
  //creo funcionalidad de botones
  document.querySelectorAll(".btnCancelacionReserva").forEach(function (item) {
    item.addEventListener("click", onClickCancelar);
  });
}
//funcion que cancela las reservas pendientes
function onClickCancelar(e) {
  e.preventDefault();
  swal({
    //funcion para confirmacion de cambio de Pendiente a Cancelado
    text: `¿Está seguro que desea CANCELAR la reserva seleccionada?`,
    icon: "warning",
    buttons: true,
    buttons: ["Cancelar", "Confirmar"],
    confirmButtonText: "Confirmar",
    denyButtonText: "Cancelar",
  }).then((resultadoSeleccion) => {
    if (resultadoSeleccion || resultadoSeleccion != null) {
      //modificacion de cambio de estado ligada a la decision de arriba: en este caso CONFIRMA acción
      const idCancelarReserva = this.getAttribute("data-button"); //obtengo el id de la reserva
      reservas.forEach(function (reserva) {
        if (
          reserva.id == idCancelarReserva //compruebo que el id es el mismo para hacer los cambios en la reserva
        ) {
          reserva.status = "CANCELADO"; //cambio el status de la reserva
          //actualizo los cupos disponibles del local
          usuariosLocal.forEach(function (local) {
            if (local.id == reserva.idLocal) {
              local.cuposDisponibles += reserva.cupos;
            }
          });
          cambioVisibilidad("#", "msjSinReservaPersona", "none"); //ojoSUSTITUYE A UN CARGARALINGRESAR
          cancelacionReservas();
          reservasPendientesPersona();
          estadisticaPersona();
        }
      });

      mensajesAlerta(
        "Se ha CANCELADO exitosamente la reserva",
        "aceptacionOcancelacion"
      );
    } else if (resultadoSeleccion === null) {
      mensajesAlerta("Se ha cancelado la acción", "aceptacionOcancelacion");
    }
  });
}
//////////////////////////    F09 – Calificar reserva - Usuario: Persona  /////////////////////////////////
//funcion que define las variables donde se imprimirán los locales a calificar en el HTML
//y crea la funcionalidad de los botones de calificación
function calificacionLocales() {
  document.querySelector("#tablaCalificacion").innerHTML = "";
  const tablaCalificacion = document.querySelector("#tablaCalificacion");
  tablaCalificacionLocales(tablaCalificacion);
  //creo funcionalidad de botones
  document.querySelectorAll(".btnCalificarReserva").forEach(function (item) {
    item.addEventListener("click", onClickCalificar);
  });
}
//permite la calificación de los locales
function onClickCalificar(e) {
  e.preventDefault();
  const idCalificarReserva = this.getAttribute("data-option"); //obtengo el id de la reserva
  //coincide con el id del select para obtener su valor
  let valorSelect = document.querySelector(`#m${idCalificarReserva}`).value;
  //se agrega una m para generar junto con id numerico un nuevo valor de id capaz de emplearse en la impresión
  if (valorSelect == "default") {
    mensajesAlerta(
      "Seleccione Calificacion para proceder",
      "aceptacionOcancelacion"
    );
  } else {
    reservas.forEach(function (reserva) {
      if (reserva.id == idCalificarReserva) {
        reserva.calificacion = Number(valorSelect);
      }
      mensajesAlerta(
        "Se ha CALIFICADO exitosamente la reserva",
        "aceptacionOcancelacion"
      );
    });
    calificacionLocales();
  }
}
//////////////////////////    F07 – Realizar solicitudes de reserva - Usuario: Persona  /////////////////////////////////
/*Funcion para Reservas Usuario:Persona*/
function mostrarPorRubro() {
  //Genera select con las opciones disponibles para reserva e imprime imagenes según el rubro
  let seleccionRubro = document.querySelector("#realizarReservas").value; //seleccion del select
  //cambio de visibilidad de muenus si se elige diferente de default
  if (seleccionRubro != "default") {
    cambioVisibilidad("#", "seleccionLocalReservas", "block");
    cambioVisibilidad("#", "localSeleccionado", "none");
    cambioVisibilidad("#", "sinOpcionLocal", "none");
  }
  //según el select seleccionado se muestran las imágenes correspondientes al rubro elegido
  if (seleccionRubro == "museo") {
    document.querySelector(
      "#imagenRubro"
    ).innerHTML = `<img class='logo' width="800px"src="./Imagenes/Museo logo.png" alt="Teatro" >`;
  } else if (seleccionRubro == "restaurant") {
    document.querySelector(
      "#imagenRubro"
    ).innerHTML = `<img class='logo' width="800px"src="./Imagenes/Restaurant logo.png" alt="Teatro" >`;
  } else if (seleccionRubro == "teatro") {
    document.querySelector(
      "#imagenRubro"
    ).innerHTML = `<img class='logo' width="800px"src="./Imagenes/Teatro logo.png" alt="Teatro" >`;
  }
  let opcionSelectVacio = false;
  //selecciono local capaz de asociarle reservas y que coincida con el rubro del select
  usuariosLocal.forEach(function (local) {
    if (local.rubro == seleccionRubro && local.habilitado) {
      //variable que teseta si existen reservas en ese local para el usuario registrado
      let posibilidadReserva = true;
      //forEach que busca entre las reservas si existe una asociada al local y a ese nombre de uruario en Pendiente
      reservas.forEach(function (reserva) {
        if (
          reserva.idLocal == local.id &&
          reserva.nombreCompletoPersona == miUsuario.nombreCompleto &&
          reserva.status == "PENDIENTE"
        ) {
          posibilidadReserva = false;
        }
      });
      //dentro de los locales posibles, muestra aquellos que cumplen con las condiciones anteriores
      if (posibilidadReserva) {
        if (!opcionSelectVacio) {
          //genero un select default para la primera entrada
          document.querySelector("#seleccionLocal").innerHTML = `
        <option value = 'default' hidden></option>
        <option value='${local.nombreCompleto}'> ${local.nombreCompleto}</option>
      `;
          opcionSelectVacio = true;
        } else {
          //genero las diferentes opciones de select basado en locales que permiten al usuario realizar reservas
          document.querySelector("#seleccionLocal").innerHTML += `
        <option value = 'default' hidden></option>
        <option value='${local.nombreCompleto}'> ${local.nombreCompleto}</option>
      `;
        }
      }
    }
  });
  //evaluo si existen locales capaces de ser seleccionados por el usuario
  //que cumplan con el select del rubro
  let contador = 0;
  let contadorReservaPendienteUsuario = 0;
  usuariosLocal.forEach(function (local) {
    //selecciono local que cumpla condiciones de realización de reserva según rubro seleccionado
    if (
      local.rubro == seleccionRubro &&
      local.cuposDisponibles > 0 &&
      local.habilitado
    ) {
      reservas.forEach(function (reserva) {
        //analizo si para ese local el usuario posee reservas en estado Pendiente
        if (
          reserva.status == "PENDIENTE" &&
          reserva.nombreCompletoPersona == miUsuario.nombreCompleto &&
          reserva.idLocal == local.id
        ) {
          contadorReservaPendienteUsuario += 1; //si es asi, cuento la reserva
        }
      });
      contador += 1; //cuento los locales totales que cumplen con la condición de la reserva
      //status pendiente, coincidencia nombre de persona e id local
    }
  });
  if (
    contador == contadorReservaPendienteUsuario &&
    seleccionRubro != "default"
  ) {
    console.log(seleccionRubro);
    //evaluo si existen locales que puedan ser reservados: esto se dará cuando
    //el local tenga cupos disponibles, este habilitado y coincida el rubro con el deseado
    //si la persona tiene reservas Pendientes para cada local dentro de ese rubro, entonces el contador de
    //locales posibles será igual al de reservas Pendientes
    cambioVisibilidad("#", "seleccionLocalReservas", "none");
    cambioVisibilidad("#", "sinOpcionLocal", "block");
    mensajesAlerta(
      "A partir de este momento no se dispone de locales del rubro " +
        seleccionRubro.toUpperCase() +
        " que puedan ser reservados. Esto es debido a que ud posee reservas Pendientes en cada uno de ellos, los locales no presentan actualmente cupos disponibles o los mismos se encuentran deshabilitados",
      "warning"
    );
    document.querySelector("#imagenRubro").innerHTML = "";
  }
  contador = 0;
  contadorReservaPendienteUsuario = 0;
}
let localAreservar = ""; //variable capaz de ser empleada en la funcion confirmarSeleccionCupos
//imprimo en el HTML los datos del local a reservar y el botón para realizar la reserva
function infoLocalAreservar() {
  cambioVisibilidad("#", "localSeleccionado", "block");
  //obtengo el nombre completo del local a reservar mediante select
  const seleccionLocal = document.querySelector("#seleccionLocal").value;
  //busco coincidencia del nombre del local con el local recorriendo usuariosLocal
  usuariosLocal.forEach(function (local) {
    if (seleccionLocal == local.nombreCompleto) {
      localAreservar = local.nombreCompleto;
      document.querySelector("#tablaAimprimirLocal").innerHTML = `
        <tr>
          <td class='tdMedia' style='padding-left:40px'>${local.imagen}</td>
          <td class='tdAncha' style='padding-left:40px'> Disponibilidad <b>${local.cuposDisponibles}</b> cupos</td>
          <td class='tdAncha'>
            <input type="number" placeholder="Ingresar cupo" id="txtReservas" style='width: 120px'>
          </td>
          <td>
            <input type="button" id="btnConfirmarSeleccionCupos" value="Confirmar" class="button alineacionInicio" 
            style='margin-right:40px' onclick="confirmarSeleccionCupos()">
          </td>
        </tr> 
        <tr>
          <td class='tdMedia' style='padding-left:40px; text-align:center'><i><b>${local.nombreCompleto}</b></i></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>`;
    }
  });
}
//funcion asociada a la creacion de la reserva mediante pusheo al array reservas
function confirmarSeleccionCupos() {
  const cuposReservas = Number(document.querySelector("#txtReservas").value);
  let validacion =
    !isNaN(cuposReservas) && cuposReservas != "" && cuposReservas > 0;
  if (validacion) {
    usuariosLocal.forEach(function (local) {
      if (local.nombreCompleto == localAreservar) {
        if (cuposReservas > local.cuposDisponibles) {
          mensajesAlerta(
            "Los cupos indicados son mayores a los actualmente disponibles",
            "alerta"
          );
        } else {
          local.cuposDisponibles -= cuposReservas;
          reservas.push(
            new Reservas(
              local.nombreCompleto,
              local.id,
              miUsuario.nombreCompleto,
              cuposReservas
            )
          );
          mensajesAlerta(
            `Se ha reservado los cupos solicitados en ${local.nombreCompleto}`,
            "confirmacion"
          );
          localAreservar = "";
          document.querySelector("#realizarReservas").value = "default";
          cancelacionReservas();
          reservasPendientesPersona();
          mostrarPorRubro();
          cambioVisibilidad("#", "seleccionLocalReservas", "none");
          cambioVisibilidad("#", "localSeleccionado", "none");
          document.querySelector("#imagenRubro").innerHTML = "";
        }
      }
    });
  } else {
    mensajesAlerta(
      "Por favor, indique el número de cupos a reservar",
      "aceptacionOcancelacion"
    );
  }
}

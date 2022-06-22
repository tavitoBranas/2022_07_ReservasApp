//////////////////    FUNCIONES COMUNES A USUARIOS PERSONA Y LOCAL  //////////////////////////////////////

///*Funcion para ocultar o mostrar secciones de HTML*/// //
function cambioVisibilidad(tipo, id, habilitacion) {
  document.querySelector(tipo + id).style.display = habilitacion;
}
///*funcion para eliminacion de espacios en blanco de str ingresado, ppal en ingreso*/// //
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
///*Funcion para eliminar contraseñas ingresadas en etapa de ingreso o registro de la aplicación*///
function borrarDatos() {
  document.querySelector("#ctsRegistro").value = "";
  document.querySelector("#ctsIngreso").value = "";
}
///*Funcion para ir a diferentes menues al hacer click*///
function modificarMenu(str) {
  //la visibilidad de los menu se deshabilita menos el header o el footer
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
  cambioVisibilidad("#", "seleccionLocalReservas", "none");
  cambioVisibilidad("#", "localSeleccionado", "none");
  estadisticaPersona();
  mostrarPorRubro();
  cancelacionReservas();
  calificacionLocales();
  reservasPendientesPersona();
  estadisticasLocal();
  finalizarReservas();
  localAreservar = "";

  //retorno a valor default de los select, inputs y imagen rubro reservas
  document.querySelector("#disponibilidad").value = "default";
  document.querySelector("#realizarReservas").value = "default";
  document.querySelector("#imagenRubro").innerHTML = "";

  //Oportunidad de mejora: cambiar el if por un switch
  //menu asociado a Persona
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
  //menu asociado a Local
  if (str == "irHabilitacion") {
    cambioVisibilidad(".", "disponibilidad", "block");
    if (miUsuario.cuposDisponibles == miUsuario.cuposMaximos) {
      //permite el cambio de visibilidad cuando se puede habilitar/deshab reservas
      cambioVisibilidad("#", "modificarHabilitacionConPendientes", "block");
      cambioVisibilidad("#", "pModificarHabilitacionConPendientes", "none");
    } else {
      cambioVisibilidad("#", "modificarHabilitacionConPendientes", "none");
      cambioVisibilidad("#", "pModificarHabilitacionConPendientes", "block");
    }
  } else if (str == "irEstadoReservas") {
    cambioVisibilidad(".", "cambiarEstadoReservas", "block");
  } else if (str == "irCupos") {
    cambioVisibilidad(".", "modificacionCupos", "block");
    if (miUsuario.cuposDisponibles == miUsuario.cuposMaximos) {
      cambioVisibilidad("#", "mostrarInputCupos", "block");
    } else {
      cambioVisibilidad("#", "mostrarInputCupos", "none");
    }
    if (miUsuario.cuposDisponibles != miUsuario.cuposMaximos) {
      document.querySelector(
        "#msjCuposActuales"
      ).innerHTML = `Actualmente el <b>CUPO MAXIMO PERMITIDO</b> es de 
        <b>${miUsuario.cuposMaximos}</b> personas.<br/><br/> Se le recuerda que el local
        cuenta con <b>RESERVAS</b> en estado <b>PENDIENTE</b></br> por lo que la modificación de los cupos
        no podrá ser realizada.
        `;
    } else {
      document.querySelector(
        "#msjCuposActuales"
      ).innerHTML = `Actualmente el <b>CUPO MAXIMO PERMITIDO</b> es de 
          <b>${miUsuario.cuposMaximos}</b> personas.`;
    }
  } else if (str == "irEstadisticasLocal") {
    cambioVisibilidad(".", "estadisticasLocal", "block");
  } else if (str == "irMenuPrincipalLocal") {
    cambioVisibilidad(".", "paginaPrincipalLocal", "block");
  }
}
///*Ingreso de usuarios: dos usuarios diferentes (persona/local)*///
//Ingreso de usuario  //
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
///*Personalizado de alerts*///
function mensajesAlerta(str, accion) {
  if (accion == "alerta") {
    swal("Ups tenemos problemas", str, "error");
  } else if (accion == "confirmacion") {
    swal("Perfecto", str, "success", { buttons: false, timer: 3000 });
  } else if (accion == "bienvenida") {
    swal({
      title: "Bienvenido",
      text: str,
      buttons: false,
      timer: 3000,
    });
  } else if (accion == "aceptacionOcancelacion") {
    swal(str, { buttons: false, timer: 3000 });
  } else if (accion == "warning") {
    swal("ATENCION", str, "warning");
  } else if (accion == "adios") {
    swal({
      title: "Hasta la próxima",
      text: str,
      buttons: false,
      timer: 3000,
    });
  }
}
/*Funcion que se activa al salir*/
function onClickSalir() {
  mensajesAlerta(
    `Esperamos verte pronto por acá ${miUsuario.nombreCompleto}`,
    "adios"
  );
  modificarMenu("salir");
  cambioVisibilidad(".", "seleccionIngresar", "block");
  cambioVisibilidad(".", "menuPrincipalPersona", "none");
  cambioVisibilidad(".", "menuPrincipalLocal", "none");
  cambioVisibilidad(".", "header", "none");
  document.querySelector("#txtBusquedaUSU").value = "";
  document.querySelector("#ctsIngreso").value = "";
}
////////////////////////////    F01 – Registrarse en la aplicación - Usuario: Persona  ///////////////////////////////
/*Registro de nuevos usuarios*/
//validacion ingreso de nombre y apellido mediante control de 1 espacio vacio entre caracteres //
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
//Funcion para validacion de Nombre de usuario   //
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
//Funcion validacion de contraseña, la persona escribe y se despliega un msj  //
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
} //
//Funcion asignacion id de nuevo usuario, llamada desde la invocación del constructor RegistroPersona  //
function asignacionId() {
  let listaId = []; //genero lista que contendrá los valores de id de todos los usuariosPersona
  let maximo = 0;
  usuariosPersona.forEach(function (user) {
    listaId.push(user.id);
  });
  for (i = 0; i <= listaId.length - 1; i++) {
    if (maximo < Number(listaId[i])) {
      //determino cual id tiene el valor mayor
      maximo = Number(listaId[i]);
    }
  }
  return (maximo + 1).toString(); //asigno 1 unidad al id maximo para asociarlo al nuevo uruario
}
/*Funcion de retorno a Ingreso desde Registro de nuevo usuario*/
function retornoAingreso() {
  cambioVisibilidad(".", "seleccionIngresar", "block");
  cambioVisibilidad(".", "seleccionRegistro", "none");
  document.querySelector("#txtUserName").value = "";
  document.querySelector("#txtNamLastNam").value = "";
  document.querySelector("#ctsRegistro").value = "";
}
/////////////////////    F03 – Visualizar información estadística - Usuarios: Local y Persona  ////////////////////////////
//obtencion de informacion estadistica del local    //
function estadisticas(itemHTML) {
  //obtengo porcentaje de ocupacion del local
  let porcentajeOcupacion = (
    ((miUsuario.cuposMaximos - miUsuario.cuposDisponibles) /
      miUsuario.cuposMaximos) *
    100
  ).toFixed(0);
  // funcion para ver estadisticas en HTML del local que consideran las reservas Finalizadas y Calificadas
  usuariosLocal.forEach(function (usuarios) {
    if (usuarios.nombreCompleto == miUsuario.nombreCompleto) {
      itemHTML.innerHTML = `<tr>
      <td>${porcentajeOcupacion} %</td>
      <td>${asignacionEstrellas(miUsuario.calificacion)}</td>
      <td>${miUsuario.cuposMaximos - miUsuario.cuposDisponibles}</td>
      <td>${calificacionDeLocales(miUsuario.id, true)}</td>
      </tr>`;
    } //reservas en estado finalizado las obtengo de la funcion calificacionDeLocales, como variable global
  });
}
//obtengo datos de calificacion de cada local    //
function calificacionDeLocales(
  idDelLocalQueCalifico,
  trueDevuelveCantidadFinalizadas
  //booleano, si true return numero de reservas finalizadas
) {
  let contadorReservasFinalizadas = 0;
  let calificacionReservas = 0;
  let contadorReservasCalificadas = 0;
  reservas.forEach(function (reserva) {
    if (
      reserva.idLocal == idDelLocalQueCalifico &&
      reserva.status == "FINALIZADO"
    ) {
      contadorReservasFinalizadas += 1;
      if (reserva.calificacion != 0) {
        calificacionReservas += Number(reserva.calificacion);
        contadorReservasCalificadas += 1;
      }
    }
    //considero las reservas que coincidan con id local, finalizadas y que hayan sido calificadas (cal != 0)
  });
  let i = 0;
  let banderaLocal = false;
  while (i <= usuariosLocal.length - 1 && !banderaLocal) {
    if (
      contadorReservasCalificadas != 0 &&
      usuariosLocal[i].id == idDelLocalQueCalifico
    ) {
      banderaLocal = true;
      usuariosLocal[i].calificacion =
        calificacionReservas / contadorReservasCalificadas;
    }
    i++;
  }
  if (trueDevuelveCantidadFinalizadas) {
    return contadorReservasFinalizadas;
  }
}
//asigno estrellas a colocar en el body de estadisticas local   //
function asignacionEstrellas(puntaje) {
  let imagen = `<img src="./Imagenes/Calificacion.png" style="width:25px"></img>`;
  if (puntaje == 0) {
    return '<p style="font-size:small; text-align: center">El local no ha sido calificado aún<p>';
  }
  if (puntaje <= 1) {
    return imagen;
  }
  if (puntaje <= 2) {
    return imagen.repeat(2);
  }
  if (puntaje <= 3) {
    return imagen.repeat(3);
  }
  if (puntaje <= 4) {
    return imagen.repeat(4);
  }
  if (puntaje <= 5) {
    return imagen.repeat(5);
  }
}
//obtencion de informacion estadistica entre locales e impresión en pantalla  //
function estadisticasComparativas(itemHTML) {
  //reservas en estado finalizado las obtengo de la funcion calificacionDeLocales, como variable global
  banderaTeatro = true;
  banderaMuseo = true;
  banderaRestaurant = true;

  usuariosLocal.forEach(function (usuarios) {
    if (usuarios.rubro == "restaurant") {
      //uso una bandera para imprimir una sola vez la imagen de restaurant en la tabla
      if (banderaRestaurant) {
        itemHTML.innerHTML += `<tr>
      <td><img src="./Imagenes/Restaurant.png" style="width:90px ; margin-left:30px" value='Restaurant'/></td>
      <td> <H3><u>RESTAURANTS</u></H3> </td>
      <td><H3><u>CALIFICACION</u></H3></td>
      </tr>`;
        banderaRestaurant = false;
      }
      itemHTML.innerHTML += `<tr>
      <td style='padding-bottom:70px'></td>
      <td>${usuarios.nombreCompleto}
      <td>${asignacionEstrellas(Number(usuarios.calificacion))}</td>
      </tr>`;
    }
    if (usuarios.rubro == "museo") {
      if (banderaMuseo) {
        //uso una bandera para imprimir una sola vez la imagen de museo en la tabla
        itemHTML.innerHTML += `<tr>
      <td ><img src="./Imagenes/Museo.png" style="width:90px; margin-left:30px" alt='Museo'/></td>
      <td > <H3><u>MUSEOS</u></H3> </td>
      <td><H3><u>CALIFICACION</u></H3></td>
      </tr>`;
        banderaMuseo = false;
      }
      itemHTML.innerHTML += `<tr>
      <td style='padding-bottom:70px'></td>
      <td>${usuarios.nombreCompleto}
      <td>${asignacionEstrellas(Number(usuarios.calificacion))}</td>
      </tr>`;
    }
    if (usuarios.rubro == "teatro") {
      if (banderaTeatro) {
        //uso una bandera para imprimir una sola vez la imagen de teatro en la tabla
        itemHTML.innerHTML += `<tr>
      <td><img src="./Imagenes/Teatro.png" style="width:90px ; margin-left:30px" alt="Restaurant"/></td>
      <td> <H3><u>TEATROS </u></H3> </td>
      <td><H3><u>CALIFICACION</u></H3></td>
      </tr>`;
        banderaTeatro = false;
      }
      itemHTML.innerHTML += `<tr>
      <td style='padding-bottom:70px'></td>
      <td>${usuarios.nombreCompleto}
      <td>${asignacionEstrellas(Number(usuarios.calificacion))}</td>
      </tr>`;
    }
  });
}
//funcion para obtener datos a completar en estadisticas persona    //
function tablaEstadisticaPersona(
  bodyEstadisiticasPersona,
  divLocalMayorReservas
) {
  let reservaEncontrada = false;
  let arrayReservasTotales = [];
  //Establezco e imprimo las estasdisticas de la persona y obtengo un array con las reservas que se hayan efectuado
  usuariosLocal.forEach(function (usuarioLocal) {
    let reservasConcretadas = 0;
    let reservasCanceladas = 0;
    let reservasTotalesUsuario = 0;
    let imagenLocal = usuarioLocal.imagen;
    let nombreLocal = usuarioLocal.nombreCompleto;
    let reservasPendientesLocal = 0;

    //evaluo cada reserva y considero si coincide con mi usuario para determinar y acumular
    //según su estado: pendiente, finalizado y cancelado
    for (i = 0; i <= reservas.length - 1; i++) {
      if (
        reservas[i].nombreCompletoPersona == miUsuario.nombreCompleto &&
        reservas[i].idLocal == usuarioLocal.id
      ) {
        if (reservas[i].status == "PENDIENTE") {
          reservasTotalesUsuario += 1;
        } else if (reservas[i].status == "FINALIZADO") {
          reservasConcretadas += 1;
          reservasTotalesUsuario += 1;
        } else if (reservas[i].status == "CANCELADO") {
          reservasCanceladas += 1;
          reservasTotalesUsuario += 1;
        }
      }
      //determino cantidad de reservas pendientes del local
      if (
        reservas[i].idLocal == usuarioLocal.id &&
        reservas[i].status == "PENDIENTE"
      ) {
        reservasPendientesLocal += 1;
      }
    }
    //determino el porcentaje de pendientes asociado al usuario
    let porcentaje = (
      ((reservasTotalesUsuario - reservasConcretadas - reservasCanceladas) /
        reservasPendientesLocal) *
      100
    ).toFixed(1);

    if (isNaN(porcentaje)) {
      porcentaje = `<i>-------</i>`;
    }
    //imprimo en la pantalla de estadisticas
    if (reservasTotalesUsuario != 0) {
      reservaEncontrada = true;
      //cambio visibilidad del html mostrando datos
      cambioVisibilidad("#", "tableEstadisticasPersona", "block");
      cambioVisibilidad("#", "estadisticasPersona", "block");
      cambioVisibilidad("#", "msjSinReservaPersona", "none");
      bodyEstadisiticasPersona.innerHTML += `
      <td style="padding-bottom:40px"><i>${nombreLocal.toUpperCase()}</i></br>${imagenLocal}</td>
      <td style="padding-bottom:40px">${reservasConcretadas}</td>
      <td style="padding-bottom:40px">${reservasTotalesUsuario}</td>
      <td style="padding-bottom:40px">${reservasPendientesLocal}</td>
      <td style="padding-bottom:40px">${porcentaje} %
      </td>
      `;
    }
    //pusheo en un array la cantidad de reservas totales -posición [0]- y reservas concretadas -posición [1]-
    // vinculadas al idLocal -posición [2]- del array indexado
    if (reservasTotalesUsuario != 0) {
      arrayReservasTotales.push([
        reservasTotalesUsuario,
        reservasConcretadas,
        Number(usuarioLocal.id),
      ]);
    }
  });
  //analizo cual de todos los locales tiene mayor reservas totales
  let localMayorReservasTotales = [];
  let mayorReservasTotales = 0;

  arrayReservasTotales.forEach(function (local) {
    //evaluo cantidad reservas totales [posicion 0]
    if (mayorReservasTotales < local[0]) {
      mayorReservasTotales = 0;
      localMayorReservasTotales = [];
      mayorReservasTotales = local[0];
      localMayorReservasTotales.push(local[2]);
    }
    //evaluo la posibilidad de que haya mas de un local con igual cantidad de reservas totales
    else if (mayorReservasTotales == local[0]) {
      localMayorReservasTotales.push(local[2]);
    }
  });
  //imprimo en la pantalla de estadisticas los locales preferidos
  //local con mayor reservas totales
  let tituloMayorReservasTotales = true;
  localMayorReservasTotales.forEach(function (local) {
    for (i = 0; i <= usuariosLocal.length - 1; i++) {
      if (tituloMayorReservasTotales) {
        divLocalMayorReservas.innerHTML = `
          </br><p><h2>En base a sus registros, usted ha realizado la mayor cantidad de reservas en</h2></p>`;
        tituloMayorReservasTotales = false;
      }
      //imprimo en el HTML el local con mayor reservas totales junto con el ícono que identifica el rubro del mismo
      if (
        usuariosLocal[i].id == local &&
        usuariosLocal[i].rubro == "restaurant"
      ) {
        divLocalMayorReservas.innerHTML += `
          <img src="./Imagenes/Restaurant.png" style="width:120px; margin-right:80px" 
          value='Restaurant'/>${usuariosLocal[i].imagen}<img src="./Imagenes/Restaurant.png" style="width:120px; margin-left:80px" 
          value='Restaurant'/>
          </br><b><i><h2>${usuariosLocal[i].nombreCompleto}</h2></b></i></br></br>
          `;
      }
      if (usuariosLocal[i].id == local && usuariosLocal[i].rubro == "teatro") {
        divLocalMayorReservas.innerHTML += `
          <img src="./Imagenes/Teatro.png" style="width:120px; margin-right:80px" 
          value='Teatro'/>${usuariosLocal[i].imagen}<img src="./Imagenes/Teatro.png" style="width:120px; margin-left:80px" 
          value='Teatro'/>
          </br><b><i><h2>${usuariosLocal[i].nombreCompleto}</h2></b></i></br></br>
          `;
      }
      if (usuariosLocal[i].id == local && usuariosLocal[i].rubro == "museo") {
        divLocalMayorReservas.innerHTML += `
          <img src="./Imagenes/Museo.png" style="width:120px; margin-right:80px" 
          value='Museo'/>${usuariosLocal[i].imagen}<img src="./Imagenes/Museo.png" style="width:120px; margin-left:80px" 
          value='R'/>
          </br><b><i><h2>${usuariosLocal[i].nombreCompleto}</h2></b></i></br></br>
          `;
      }
    }
  });
  //si no tiene reservas se muestra un mensaje en pantalla
  if (!reservaEncontrada) {
    cambioVisibilidad("#", "msjSinReservaPersona", "block");
    cambioVisibilidad("#", "estadisticasPersona", "none");
  }
}
//////////////////////    F05 – Cambiar reservas de estado - Usuario: Local  /////////////////////////////
//Funcion para determinar si existen usuarios con reservas Pendientes en el local activo
function coincidenciasPersona(persona) {
  //la persona aquí es proporcionada por la función buscarPersona()
  let posiblesReservas = [];
  reservas.forEach(function (reserva) {
    if (
      //evaluo que la reserva coincida con el local activo (miUsuario) y que además se encuentre Pendiente
      reserva.nombreCompletoLocal == miUsuario.nombreCompleto &&
      reserva.status == "PENDIENTE"
    ) {
      //se trabaja con el array reservas y se evalua si los caracteres ingresados en persona coinciden con
      //los de usuarios con reservas pendientes en ese local
      for (i = 0; i <= reserva.nombreCompletoPersona.length - 1; i++) {
        if (reserva.nombreCompletoPersona[i].toLowerCase() == persona[0]) {
          //coincidencia de primer caracter habilita el while
          banderaNombre = true;
          x = 1;
          while (x <= persona.length - 1 && banderaNombre == true) {
            //while implicado en la corroboracion de que los siguientes caracteres de persona coincidan con los de algún usuario
            if (reserva.nombreCompletoPersona[i + x] != persona[x]) {
              banderaNombre = false;
            }
            x++;
          }
          if (banderaNombre) {
            //si se encuentra usuario que coincida con los caracteres de Persona, se pushea a un array
            posiblesReservas.push(reserva);
          }
        }
      }
    }
  });
  if (posiblesReservas.length > 0) {
    //si existen datos en el array, se retorna el array o sino se retorna -1
    return posiblesReservas;
  } else {
    return -1;
  }
}
//Impresión en pantalla de las reservas en estado Pendiente o las definidas en el array para el local activo
function reservasPendientes(itemHTML, arrayAbuscar) {
  if (arrayAbuscar !== undefined) {
    itemHTML.innerHTML = "";
    arrayAbuscar.forEach(function (reserva) {
      if (
        reserva.nombreCompletoLocal == miUsuario.nombreCompleto &&
        reserva.status == "PENDIENTE"
      ) {
        itemHTML.innerHTML += `<tr> 
      <td class="tdAncha">${reserva.nombreCompletoPersona}</td>
      <td class="tdCorta">${reserva.cupos}</td>
      <td class="tdMedia"><input type='button' data-button='${reserva.id}' 
      class='button btnCambioReserva' style='width:100px' value='Finalizar'/></td>
      <td class="tdCorta"style="padding-right: 30px"><i><b>${reserva.status}</i></b></td>
   </tr>`;
      }
    });
  } else {
    reservas.forEach(function (reserva) {
      if (
        reserva.nombreCompletoLocal == miUsuario.nombreCompleto &&
        reserva.status == "PENDIENTE"
      ) {
        itemHTML.innerHTML += `<tr> 
      <td class="tdAncha">${reserva.nombreCompletoPersona}</td>
      <td class="tdCorta">${reserva.cupos}</td>
      <td class="tdMedia"><input type='button' data-button='${reserva.id}' 
      class='button btnCambioReserva' style='width:100px' value='Finalizar'/></td>
      <td class="tdCorta"style="padding-right: 30px"><i><b>${reserva.status}</i></b></td>
   </tr>`;
      }
    });
  }
}
//////////////////////////    F07 – Realizar solicitudes de reserva - Usuario: Persona  ///////////////////////////
//Funcion asignacion id de nueva reserva
function asignacionIdReservas() {
  let listaId2 = [];
  let maximo = 0;
  reservas.forEach(function (reserva) {
    listaId2.push(reserva.id);
  });
  for (i = 0; i <= listaId2.length - 1; i++) {
    if (maximo < Number(listaId2[i])) {
      maximo = Number(listaId2[i]);
    }
  }
  return maximo + 1;
}

//////////////////////////    F08 – Cancelar reserva - Usuario: Persona  ///////////////////////////
//funcion encargada de imprimir en pantalla las reservas a ser canceladas del usuario Persona
//junto con los botones de cancelación
function tablaCancelacionReservas(
  cancelacionRestaurant,
  cancelacionTeatro,
  cancelacionMuseo
) {
  let reservasPendientes = false;
  cambioVisibilidad("#", "tableCancelacion", "block");
  cambioVisibilidad("#", "msjSinCancelacionPersona", "none");
  reservas.forEach(function (reserva) {
    if (
      reserva.nombreCompletoPersona == miUsuario.nombreCompleto &&
      reserva.status == "PENDIENTE"
    ) {
      usuariosLocal.forEach(function (local) {
        if (
          reserva.idLocal == Number(local.id) &&
          local.rubro == "restaurant"
        ) {
          reservasPendientes = true;
          cancelacionRestaurant.innerHTML += `<tr>
            <td class="tdMedia" style='padding-left:50px'><img src="./Imagenes/Restaurant.png" style="width:85px; margin-right:80px" value='Restaurant'/></td>
            <td class="tdAncha">${local.imagen}</td>
            <td class="tdAncha">${local.nombreCompleto}</td>
            <td class="tdAncha">${reserva.cupos} cupo (s)</td>
            <td class="tdAncha">
            <input type='button' data-button='${reserva.id}' class='button btnCancelacionReserva' style='width:100px' value='Cancelar'/>
            </td>
            </tr>`;
        }
        if (reserva.idLocal == Number(local.id) && local.rubro == "teatro") {
          reservasPendientes = true;
          cancelacionTeatro.innerHTML += `<tr>
            <td  class="tdAncha" style='padding-left:50px'><img src="./Imagenes/Teatro.png" style="width:85px; margin-right:80px" value='Teatro'/></td>
            <td class="tdAncha">${local.imagen}</td>
            <td class="tdAncha">${local.nombreCompleto}</td>
            <td class="tdAncha">${reserva.cupos} cupo (s)</td>
            <td class="tdAncha">
            <input type='button' data-button='${reserva.id}' class='button btnCancelacionReserva' style='width:100px' value='Cancelar'/>
            </td>
            </tr>`;
        }

        if (reserva.idLocal == Number(local.id) && local.rubro == "museo") {
          reservasPendientes = true;
          cancelacionMuseo.innerHTML += `<tr>
            <td class="tdAncha" style='padding-left:50px'><img src="./Imagenes/Museo.png" style="width:85px; margin-right:80px" value='Museo'/></td>
            <td class="tdAncha">${local.imagen}</td>
            <td class="tdAncha">${local.nombreCompleto}</td>
            <td class="tdAncha">${reserva.cupos} cupo (s)</td>
            <td class="tdAncha">
            <input type='button' data-button='${reserva.id}' class='button btnCancelacionReserva' style='width:100px' value='Cancelar'/>
            </td>
            </tr>`;
        }
      });
    }
  });
  if (!reservasPendientes) {
    cambioVisibilidad("#", "msjSinCancelacionPersona", "block");
    cambioVisibilidad("#", "tableCancelacion", "none");
  }
}
//////////////////////////    F09 – Calificar reserva - Usuario: Persona  /////////////////////////////////
//funcion que permite la impresión en el HTML de locales a ser calificados
function tablaCalificacionLocales(tablaCalificacion) {
  cambioVisibilidad("#", "msjSinCalificacion", "none");
  cambioVisibilidad("#", "calificacionReservasPersona", "block");
  let sinReservasFinalizadas = false;
  reservas.forEach(function (reserva) {
    if (
      reserva.status == "FINALIZADO" &&
      miUsuario.nombreCompleto == reserva.nombreCompletoPersona &&
      reserva.calificacion == 0
    ) {
      sinReservasFinalizadas = true;
      usuariosLocal.forEach(function (local) {
        if (reserva.idLocal == Number(local.id)) {
          tablaCalificacion.innerHTML += `
          <tr>
          <td class='tdAncha'>${local.imagen}</td>
          <td class='tdMedia' style='font-size:larger'><i>${local.nombreCompleto}</i></td>
          <td class='tdAncha' style='padding-right:20px'>
          <select class='selectCalificacion' id='m${reserva.id}'>
            <option value='default' hidden selected></option>
            <option value='1'>★☆☆☆☆</option>
            <option value='2'>★★☆☆☆ </option>
            <option value='3'>★★★☆☆ </option>
            <option value='4'>★★★★☆</option>
            <option value='5'>★★★★★</option>
          </select>       
          </td>
          <td class='tdCorta'>
          <input type='button' data-option='${reserva.id}' class='button btnCalificarReserva' style='width:100px' value='Calificar'/>
          </td>
          </tr>`;
        }
      });
    }
  });
  if (!sinReservasFinalizadas) {
    cambioVisibilidad("#", "msjSinCalificacion", "block");
    cambioVisibilidad("#", "calificacionReservasPersona", "none");
  }
}
//////////////////    F10 – Ver listado de reservas pendientes - Usuario: Persona  //////////////////////
//
//funcion encargada de imprimir en pantalla las reservas pendientes del usuario Persona
function tablaReservasPendientes(
  reservasRestaurant,
  reservasTeatro,
  reservasMuseo
) {
  let reservasExistentes = false;
  cambioVisibilidad("#", "msjSinPendientePersona", "none");
  reservas.forEach(function (reserva) {
    if (
      reserva.nombreCompletoPersona == miUsuario.nombreCompleto &&
      reserva.status == "PENDIENTE"
    ) {
      usuariosLocal.forEach(function (local) {
        if (
          reserva.idLocal == Number(local.id) &&
          local.rubro == "restaurant"
        ) {
          reservasExistentes = true;
          reservasRestaurant.innerHTML += `
            <tr><td class="tdMedia" style='padding-left:50px'><img src="./Imagenes/Restaurant.png" style="width:85px; margin-right:80px" value='Restaurant'/></td>
            <td class="tdMedia">${local.imagen}</td>
            <td class="tdMedia">${local.nombreCompleto}</td>
            <td class="tdMedia">${reserva.cupos} cupo (s)</td></tr>
            `;
        }

        if (reserva.idLocal == Number(local.id) && local.rubro == "teatro") {
          reservasExistentes = true;
          reservasTeatro.innerHTML += `
            <tr><td  class="tdMedia" style='padding-left:50px'><img src="./Imagenes/Teatro.png" style="width:85px; margin-right:80px" value='Teatro'/></td>
            <td class="tdMedia">${local.imagen}</td>
            <td class="tdMedia">${local.nombreCompleto}</td>
            <td class="tdMedia">${reserva.cupos} cupo (s)</td></tr>
            `;
        }

        if (reserva.idLocal == Number(local.id) && local.rubro == "museo") {
          reservasExistentes = true;
          reservasMuseo.innerHTML += `
            <tr><td class="tdMedia" style='padding-left:50px'><img src="./Imagenes/Museo.png" style="width:85px; margin-right:80px" value='Museo'/></td>
            <td class="tdMedia">${local.imagen}</td>
            <td class="tdMedia">${local.nombreCompleto}</td>
            <td class="tdMedia">${reserva.cupos} cupo (s)</td></tr>
            `;
        }
      });
    }
  });
  if (!reservasExistentes) {
    cambioVisibilidad("#", "msjSinPendientePersona", "block");
    cambioVisibilidad("#", "tableReservaPersona", "none");
  }
}

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

/*Ingreso de usuarios: dos usuarios diferentes (persona/local)*/

//Ingreso de usuario
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

//Elementos a cargar en la pagina una vez que ingresa el Usuario
function cargarAlIngresar() {
  //cuidado que esta funcion esta ligada a actualizacion de HTML, ver posibles afectaciones
  //cargo al usuario activo en el header
  document.querySelector("#nombreUsuario").innerHTML =
    "Usuario activo: " + "<i><b>" + miUsuario.nombreCompleto + "</i></b>";
  //cargo los cupos maximos permitidos
  if (miUsuario.cuposDisponibles != miUsuario.cuposMaximos) {
    document.querySelector(
      "#msjCuposActuales"
    ).innerHTML = `Actualmente el <b>CUPO MAXIMO PERMITIDO</b> es de 
      <b>${miUsuario.cuposMaximos}</b> personas.<br/><br/> Se cuenta con <b>
       RESERVAS</b> en estado <b>PENDIENTE</b>.
      `;
  }

  //reseteo el espacio para buscar reservas
  document.querySelector("#busquedaClientes").value = "";

  //evaluo si existen reservas pendientes
  if (miUsuario.cuposDisponibles == miUsuario.cuposMaximos) {
    document.querySelector(
      "#msjCuposActuales"
    ).innerHTML = `Actualmente el <b>CUPO MAXIMO PERMITIDO</b> es de 
        <b>${miUsuario.cuposMaximos}</b> personas.`;
  }
  //reseteo la pantalla de estadisticas
  document.querySelector("#tablaEstadisticasPersona").innerHTML = "";
  document.querySelector("#mayorCantidadReservas").innerHTML = "";
  //reseteo pantalla que muestra las reservas pendientes de las personas
  document.querySelector("#reservasRestaurant").innerHTML = "";
  document.querySelector("#reservasTeatro").innerHTML = "";
  document.querySelector("#reservasMuseo").innerHTML = "";

  cambioVisibilidad("#", "tableCambioReserva", "none");
  cambioVisibilidad("#", "msjSinReserva", "block");
  cambioVisibilidad("#", "buscadorPersona", "none");
  cambioVisibilidad("#", "msjSinReservaPersona", "none");
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
  } else if (accion == "bienvenida") {
    swal({
      title: "Bienvenido",
      text: str,
      buttons: false,
      timer: 3000,
    });
  } else if (accion == "aceptacionOcancelacion") {
    swal(str, { buttons: false, timer: 3000 });
  }
}

//consulta para aceptacion y cancelacion
/*swal({
    text: "¿Está seguro que desea DESHABILITAR la posibilidad de realizar reservas?",
    icon: "warning",
    buttons: true,
    buttons: ["Cancelar", "Confirmar"],
    confirmButtonText: "Confirmar",
    denyButtonText: "Cancelar",
  }).then((resultadoSeleccion) => {
    if (resultadoSeleccion || resultadoSeleccion != null) {
      document.querySelector("#msjHabilitacionReserva").innerHTML =
      "Actualmente las reservas se encuentran <b>DESHABILITADAS</b>";
    miUsuario.habilitado = false;
    } else if (resultadoSeleccion === null) {
      mensajesAlerta('Se ha cancelado la seleccion',)
    }
})};*/

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
  //la visibilidad de los menu se deshabilita menos el header ni el footer
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

  //retorno a valor inicial los switch
  document.querySelector("#disponibilidad").value = "default";

  //si da el tiempo cambiar a switch
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

/*Funcion para cambiar estado de reservas y saber cuantas reservas tiene un local*/
function coincidenciasPersona(persona) {
  let posiblesReservas = [];
  reservas.forEach(function (reserva) {
    if (
      reserva.nombreCompletoLocal == miUsuario.nombreCompleto &&
      reserva.status == "PENDIENTE"
    ) {
      for (i = 0; i <= reserva.nombreCompletoPersona.length - 1; i++) {
        if (reserva.nombreCompletoPersona[i].toLowerCase() == persona[0]) {
          banderaNombre = true;
          x = 1;
          while (x <= persona.length - 1 && banderaNombre == true) {
            if (reserva.nombreCompletoPersona[i + x] != persona[x]) {
              banderaNombre = false;
            }
            x++;
          }
          if (banderaNombre) {
            posiblesReservas.push(reserva);
          }
        }
      }
    }
  });
  if (posiblesReservas.length > 0) {
    return posiblesReservas;
  } else {
    return -1;
  }
}

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

/*function cantidadReservas() {
  let contadorReservas = 0;
  reservas.forEach(function (reserva) {
    if (
      reserva.nombreCompletoLocal == miUsuario.nombreCompleto &&
      reserva.cupos != 0
    ) {
      contadorReservas += 1;
    }
  });
  return contadorReservas;
}*/

/*Funcion para estadisticas*/

//obtengo datos de calificacion de cada local
function calificacionDeLocales(
  idDelLocalQueCalifico,
  trueDevuelveCantidadFinalizadas
  //booleano, si true return numero de reservas finalizadas
) {
  contadorReservasFinalizadas = 0;
  let calificacionReservas = 0;
  reservas.forEach(function (reserva) {
    if (
      reserva.idLocal == idDelLocalQueCalifico &&
      reserva.status == "FINALIZADO"
    ) {
      calificacionReservas += Number(reserva.calificacion);
      contadorReservasFinalizadas += 1;
    }
  });
  let i = 0;
  let banderaLocal = false;
  while (i <= usuariosLocal.length - 1 && !banderaLocal) {
    if (
      contadorReservasFinalizadas != 0 &&
      usuariosLocal[i].id == idDelLocalQueCalifico
    ) {
      banderaLocal = true;
      usuariosLocal[i].calificacion =
        calificacionReservas / contadorReservasFinalizadas;
    }
    i++;
  }
  if (trueDevuelveCantidadFinalizadas) {
    return contadorReservasFinalizadas;
  }
}

//obtencion de informacion estadistica del local
function estadisticas(itemHTML) {
  //obtengo porcentaje de ocupacion del local
  let porcentajeOcupacion = (
    ((miUsuario.cuposMaximos - miUsuario.cuposDisponibles) /
      miUsuario.cuposMaximos) *
    100
  ).toFixed(0);

  // funcion para ver estadisticas en HTML del local
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

//obtencion de informacion estadistica entre locales
function estadisticasComparativas(itemHTML) {
  // funcion para verlo en HTML
  banderaTeatro = true;
  banderaMuseo = true;
  banderaRestaurant = true;
  banderaIdentificacion = true;
  usuariosLocal.forEach(function (usuarios) {
    let separacion = `<img src="./Imagenes/Separacion.png" style="width:40px">`;
    if (banderaIdentificacion) {
      itemHTML.innerHTML += `<tr>
    <td class="tdAncha"></td>
    <td class="tdAncha"><b><h2>LOCALES</h2></b> </td>
    <td class="tdAncha"><b><h2>CALIFICACION</h2></b></td>
    </tr>`;
      banderaIdentificacion = false;
    }
    if (usuarios.rubro == "restaurant") {
      if (banderaRestaurant) {
        itemHTML.innerHTML += `<tr>
      <td><img src="./Imagenes/Restaurant.png" style="width:90px" value='Restaurant'/></td>
      <td> <H3><u>RESTAURANTS</u></H3> </td>
      <td>${separacion.repeat(4)}</td>
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
        itemHTML.innerHTML += `<tr>
      <td ><img src="./Imagenes/Museo.png" style="width:90px" alt='Museo'/></td>
      <td > <H3><u>MUSEOS</u></H3> </td>
      <td>${separacion.repeat(4)}</td>
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
        itemHTML.innerHTML += `<tr>
      <td><img src="./Imagenes/Teatro.png" style="width:90px" alt="Restaurant"/></td>
      <td> <H3><u>TEATROS </u></H3> </td>
      <td>${separacion.repeat(4)}</td>
      </tr>`;
        banderaTeatro = false;
      }
      itemHTML.innerHTML += `<tr>
      <td style='padding-bottom:70px'></td>
      <td>${usuarios.nombreCompleto}
      <td>${asignacionEstrellas(Number(usuarios.calificacion))}</td>
      </tr>`;
      //reservas en estado finalizado las obtengo de la funcion calificacionDeLocales, como variable global
    }
  });
}

//asigno estrellas a colocar en el body de estadisticas local
function asignacionEstrellas(puntaje) {
  let imagen = `<img src="./Imagenes/Calificacion.png" style="width:25px"></img>`;
  if (puntaje == 0) {
    return '<p style="font-size:small; text-align: center">Su local no ha sido calificado aun<p>';
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

//funcion para obtener datos a completar en estadisticas persona

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

    for (i = 0; i <= reservas.length - 1; i++) {
      //evaluo cada reserva y considero si coincide con mi usuario para determinar estado reservas y acumulo
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
      bodyEstadisiticasPersona.innerHTML += `
      <td style="padding-bottom:40px"><i>${nombreLocal.toUpperCase()}</i></br>${imagenLocal}</td>
      <td style="padding-bottom:40px">${reservasConcretadas}</td>
      <td style="padding-bottom:40px">${reservasTotalesUsuario}</td>
      <td style="padding-bottom:40px">${reservasPendientesLocal}</td>
      <td style="padding-bottom:40px">${porcentaje} %
      </td>
      `;
    }
    if (reservasTotalesUsuario != 0) {
      //pusheo en un array la cantidad de reservas totales[0] y reservas concretadas[1] realizadas vinculadas al idLocal [2]
      arrayReservasTotales.push([
        reservasTotalesUsuario,
        reservasConcretadas,
        Number(usuarioLocal.id),
      ]);
    }
  });

  //defino los locales preferidos

  let localMayorReservasTotales = [];
  let mayorReservasTotales = 0;

  //analizo cual de todos los locales tiene mayor reservas totales
  arrayReservasTotales.forEach(function (local) {
    //evaluo cantidad reservas totales [posicion 0]

    if (mayorReservasTotales < local[0]) {
      mayorReservasTotales = 0;
      localMayorReservasTotales = [];
      mayorReservasTotales = local[0];
      localMayorReservasTotales.push(local[2]);
    }
    //evaluo la posibilidad de que hayan mas de un local
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
      if (
        usuariosLocal[i].id == local &&
        usuariosLocal[i].rubro == "restaurant"
      ) {
        //escribo en el html
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

  if (!reservaEncontrada) {
    //si no tiene reservas aun se muestra esto
    cambioVisibilidad("#", "msjSinReservaPersona", "block");
    cambioVisibilidad("#", "estadisticasPersona", "none");
  }
}

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
          reservasTeatro.innerHTML = `
            <tr><td  class="tdMedia" style='padding-left:50px'><img src="./Imagenes/Teatro.png" style="width:85px; margin-right:80px" value='Teatro'/></td>
            <td class="tdMedia">${local.imagen}</td>
            <td class="tdMedia">${local.nombreCompleto}</td>
            <td class="tdMedia">${reserva.cupos} cupo (s)</td></tr>
            `;
        }

        if (reserva.idLocal == Number(local.id) && local.rubro == "museo") {
          reservasExistentes = true;
          reservasMuseo.innerHTML = `
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

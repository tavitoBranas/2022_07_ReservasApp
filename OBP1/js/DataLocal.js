//Creacion del objeto Usuarios(tendremos algunos precargados)CORROBORAR DSP CON EL CONSTRUCTOR
const usuariosLocal = [
  {
    id: "1",
    nombreCompleto: "Lo de Pepe",
    usuario: "lodepepe",
    contraseña: "1",
    habilitado: true,
    cuposMaximos: 30,
    cuposDisponibles: 25, //la direrencia entre maximos y los reservados en estado pendiente
    calificacion: 0,
    tipo: "local",
    rubro: "restaurant",
    imagen:
      '<img src="./Imagenes/Restaurant 1.jpg" alt="Lo de Pepe foto" style="width:200px">',
  },
  {
    id: "2",
    nombreCompleto: "Garage Burguer",
    usuario: "garageburguer",
    contraseña: "1",
    habilitado: true,
    cuposMaximos: 45,
    cuposDisponibles: 43, //la direrencia entre maximos y los reservados en estado pendiente
    calificacion: 0,
    tipo: "local",
    rubro: "restaurant",
    imagen:
      '<img src="./Imagenes/Restaurant 2.jpg" alt="Garage burguer foto" style="width:200px">',
  },
  {
    id: "3",
    nombreCompleto: "Lisa",
    usuario: "lisa",
    contraseña: "Lisa_6",
    habilitado: true,
    cuposMaximos: 25,
    cuposDisponibles: 25, //la direrencia entre maximos y los reservados en estado pendiente
    calificacion: 0,
    tipo: "local",
    rubro: "restaurant",
    imagen:
      '<img src="./Imagenes/Restaurant 3.jpg" alt="Lisa foto" style="width:200px">',
  },
  {
    id: "4",
    nombreCompleto: "El Galpon",
    usuario: "elgalpon",
    contraseña: "Elgalpon6",
    habilitado: true,
    cuposMaximos: 200,
    cuposDisponibles: 200, //la direrencia entre maximos y los reservados en estado pendiente
    calificacion: 0,
    tipo: "local",
    rubro: "teatro",
    imagen:
      '<img src="./Imagenes/Teatro 1.jpg" alt="El Galpon foto" style="width:200px">',
  },
  {
    id: "5",
    nombreCompleto: "El Tinglado",
    usuario: "eltinglado",
    contraseña: "Eltinglado6",
    habilitado: true,
    cuposMaximos: 157,
    cuposDisponibles: 157, //la direrencia entre maximos y los reservados en estado pendiente
    calificacion: 0,
    tipo: "local",
    rubro: "teatro",
    imagen:
      '<img src="./Imagenes/Teatro 2.jpg" alt="El Tinglado foto" style="width:200px">',
  },
  {
    id: "6",
    nombreCompleto: "Teatro Del Anglo",
    usuario: "delanglo",
    contraseña: "Delanglo6",
    habilitado: true,
    cuposMaximos: 142,
    cuposDisponibles: 142, //la direrencia entre maximos y los reservados en estado pendiente
    calificacion: 0,
    tipo: "local",
    rubro: "teatro",
    imagen:
      '<img src="./Imagenes/Teatro 3.jpg" alt="Teatro del Anglo foto" style="width:200px">',
  },
  {
    id: "7",
    nombreCompleto: "Museo Del Prado",
    usuario: "delprado",
    contraseña: "Delprado6",
    habilitado: true,
    cuposMaximos: 100,
    cuposDisponibles: 100, //la direrencia entre maximos y los reservados en estado pendiente
    calificacion: 0,
    tipo: "local",
    rubro: "museo",
    imagen:
      '<img src="./Imagenes/Museo 1.jpg" alt="Museo del Prado foto" style="width:200px">',
  },
  {
    id: "8",
    nombreCompleto: "Museo Contemporaneo",
    usuario: "contemporaneo",
    contraseña: "Contemporaneo6",
    habilitado: true,
    cuposMaximos: 53,
    cuposDisponibles: 53, //la direrencia entre maximos y los reservados en estado pendiente
    calificacion: 0,
    tipo: "local",
    rubro: "museo",
    imagen:
      '<img src="./Imagenes/Museo 2.jpg" alt="Museo Contemporaneo foto" style="width:200px">',
  },
  {
    id: "9",
    nombreCompleto: "Museo Frio",
    usuario: "frio",
    contraseña: "Frio6",
    habilitado: true,
    cuposMaximos: 75,
    cuposDisponibles: 75, //la direrencia entre maximos y los reservados en estado pendiente
    calificacion: 0,
    tipo: "local",
    rubro: "museo",
    imagen:
      '<img src="./Imagenes/Museo 3.jpg" alt="Museo Frio foto" style="width:200px">',
  },
  {
    id: "10",
    nombreCompleto: "Louvre",
    usuario: "louvre",
    contraseña: "Louvre6",
    habilitado: true,
    cuposMaximos: 159,
    cuposDisponibles: 149, //la direrencia entre maximos y los reservados en estado pendiente
    calificacion: 0,
    tipo: "local",
    rubro: "museo",
    imagen:
      '<img src="./Imagenes/Museo 4.jpg" alt="Louvre foto" style="width:200px">',
  },
];

const reservas = [
  {
    id: 1,
    nombreCompletoLocal: "Lo de Pepe",
    //evaluaria sacar el nombre completo del local ya que esta el id, ver si no afecta funcionalidad
    idLocal: 1,
    nombreCompletoPersona: "Emiliano Lujan",
    cupos: 2,
    status: "PENDIENTE",
    calificacion: 0,
  },
  {
    id: 2,
    nombreCompletoLocal: "Lo de Pepe",
    idLocal: 1,
    nombreCompletoPersona: "Jose Diaz",
    cupos: 3,
    status: "PENDIENTE",
    calificacion: 0,
  },
  {
    id: 3,
    nombreCompletoLocal: "Louvre",
    idLocal: 10,
    nombreCompletoPersona: "Jose Diaz",
    rubro: "museo",
    cupos: 10,
    status: "PENDIENTE",
    calificacion: 0,
  },
  {
    id: 4,
    nombreCompletoLocal: "Garage Burguer",
    idLocal: 2,
    nombreCompletoPersona: "Emiliano Lujan",
    cupos: 2,
    status: "PENDIENTE",
    calificacion: 0,
  },
  {
    id: 5,
    nombreCompletoLocal: "Lo de Pepe",
    idLocal: 1,
    nombreCompletoPersona: "Jose Diaz",
    cupos: 15,
    status: "FINALIZADO",
    calificacion: 5,
  },
  {
    id: 6,
    nombreCompletoLocal: "Lo de Pepe",
    idLocal: 1,
    nombreCompletoPersona: "Gustavo Brañas",
    cupos: 3,
    status: "FINALIZADO",
    calificacion: 3,
  },
  {
    id: 7,
    nombreCompletoLocal: "Garage Burguer",
    idLocal: 2,
    nombreCompletoPersona: "Gustavo Brañas",
    cupos: 3,
    status: "FINALIZADO",
    calificacion: 3,
  },
  {
    id: 8,
    nombreCompletoLocal: "El Tinglado",
    idLocal: 5,
    nombreCompletoPersona: "Gustavo Brañas",
    cupos: 3,
    status: "FINALIZADO",
    calificacion: 4,
  },
  {
    id: 9,
    nombreCompletoLocal: "Louvre",
    idLocal: 10,
    nombreCompletoPersona: "Gustavo Brañas",
    cupos: 3,
    status: "PENDIENTE",
    calificacion: 0,
  },
  {
    id: 10,
    nombreCompletoLocal: "Lo de Pepe",
    idLocal: 1,
    nombreCompletoPersona: "Gustavo Brañas",
    cupos: 3,
    status: "CANCELADO",
    calificacion: 0,
  },
  {
    id: 11,
    nombreCompletoLocal: "Lo de Pepe",
    idLocal: 1,
    nombreCompletoPersona: "Gustavo Brañas",
    cupos: 3,
    status: "PENDIENTE",
    calificacion: 0,
  },
  {
    id: 12,
    nombreCompletoLocal: "Louvre",
    idLocal: 10,
    nombreCompletoPersona: "Jose Diaz",
    rubro: "museo",
    cupos: 50,
    status: "FINALIZADO",
    calificacion: 0,
  },
  {
    id: 13,
    nombreCompletoLocal: "Louvre",
    idLocal: 10,
    nombreCompletoPersona: "Jose Diaz",
    rubro: "museo",
    cupos: 50,
    status: "FINALIZADO",
    calificacion: 0,
  },
  {
    id: 13,
    nombreCompletoLocal: "Lo de Pepe",
    idLocal: 1,
    nombreCompletoPersona: "Jose Diaz",
    cupos: 15,
    status: "FINALIZADO",
    calificacion: 5,
  },
  {
    id: 14,
    nombreCompletoLocal: "Garage Burguer",
    idLocal: 2,
    nombreCompletoPersona: "Emiliano Lujan",
    cupos: 2,
    status: "FINALIZADO",
    calificacion: 0,
  },
  {
    id: 14,
    nombreCompletoLocal: "Teatro Del Anglo",
    idLocal: 6,
    nombreCompletoPersona: "Jose Diaz",
    cupos: 15,
    status: "PENDIENTE",
    calificacion: 5,
  },
];

class Reservas {
  constructor(nombreLocal, rubro, nombrePersona, cuposSeleccionados) {
    this.id = asignacionIdReservas();
    //evaluaria sacar el nombre completo del local ya que esta el id, ver si no afecta funcionalidad
    this.nombreCompletoLocal = nombreLocal;
    this.idLocal = Number("id que identifica al local");
    //por error se trabajo con string los id locales, se soluciona convirtiendo a number los mismos
    this.rubro = rubro;
    this.nombreCompletoPersona = nombrePersona;
    this.cupos = cuposSeleccionados;
    this.status = "PENDIENTE";
    this.calificacion = 0;
  }
}

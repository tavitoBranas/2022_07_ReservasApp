//Creacion del objeto Usuarios(tendremos algunos precargados)CORROBORAR DSP CON EL CONSTRUCTOR
const usuariosPersona = [
  {
    id: "1",
    nombreCompleto: "Gustavo Brañas",
    usuario: "eltavito",
    contraseña: "1",
    tipo: "persona",
  },
  {
    id: "2",
    nombreCompleto: "Emiliano Lujan",
    usuario: "elemi",
    contraseña: "1",
    tipo: "persona",
    //tenes 2 reserva en lo de pepe
  },
  {
    id: "3",
    nombreCompleto: "Jose Diaz",
    usuario: "eljose",
    contraseña: "1",
    tipo: "persona",
  },
  {
    id: "4",
    nombreCompleto: "Joaco Kam",
    usuario: "eljoaco",
    contraseña: "1",
    tipo: "persona",
  },
  {
    id: "5",
    nombreCompleto: "Mailen Arleo",
    usuario: "lamai",
    contraseña: "1",
    tipo: "persona",
  },
];

class registroPersona {
  constructor(nombre, nombreUsuario, contraseña) {
    this.id = asignacionId();
    this.nombreCompleto = nombre;
    this.usuario = nombreUsuario;
    this.contraseña = contraseña;
    this.reservas = [];
    this.tipo = "persona";
  }
}

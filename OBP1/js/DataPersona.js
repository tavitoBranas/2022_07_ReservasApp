//Creacion del objeto Usuarios(tendremos algunos precargados)CORROBORAR DSP CON EL CONSTRUCTOR
const usuariosPersona = [
  {
    id: "1",
    nombreCompleto: "Gustavo Brañas",
    usuario: "eltavito",
    contraseña: "Eltavito6",
    reservas: [],
    tipo: "persona",
  },
  {
    id: "2",
    nombreCompleto: "Emiliano Lujan",
    usuario: "elemi",
    contraseña: "ElEmi6",
    reservas: [],
    tipo: "persona",
  },
];



class registroPersona {
  constructor(id, nombre, nombreUsuario, contraseña) {
    this.id = asignacionId();
    this.nombre = nombre;
    this.nombreUsuario = nombreUsuario;
    this.contraseña = contraseña;
    this.tipo = "persona";
  }
}



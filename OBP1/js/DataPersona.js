//Creacion del objeto Usuarios
const usuariosPersona = [
  {
    id: "1",
    nombreCompleto: "Gustavo Brañas",
    usuario: "eltavito",
    contraseña: "1",
    tipo: "persona",
    //3 reservas FINALIZADAS en Lo de pepe (CALIFICADO), Garage Burguer y El tinglado (ambos sin CALIFICAR)
    //1 reserva PENDIENTE en Louvre
    //1 reserva CANCELADA en Lo de Pepe
  },
  {
    id: "2",
    nombreCompleto: "Emiliano Lujan",
    usuario: "elemi",
    contraseña: "1",
    tipo: "persona",
    //2 reservas PENDIENTE en Lo de Pepe y Garage Burguer
  },
  {
    id: "3",
    nombreCompleto: "Jose Diaz",
    usuario: "eljose",
    contraseña: "1",
    tipo: "persona",
    //3 reservas FINALIZADAS en Lo de Pepe y Louvre (ambos CALIFICADO), y Lisa (sin CALIFICAR)
    //2 reserva PENDIENTE en Louvre y Lo de Pepe
  },
  {
    id: "4",
    nombreCompleto: "Joaco Kam",
    usuario: "eljoaco",
    contraseña: "1",
    tipo: "persona",
    //1 reserva FINALIZADA en El Galpon (CALIFICADO)
    //1 reserva PENDIENTE en Museo del Prado
    //1 reserva CANCELADA en Museo del Prado
  },
  {
    id: "5",
    nombreCompleto: "Mailen Arleo",
    usuario: "lamai",
    contraseña: "1",
    tipo: "persona",
    //1 reserva FINALIZADA en Louvre (CALIFICADO)
    //1 reserva PENDIENTE en Lo de Pepe
    //1 reserva CANCELADA en Lo de Pepe
  },
];

class RegistroPersona {
  constructor(nombre, nombreUsuario, contraseña) {
    this.id = asignacionId();
    this.nombreCompleto = nombre;
    this.usuario = nombreUsuario;
    this.contraseña = contraseña;
    this.reservas = [];
    this.tipo = "persona";
  }
}

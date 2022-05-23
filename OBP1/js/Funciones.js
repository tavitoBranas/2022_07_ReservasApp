// Cuando la persona escriba en el campo de contraseña muestre msj
miIngreso.onkeyup = function () {
  // Validar minuzcula
  let lowerCaseLetters = /[a-z]/g; //no entiendo esto (idem para lo de abajo)
  if (miIngreso.value.match(lowerCaseLetters)) {
    letra.classList.remove("no");
    letra.classList.add("si");
  } else {
    letra.classList.remove("si");
    letra.classList.add("no");
  }
  // Validar mayuscula
  let upperCaseLetters = /[A-Z]/g;
  if (miIngreso.value.match(upperCaseLetters)) {
    may.classList.remove("no");
    may.classList.add("si");
  } else {
    may.classList.remove("si");
    may.classList.add("no");
  }
  // Validar numberos
  let nums = /[0-9]/g;
  if (miIngreso.value.match(nums)) {
    num.classList.remove("no");
    num.classList.add("si");
  } else {
    num.classList.remove("si");
    num.classList.add("no");
  }
  // Validar largo
  if (miIngreso.value.length >= 6 && miIngreso.value.length <= 12) {
    largo.classList.remove("no");
    largo.classList.add("si");
  } else {
    largo.classList.remove("si");
    largo.classList.add("no");
  }
};

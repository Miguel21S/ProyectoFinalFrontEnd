
export const validame = (type, value) => {
  switch (type) {
    case "name":
    case "nombre":
    case "cognom":
      if (value.length < 3) {
        return "El nombre debe tener al menos tres caracteres.";
      }
      return "";

    case "apellido":
      if (value.length < 3) {
        return "El apellido debe tener al menos tres caracteres.";
      }
      return "";

    case "email":
    case "e-mail":
    case "correo":
    case "mail":
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!emailRegex.test(value)) {
        return "El email debe cumplir con el formato: ejemplo@dominio.com.";
      }
      return "";

    case "password":
    case "contraseña":
      const passwordRegex = /^(?=.*\d)(?=.*[!\"#\$%&'()*+,-./:;<=>?@[\\\]^_])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/;
      if (!passwordRegex.test(value)) {
        return "La contraseña debe tener + de 7 letras y al menos un número, un carácter especial, una letra mayúscula y una minúscula.";
      }
      return "";

    default:
      console.log("Tipo de validación desconocido.");
      return "Error de validación.";
  }
};

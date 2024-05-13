
export const validame = (type, value) => {
    switch (type) {
      case "name":
      case "nombre":
      case "apellido":
      case "cognom":
        if (value.length < 3) {
          return "Nombres minimo tres caracteres.";
        }
        return "";
  
      case "email":
      case "e-mail":
      case "correo":
      case "mail":
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!emailRegex.test(value)) {
          return "emailvalido@ejemplo.com";
        }
        return "";
  
      case "password":
      case "contraseña":
        const passwordRegex = /^(?=.*\d)(?=.*[!\"#\$%&'()*+,-./:;<=>?@[\\\]^_])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/;
        if (!passwordRegex.test(value)) {
          return "Contraseña12.@ > 7";
        }
        return "";
  
      default:
        console.log("Tipo de validación desconocido.");
        return "Error de validación.";
    }
  };
  

const root = "http://localhost:2100/api/";

////////////////  RUTA REGISTRARSE  /////////////////////////////
export const RegitrarUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }

    try {
        const response = await fetch(`${root}auth/register`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        return data;

    } catch (error) {
        return error;
    }
}

////////////////  RUTA LOGIN  /////////////////////////////
export const LoginUsuario = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }

    try {
        const response = await fetch(`${root}auth/loguear`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

//________________________________________________________________________________________________________________________________//
// -------------------------  RUTAS DE USUARIO  -----------------------------//
////////////////  RUTA LISTAR TODOS LOS USUARIOS DEL SISTEMA  /////////////////////////////
export const ListarUsuarios = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }

    try {
        const response = await fetch(`${root}users`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

////////////////  RUTA ACTUALIZAR USUARIO POR ID   /////////////////////////////
export const ActualizarUsuario = async (IdUsuario, data, token) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(`${root}users/profile/${IdUsuario}`, options);

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

////////////////  RUTA ELIMINAR USUARIO POR ID  /////////////////////////////
export const EliminarUsuario = async (id, token) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(`${root}users/${id}`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

//________________________________________________________________________________________________________________________________//
// -------------------------  RUTAS DE VUELO  -----------------------------//
////////////////  RUTA LISTAR VUELO  /////////////////////////////
export const ListaDeVuelos = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }

    try {
        const response = await fetch(`${root}auth/vuelo`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }

}

////////////////  RUTA ADICIONAR VUELO  /////////////////////////////
export const AdicionarVuelo = async (data, token) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    }

    try {
        const response = await fetch(`${root}auth/vuelo`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }

}

////////////////  RUTA EDITAR VUELO  /////////////////////////////
export const ActualizarVuelo = async (idVuelo, data, token) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(`${root}auth/vuelo/${idVuelo}`, options);
        const data = await response.json();
        console.log("DELA RUTA", data)
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
}

////////////////  RUTA ELIMINAR VUELO POR ID  /////////////////////////////
export const EliminarVuelo = async (id, token) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }

    try {
        const response = await fetch(`${root}auth/vuelo/${id}`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

//________________________________________________________________________________________________________________________________//
// -------------------------  RUTAS DE RESERVAS DE VUELO  -----------------------------//
////////////////  RUTA LISTAR RESERVAS DE VUELO  /////////////////////////////
export const ListarReservasVuelo = async (token) => {
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }
    try {
        const response = await fetch(`${root}lista/reserva/vuelo`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
}

////////////////  RUTA HACER RESERVAS DE VUELO  /////////////////////////////  AUN NO TIENE FUNCIONALIDAD
export const HacerReservaVuelo = async (id, data, token) => {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    }

    try {
        const response = await fetch(`${root}reserva/vuelo/${id}`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
}

////////////////  RUTA EDITAR RESERVAS DE VUELO  /////////////////////////////
export const EditarReservaVuelo = async (id, data, token) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    }
    try {
        const response = await fetch(`${root}reserva/vuelo/${id}`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }

}

////////////////  RUTA ELIMINAR RESERVAS DE VUELO  /////////////////////////////
export const EliminarReservaVuelo = async (id, token) =>{
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }
    try {
        const response = fetch(`${root}reserva/vuelo/${id}`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

//________________________________________________________________________________________________________________________________//
// -------------------------  RUTAS DE ALOJAMIENTOS  -----------------------------//
////////////////  RUTA LISTAR ALOJAMIENTOS  /////////////////////////////
export const ListaDeAlojamientos = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }

    try {
        const response = await fetch(`${root}auth/alojamiento`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }

}

////////////////  RUTA CREAR ALOJAMIENTO  /////////////////////////////
export const CrearAlojamiento = async (data, token) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(`${root}auth/alojamiento`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
}

////////////////  RUTA ACTUALIZAR ALOJAMIENTO  /////////////////////////////
export const ActualizarAlojamiento = async (id, data, token) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(`${root}auth/alojamiento/${id}`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
}

////////////////  RUTA ELIMINAR ALOJAMIENTO POR ID /////////////////////////////
export const EliminarAjamiento = async (id, token) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }

    try {
        const response = await fetch(`${root}auth/alojamiento/${id}`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

//________________________________________________________________________________________________________________________________//
// -------------------------  RUTAS DE ALOJAMIENTOS  -----------------------------//
////////////////  RUTA LISTAR RESERVA DE ALOJAMIENTOS  /////////////////////////////
export const ListaReservaAlojamiento = async (token)=>{
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }
    try {
        const response = await fetch(`${root}reserva`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

////////////////  RUTA HACER RESERVA DE ALOJAMIENTOS  /////////////////////////////
export const HacerReservaAlojamiento = async (id, data, token) =>{
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    }
    try {
        const response = fetch(`${root}crear/reserva/${id}`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }

}

////////////////  RUTA ACTUALIZAR RESERVA DE ALOJAMIENTOS  /////////////////////////////
export const EditarReservaAlojamiento = async (id, data, token) =>{
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    }

    try {
        const response = fetch(`${root}actualizar/reserva/${id}`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

////////////////  RUTA ELIMINAR RESERVA DE ALOJAMIENTOS  /////////////////////////////
export const EliminarReservaAlojamiento = async (id, token) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }

    try {
        const response = fetch(`${root}eliminar/reserva/${id}`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}
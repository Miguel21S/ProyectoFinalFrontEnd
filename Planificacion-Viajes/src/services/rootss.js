
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

////////////////  RUTA LISTAR VUELO  /////////////////////////////
export const ListaDeVuelos = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
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
export const ActualizarVuelo = async(data, token) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(`${root}auth/vuelo`, options);
        console.log(response)
        const data = await response.json();
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
export const EliminarAjamiento = async (id, token) =>{
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
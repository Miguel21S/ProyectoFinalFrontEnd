
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

////////////////  RUTA LOGIN  /////////////////////////////
export const LoginUsuario = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }
    console.log("SOY USER DE ROOT", user)
    try {
        const response = await fetch(`${root}auth/loguear`, options);
        console.log("SOY RESPONSE DE ROOT", response)

        const data = await response.json();
        console.log("SOY DATA DE ROOT", data)

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
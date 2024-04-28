
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
        const data = response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

////////////////  RUTA LOGIN  /////////////////////////////
export const Login = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }

    try {
        const response = await fetch(`${root}auth/loguear`, options);
        const data = response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}
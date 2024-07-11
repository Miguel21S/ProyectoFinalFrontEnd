
const root = "http://localhost:2100/api/";

////////////////  RUTA REGISTRARSE  /////////////////////////////
export const RegisterUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer ${user}"
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
export const LoginUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }

    try {
        const response = await fetch(`${root}auth/login`, options);
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
export const ListUsers = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }

    try {
        const response = await fetch(`${root}list/users`, options);
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
export const UpdateUser = async (IdUsuario, data, token) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(`${root}update/users/profile/${IdUsuario}`, options);
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
export const DeleteUser = async (id, token) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(`${root}delete/users/${id}`, options);
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
// -------------------------  RUTAS PERFIL DE USUARIO  -----------------------------//
////////////////  RUTA MI PERFIL  /////////////////////////////
export const MyProfile = async (token) =>{
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}user/profile`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
}

////////////////  RUTA LISTAR MI RESERVAS DE VUELOS  /////////////////////////////
export const MyReserveFlight = async (token)=>{
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }

    try {
        const response = await fetch(`${root}list/reserve/flight/user`, options);
        const data = await response.json();
        if(!data.success){
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
        
    }
}

////////////////  RUTA ELIMINAR MI RESERVAS DE VUELO  /////////////////////////////
export const DeleteMyReserveFlight = async (id, token)=>{
    const options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }
    console.log("SOLO root: ")

    try {
        const response = await fetch(`${root}delete/reserve/flight/profile/${id}`, options);
        const data = await response.json();
        
        if(!data.success){
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;        
    }
}

////////////////  RUTA LISTAR MI RESERVAS DE ALOJAMIENTOS  /////////////////////////////
export const MyReserveAccommodation = async (token)=>{
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }

    try {
        const response = await fetch(`${root}my/list/reserve/accommodation/user`, options);
        const data = await response.json();
        if(!data.success){
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
        
    }
}

////////////////  RUTA ELIMINAR MI RESERVAS DE ALOJAMIETNO  /////////////////////////////
export const DeleteMyReserveAccommodation = async (_id, token) =>{
    const options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application",
            "Authorization": `Bearer ${token}`,
        }
    }
    try {
        const response = await fetch(`${root}delete/reserve/accommodation/profile/${_id}`, options);
        const data = await response.json();
        
        if(!data.success){
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
}

///   ________________________________________   FIN RUTAS DEL PERFIL DE USUARIO   ______________________________________________   ///

//________________________________________________________________________________________________________________________________//
// -------------------------  RUTAS DE VUELO  -----------------------------//
////////////////  RUTA LISTAR VUELO  /////////////////////////////
export const ListFlights = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }
    try {
        const response = await fetch(`${root}list/flight`, options);
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
export const AddFlight = async (data, token) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    }

    try {
        const response = await fetch(`${root}add/flight`, options);
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
export const Updateflight = async (idVuelo, data, token) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(`${root}update/flight/${idVuelo}`, options);
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
export const DeleteFlight = async (id, token) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(`${root}delete/flight/${id}`, options);
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
export const ListReserveFlights = async (token) => {
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }
    try {
        const response = await fetch(`${root}list/reserve/flight/admin`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
}

////////////////  RUTA HACER RESERVAS DE VUELO  /////////////////////////////
export const MakeReservationFlight = async (idVuelo, data, token) => {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    }

    try {
        const response = await fetch(`${root}create/reserve/flight/${idVuelo}`, options);
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
/** 
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
    */

////////////////  RUTA ELIMINAR RESERVAS DE VUELO  /////////////////////////////
export const DeleteReservationFlight = async (id, token) =>{
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }
    try {
        const response = await fetch(`${root}delete/reserve/flight/${id}`, options);
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
export const ListAccommodations = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }

    try {
        const response = await fetch(`${root}list/accommodation`, options);
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
export const CreateAccmmodation = async (data, token) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(`${root}create/accommodation`, options);
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
export const UpdateAccmmodation = async (id, data, token) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(`${root}update/accommodation/${id}`, options);
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
export const DeleteAccommodation = async (id, token) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }

    try {
        const response = await fetch(`${root}deletee/accommodation/${id}`, options);
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
// -------------------------  RUTAS DE RESERVA DE ALOJAMIENTOS  -----------------------------//
////////////////  RUTA LISTAR RESERVA DE ALOJAMIENTOS  /////////////////////////////
export const ListReservationAccommodationAdmin = async (token)=>{
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }
    try {
        const response = await fetch(`${root}list/reserve/accommodation/admin`, options);
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
export const MakeReservationAccommodation = async (idAlojamiento, data, token) =>{
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    }
    try {
        const response = await fetch(`${root}create/reserve/accommodation/${idAlojamiento}`, options);
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
export const UpdateReservationAccommodation = async (id, data, token) =>{
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    }

    try {
        const response = await fetch(`${root}update/reserve/accommodation/${id}`, options);
        const data = await response.json();
        console.log("root: ", data)
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

////////////////  RUTA ELIMINAR RESERVA DE ALOJAMIENTOS  /////////////////////////////
export const DeleteReservationAccommodation = async (id, token) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }

    try {
        const response = await fetch(`${root}delete/reserve/accommodation/${id}`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}
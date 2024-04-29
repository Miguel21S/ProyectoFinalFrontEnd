
import { useNavigate } from "react-router-dom"
import "./GestionUsuario.css"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { ListarUsuarios } from "../../services/rootss";

export const GestionUsuario = () => {
    const [usuario, setUsuario] = useState({})

    const navigate = useNavigate();

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/")
        }
    }, [rdxUsuario]);

    // const [editandoUsuarios, setEditandoUsuarios] = useState({});
    // const inputHandler = (e, _id) => {
    //     const { name, value } = e.target;
    //     const updatedUsuarios = usuario.map(usuario => {
    //         if (usuario._id === _id) {
    //             return { ...usuario, [name]: value };
    //         }
    //         return usuario;
    //     });
    //     setUsuario(updatedUsuarios);
    //     setEditandoUsuarios(prevState => ({ ...prevState, [id]: true }));
    // };


    useEffect(() => {
        const todosSuarios = async () => {
            try {
                const listaUsuarios = await ListarUsuarios(token);
                setUsuario(listaUsuarios.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        todosSuarios();
    }, [token])

    return (
        <>
            <div className="gestio-design">
                <div className="titulo">
                    <h2>Usuarios</h2>
                </div>

                <div className="tablaEditable">
                    {
                        usuario?.length > 0 ? (
                            <>
                                <tabla>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            usuario.map((usuario) => (
                                                <tr key={usuario._id}>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={usuario.name}
                                                            // onChange={e => inputHandler(e, usuario._id)}
                                                            // readOnly={!editandoUsuarios[usuario._id]}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="email"
                                                            value={usuario.email}
                                                            // onChange={e => inputHandler(e, usuario._id)}
                                                            // readOnly={!editandoUsuarios[usuario._id]}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="role"
                                                            value={usuario.role}
                                                            // onChange={e => inputHandler(e, usuario._id)}
                                                            // readOnly={!editandoUsuarios[usuario._id]}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </tabla>
                            </>
                        )
                        :
                        (
                            <div>No hay usuarios disponibles</div>
                        )
                    }

                </div>
            </div >
        </>
    )
}

// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import "./Header.css"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { logout, userData } from "../../app/slices/userSlice";
import { updateCriteria } from "../../app/slices/seachSlice";
import { CInput } from "../CInput/CInput";
import { CLink } from '../CLink/CLink';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
// import { color } from '@mui/system';

// import { useNavigate } from "react-router-dom";



export const Header = () => {
    const [criteria, setCriteria] = useState("");
    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const navigate = useNavigate();
    const rdxUsuario = useSelector(userData);
    const dispatch = useDispatch();

    useEffect(() => { }, [rdxUsuario]);

    const searchHandler = (e) => {
        setCriteria(e.target.value)
    }

    useEffect(() => {
        if (criteria !== "") {
            //guardo en redux.....
            dispatch(updateCriteria(criteria))
        }
    }, [criteria])

    return (
        <>
            <div className="header-design">
                <div className="header-wrapperr">
                    <div className="row">
                        {
                            rdxUsuario.credentials?.token ?
                                (
                                    <>
                                        {
                                            rdxUsuario?.credentials?.usuario?.usuarioRole === "superAdmin" ?
                                                <>
                                                    <div className="content-usuario">
                                                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                            <Grid item xs={15}>

                                                                <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                                    <Grid item xs={6}>
                                                                        <div className="col col-header">
                                                                            <div className="header-principal-top-home">
                                                                                <CLink path="/" title={<span>Home <i className="bi bi-house"></i></span>} />
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                        <div className="col col-header">

                                                                            <NavDropdown className='nav-drop' title={<span>Administración <i className="bi bi-gear-wide-connected"></i></span>} id="navbarScrollingDropdown">
                                                                                <NavDropdown.Item className="item">
                                                                                    <CLink path="/gestionusaurio" title="Usuarios"></CLink>
                                                                                    <CLink path="/gestionvuelo" title="Vuelos"></CLink>
                                                                                    <CLink path="/gestionalojamiento" title="Alojamientos"></CLink>
                                                                                </NavDropdown.Item>
                                                                                <NavDropdown.Divider />

                                                                                <NavDropdown.Item className="item">
                                                                                    <CLink path="/gestionreservavuelo" title="Reserva de vuelos"></CLink>
                                                                                    <NavDropdown.Divider />
                                                                                    <CLink path="/gestionDeReservaAlojamientos" title="Reserva de Alojamientos"></CLink>
                                                                                </NavDropdown.Item>
                                                                                <NavDropdown.Divider />
                                                                                {/* <NavDropdown.Item className="item">
                                                                                    Something else here
                                                                                </NavDropdown.Item> */}
                                                                            </NavDropdown>

                                                                            <NavDropdown className='nav-drop' title={rdxUsuario.credentials.usuario.name} id="navbarScrollingDropdown">
                                                                                <NavDropdown.Item className="item">
                                                                                    <CLink path="/perfilusuario" className="item" title="Perfil" />
                                                                                </NavDropdown.Item>
                                                                                <NavDropdown.Divider />
                                                                                {/* <NavDropdown.Item className="item">
                                                                                    <CLink path="/" title="Re"></CLink>
                                                                                </NavDropdown.Item>
                                                                                <NavDropdown.Item className="item">
                                                                                    <CLink path="/" title="Vuelos"></CLink>
                                                                                </NavDropdown.Item>
                                                                                <NavDropdown.Divider /> */}
                                                                                <NavDropdown.Item className="salir">
                                                                                    <div className="header-rigth" onClick={() => dispatch(logout({ credentials: "" }))}>
                                                                                        <div onClick={() => navigate("/login")}>
                                                                                            Salir <i className="bi bi-power"></i>
                                                                                        </div>
                                                                                    </div>
                                                                                </NavDropdown.Item>
                                                                            </NavDropdown>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>

                                                            </Grid>
                                                            <Grid item xs={15}>

                                                                <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                                    <Grid item xs={15}>
                                                                        <Grid item xs={15}>
                                                                            <div className="header-secundario-navegate">
                                                                                <CLink path="/todosvuelos/destino" title={<span>Vuelos <i className="bi bi-airplane"></i></span>} />
                                                                                <CLink path="/todosalojamientos" title={<span>Alojamientos <i className="bi bi-cake"></i></span>} />
                                                                                <CLink path="/" title={<span>Planificador <i className="bi bi-calendar-check"></i></span>} />
                                                                            </div>
                                                                        </Grid>
                                                                        <div className="buscador">
                                                                            <div id='col-center' className="col col-header">
                                                                                <div className="header-center">
                                                                                    <CInput
                                                                                        type="text"
                                                                                        name="criteria"
                                                                                        placeholder="Buscar usuario..."
                                                                                        value={criteria || ""}
                                                                                        changeEmit={searchHandler}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>

                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className="content-usuario">
                                                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                            <Grid item xs={15}>

                                                                <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                                    <Grid item xs={6}>
                                                                        <div className="col col-header">
                                                                            <div className="header-principal-top-home">
                                                                                <CLink path="/" title={<span>Home <i className="bi bi-house"></i></span>} />
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                        <div className="col col-header">
                                                                            <NavDropdown className='nav-drop' title={rdxUsuario.credentials.usuario.name} id="navbarScrollingDropdown">
                                                                                <NavDropdown.Item className="item">
                                                                                    <CLink path="/perfilusuario" className="item" title="Perfil" />
                                                                                </NavDropdown.Item>
                                                                                {/* <NavDropdown.Divider />
                                                                                <NavDropdown.Item className="item">
                                                                                    <CLink path="/" title="Vo pensar"></CLink>
                                                                                </NavDropdown.Item>
                                                                                <NavDropdown.Item className="item">
                                                                                    <CLink path="/" title="Planos"></CLink>
                                                                                </NavDropdown.Item>
                                                                                <NavDropdown.Divider /> */}
                                                                                <NavDropdown.Item className="salir">
                                                                                    <div className="header-rigth" onClick={() => dispatch(logout({ credentials: "" }))}>
                                                                                        <div onClick={() => navigate("/login")}>
                                                                                            Salir <i className="bi bi-power"></i>
                                                                                        </div>
                                                                                    </div>
                                                                                </NavDropdown.Item>
                                                                            </NavDropdown>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={15}>
                                                                        <div className="header-secundario-navegate">
                                                                            <CLink path="/todosvuelos/destino" title={<span>Vuelo <i className="bi bi-airplane"></i></span>} />
                                                                            <CLink path="/todosalojamientos" title={<span>Alojamientos <i className="bi bi-cake"></i></span>} />
                                                                            <CLink path="/" title={<span>Planificador <i className="bi bi-calendar-check"></i></span>} />
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>

                                                            </Grid>
                                                            <Grid item xs={15}>

                                                                <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                                    <Grid item xs={15}>
                                                                        <div className="buscador">
                                                                            <div id='col-center' className="col">
                                                                                <div className="header-center">
                                                                                    <CInput
                                                                                        type="text"
                                                                                        name="criteria"
                                                                                        placeholder="Buscar usuario..."
                                                                                        value={criteria || ""}
                                                                                        changeEmit={searchHandler}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>

                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </>
                                        }
                                    </>
                                )
                                :
                                (
                                    <>
                                        <div className="content-logaut">
                                            <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                <Grid item xs={15}>
                                                    <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                        <Grid item xs={6}>
                                                            <div className="col col-header">
                                                                <div className="header-principal-top-home">
                                                                    <CLink path="/" title={<span>Home <i className="bi bi-house"></i></span>} />
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <div className="col col-header">
                                                                <div className="header-secundario-top-resistLogin">
                                                                    <CLink path="/login" title={<span>Iniciar Sesión <i className="bi bi-person-plus"></i></span>} />
                                                                    <CLink path="/registrar" title={<span>Registrarse <i className="bi bi-person"></i></span>} />
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={15}>
                                                    {!window.location.pathname.includes("/login") && !window.location.pathname.includes("/registrar") && ( // Condición para no mostrar el buscador en la página de inicio de sesión
                                                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                            <Grid item xs={15}>
                                                                <Grid item xs={15}>
                                                                    <div className="header-secundario-navegate">
                                                                        <CLink path="/todosvuelos/destino" title={<span>Vuelo <i className="bi bi-airplane"></i></span>} />
                                                                        <CLink path="/todosalojamientos" title={<span>Alojamientos <i className="bi bi-cake"></i></span>} />
                                                                        <CLink path="/" title={<span>Planificador <i className="bi bi-calendar-check"></i></span>} />
                                                                    </div>
                                                                </Grid>
                                                                <div className="buscador">
                                                                    <div id='col-center' className="col">
                                                                        <div className="header-center">
                                                                            <CInput
                                                                                type="text"
                                                                                name="criteria"
                                                                                placeholder="Buscar usuario..."
                                                                                value={criteria || ""}
                                                                                changeEmit={searchHandler}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </>
                                )
                        }

                    </div>
                </div>
            </div >
        </>
    );
}
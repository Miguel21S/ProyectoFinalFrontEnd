// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import "./Header.css"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { login, logout, userData } from "../../app/slices/userSlice";
import { updateCriteria } from "../../app/slices/seachSlice";
import { CInput } from "../CInput/CInput";
import { CLink } from '../CLink/CLink';
import { useNavigate } from 'react-router-dom';

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

                        <div className="col">
                            <div className="header-left">
                                {
                                    <CLink path="/" title="Home" />
                                }
                                <NavDropdown className='nav-drop' title="Link" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </div>

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

                        <div id='col' className="col">
                            <div className="header-rigth" onClick={() => dispatch(logout({ criterial: "" }))}>
                                <div onClick={() => { navigate("/login") }}>
                                    Salir
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
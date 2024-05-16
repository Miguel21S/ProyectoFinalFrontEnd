
import "./Vuelos.css"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
// import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListaDeVuelos } from "../../services/rootss";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import CTextField from "../../common/CTextField/CTextField";
// import { TextField } from "@mui/material";

export const Vuelos = () => {
    const navigate = useNavigate();
    const [vuelos, setVuelo] = useState({});

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/todosvuelos/destino")
        }
    }, [rdxUsuario]);

    useEffect(() => {
        const listaDeVuelosDestino = async () => {
            try {
                const listaVuelos = await ListaDeVuelos(token);
                const agruparVuelos = {};

                listaVuelos.data.forEach(vuelos => {
                    if (!agruparVuelos[vuelos.destino]) {
                        agruparVuelos[vuelos.destino] = [];
                    }
                    agruparVuelos[vuelos.destino].push(vuelos);

                });
                setVuelo(agruparVuelos);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaDeVuelosDestino();
    }, [token])

    return (
        <>
            <div className="gestioVuelos-destino">
                <div className="titulo-Vuelo">
                    <h2>Destinos de vuelos</h2>
                </div>

                <div className="content-Vuelo">

                    <div className="card-principal">
                        <div className="row">
                            <div className="card-hijo">
                                <Grid container spacing={2}> {/* Espacio entre los elementos */}
                                    {Object.keys(vuelos).map(destino => (
                                        <Grid item xs={12} sm={6} lg={3} key={destino}> {/* Tamaño de las columnas */}
                                            <div className="custom-column mb-3">
                                                <Card sx={{ maxWidth: 345 }} className="content-vuelo">

                                                    {vuelos[destino].map(vueloItem => (
                                                        <Link key={vueloItem._id} to={`/vuelos/${vueloItem.origen}/${vueloItem.destino}`} className="mx-3">
                                                            <CardActionArea>
                                                                <CardContent>
                                                                    <Typography gutterBottom variant="h5" component="div">
                                                                        {destino}
                                                                    </Typography>
                                                                </CardContent>
                                                                {/* <CardMedia
                                                        component="img"
                                                        height="140"
                                                        image="/static/images/cards/contemplative-reptile.jpg"
                                                        alt="green iguana" 
                                                         /> */}
                                                            </CardActionArea>
                                                            {/* <div className="text-center">
                                                            <h5 className="mt-2">{`${vueloItem.origen} - ${vueloItem.destino}`}</h5>
                                                        </div>
                                                        <div className="vmb-4">
                                                            <img src="./src/img/av1.jpg" className="imge" alt={vueloItem.name} />
                                                        </div> */}
                                                        </Link>
                                                    ))}
                                                </Card>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

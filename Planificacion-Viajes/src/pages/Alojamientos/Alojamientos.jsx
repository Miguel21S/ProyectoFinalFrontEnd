
import { useNavigate, Link } from "react-router-dom"
import "./Alojamientos.css"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListAccommodations } from "../../services/rootss";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";

export const Alojamientos = () => {
    const navigate = useNavigate();
    const [alojamiento, setAlojamiento] = useState({});

    /////////////  INSTACIA DE CONEXIÓN A MODO LECTURA   ////////////////
    const rdxUsuario = useSelector(userData);
    const token = rdxUsuario.credentials.token;

    useEffect(() => {
        if (!rdxUsuario.credentials.token) {
            navigate("/todosalojamientos")
        }
    }, [rdxUsuario]);

    /////////////////////  LISTAR ALOJAMIENTOS  /////////////////////////////
    useEffect(() => {
        const listaDeAlojamientos = async () => {
            try {
                const listaAlojamientos = await ListAccommodations(token);
                const agruparAlojamientos = {};

                listaAlojamientos.data.forEach(alojamiento => {
                    if (!agruparAlojamientos[alojamiento.city]) {
                        agruparAlojamientos[alojamiento.city] = [];
                    }
                    agruparAlojamientos[alojamiento.city].push(alojamiento);

                });
                setAlojamiento(agruparAlojamientos);
                // console.log("agruparAlojamientos", agruparAlojamientos)
            } catch (error) {
                console.log("Error:", error);
            }
        }
        listaDeAlojamientos();
    }, [token])


    return (
        <>
            <div className="gestioAlojamientos-ciudad">
                <div className="titulo-Aloja">
                    <h2>Alojamientos por ciudades</h2>
                </div>

                <div className="content-Aloja">

                    <div className="card-principal">
                        <div className="row">
                            <div className="card-hijo">
                                <Grid container spacing={2}>
                                    {
                                        Object.keys(alojamiento).map(localidad => (
                                            <Grid item xs={12} sm={6} lg={3} key={localidad}>
                                                <div key={localidad} className="custom-column mb-3">
                                                    <Card sx={{ maxWidth: 345 }} className="content-ciudad">

                                                        {alojamiento[localidad].map(alojamientoItem => (
                                                            <Link key={alojamientoItem._id} to={`/alojamientos/${alojamientoItem.city}`} className="mx-3"
                                                                style={{ textDecoration: 'none', color: 'inherit' }}>
                                                                {console.log("alojamientoItem.ciudad: ", `/alojamientos/${alojamientoItem.city}`)}

                                                                <CardActionArea>
                                                                    <CardContent>
                                                                        <Typography gutterBottom variant="h5" component="div">
                                                                            {alojamientoItem.city}
                                                                        </Typography>
                                                                    </CardContent>
                                                                    {/* <CardMedia
                                                                        component="img"
                                                                        height="140"
                                                                        image="/static/images/cards/contemplative-reptile.jpg"
                                                                        alt="green iguana" 
                                                                        /> */}
                                                                </CardActionArea>

                                                            </Link>
                                                        ))}
                                                    </Card>
                                                </div>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

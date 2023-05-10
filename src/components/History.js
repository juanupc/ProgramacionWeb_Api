import React, { useEffect, useState } from "react";
import axios from "axios";

const Winners = ({ winner }) => {
    const url = "https://6453b15bc18adbbdfea4cf77.mockapi.io/winner/winners";
    const [Ganador, setGanador] = useState([]);
    const [render, setRender] = useState(false);
    console.log(winner);

    useEffect(() => {
        if (winner !== "") {
            axios.post(url, { name: winner }).then(() => {
                alert("Fin de la partida");
                setRender(true);
            });
        }
    }, [winner]);

    useEffect(() => {
        axios.get(url).then((response) => setGanador(response.data));
    }, [render]);
    return (
        <div>
            <h1> Lista de ganadores </h1>
            {Ganador.map((ganador) => (
                <p key={ganador.id}>
                    {" Ganador: " + ganador.name + " " + "Fecha: " + ganador.fecha}
                </p>
            ))}
        </div>
    );
};
export default Winners;

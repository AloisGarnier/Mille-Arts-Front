import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import Commands from "./Commands";

import favicon from '../img/favicon.png'

export default function CommandController(props) {
    
    const [toDoCommands, setToDoCommands] = useState([]);
    const [toDeliverCommands, setToDeliverCommands] = useState([]);
    const [doneCommands, setDoneCommands] = useState([]);

    useEffect(() => fetchCommands(), []);

    const backUrl = props.domain + "/commands/";

    function fetchCommands() {
        fetch(backUrl + "todo")
            .then(response => response.json())
            .then(json => setToDoCommands(json));

        fetch(backUrl + "todeliver")
            .then(response => response.json())
            .then(json => setToDeliverCommands(json));

        fetch(backUrl + "done")
            .then(response => response.json())
            .then(json => setDoneCommands(json));
    }

    return(
        <>
            <Helmet>
                <title>{"Gestion des commandes - Mille-Arts"}</title>
                <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Gestion des commandes" />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>
            <Commands
                toDoCommands = {toDoCommands}
                toDeliverCommands = {toDeliverCommands}
                doneCommands = {doneCommands}
            />
        </>
    );

}
import React, { useEffect } from "react";

import Catalog from "./Catalog";
import favicon from '../img/favicon.png'

import { Helmet } from "react-helmet";

export default function NewController(props) {

    useEffect(() => {
        fetchDecorations();
    }, []);

    const backUrl = "http://" + props.domain + ":8081/catalog";

    function fetchDecorations() {

        fetch(backUrl + "/novelties")
            .then(response => response.json())
            .then(json => props.setDecorations(json));
    }

    return(
        <>
            <Helmet>
                <title>Nouveautés - Mille Arts</title>
                <meta name="description" content="Décorations de Noël et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Venez dans ma boutique en-ligne pour découvrir plein de nouveaux objets décoratifs" />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>
            <Catalog owner={props.owner} decorations={props.decorations} basket={props.basket} setBasket={props.setBasket}></Catalog>
        </>
    );
}
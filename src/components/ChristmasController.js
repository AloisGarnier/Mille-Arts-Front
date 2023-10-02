import React, { useEffect } from "react";

import Catalog from "./Catalog";

import { Helmet } from "react-helmet";

import christmasBg from "../img/christmas-bg.png";
import faviconXmas from "../img/favicon-xmas.png";

export default function ChristmasController(props) {

    useEffect(() => {
        fetchDecorations();
        props.setThemeBackground(christmasBg);
    }, []);

    const backUrl = "http://" + props.domain + ":8081/catalog";

    function fetchDecorations() {
        fetch(backUrl + "/noel")
            .then(response => response.json())
            .then(json => props.setDecorations(json))
    }

    return(
        <>
            <Helmet>
                <title>Noël - Mille Arts</title>
                <meta name="description" content="Décorations de Noël et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Venez dans ma boutique en-ligne pour acheter plein d'objets décoratifs en attendant le Père Noël" />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={faviconXmas} />
            </Helmet>
            <Catalog owner={props.owner} decorations={props.decorations} basket={props.basket} setBasket={props.setBasket}></Catalog>
        </>
    );

}
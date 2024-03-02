import React, { useEffect } from "react";

import Catalog from "./Catalog";

import { Helmet } from "react-helmet";

import christmasBg from "../img/christmas-bg.png";
import favicon from "../img/favicon.png";

export default function ChristmasController(props) {

    useEffect(() => {
        fetchDecorations();
        props.setThemeBackground(christmasBg);
        props.setChristmas(true);
    }, []);

    const backUrl = "http://" + props.domain + ":8081/catalog";
    const favUrl = "http://" + props.domain + "8081/favourites";

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
                <link rel="icon" href={favicon} />
            </Helmet>
            <Catalog owner={props.owner} 
                    decorations={props.decorations} 
                    basket={props.basket} 
                    setBasket={props.setBasket}
                    favourites = {props.favourites}
                    setFavourites = {props.setFavourites}
                    isLightTheme = {props.isLightTheme}
                    isChristmas = {props.isChristmas}
                    setChristmas = {props.setChristmas}>
            </Catalog>
        </>
    );

}
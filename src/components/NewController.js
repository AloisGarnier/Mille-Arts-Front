import React, { useEffect } from "react";

import Catalog from "./Catalog";
import favicon from '../img/favicon.png'

import { Helmet } from "react-helmet";

export default function NewController(props) {

    useEffect(() => {
        fetchDecorations();
    }, []);
    useEffect(() => fetchAverages(), []);

    const backUrl = props.domain + "/catalog";
    const favUrl = props.domain + "/favourites/";
    const evalUrl = props.domain + "/evaluation/"

    function fetchDecorations() {

        fetch(backUrl + "/novelties")
            .then(response => response.json())
            .then(json => props.setDecorations(json));
    }

    function removeFromFavourites(deco) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(favUrl + "remove/" + props.owner.id + "/" + deco.id, requestOptions)
            .then(() => fetchFavourites())
    }

    function addToFavourites(deco) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(favUrl + "new/" + props.owner.id + "/" + deco.id, requestOptions)
            .then(() => fetchFavourites())
    }

    function fetchFavourites() {
        fetch(favUrl + props.owner.id + "/all")
            .then(response => response.json())
            .then(json => saveFavourites(json))
    }

    function saveFavourites(json) {
        props.setFavourites(json);
        window.localStorage.setItem("favourites", JSON.stringify(json))
    }

    function fetchAverages() {
        fetch(evalUrl + "all/ratings")
            .then(response => response.json())
            .then(json => props.setAverages(json))
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
            <Catalog 
                owner={props.owner} 
                decorations={props.decorations} 
                basket={props.basket} 
                setBasket={props.setBasket}
                favourites = {props.favourites}
                setFavourites = {props.setFavourites}
                averages = {props.averages}
                setAverages = {props.setAverages}
                isLightTheme = {props.isLightTheme}
                isChristmas = {props.isChristmas}
                setChristmas = {props.setChristmas}
                removeFromFavourites = {removeFromFavourites}
                addToFavourites = {addToFavourites}>
            </Catalog>
        </>
    );
}
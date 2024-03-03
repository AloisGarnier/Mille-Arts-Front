import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Catalog from "./Catalog";

import favicon from '../img/favicon.png'

export default function CatalogController(props) {

    useEffect(() => fetchAllDecorations(), []);

    const backUrl = props.domain + "/catalog/";
    const favUrl = props.domain + "/favourites/";

    function fetchAllDecorations() {
        fetch(backUrl + "all")
            .then(response => response.json())
            .then(json => props.setDecorations(json))
    }

    function deleteDecoration(deco) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(backUrl + deco.id + "/delete", requestOptions)
            .then(response => response.json())
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

    return(
        <>
            <Helmet>
                <title>Catalogue - Mille Arts</title>
                <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Tout mon catalogue se trouve ici : objets décoratifs, objets de Noël, etc." />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>
            <Catalog 
                owner={props.owner} 
                domain={props.domain} 
                decorations={props.decorations} 
                basket={props.basket} 
                setBasket={props.setBasket}
                deleteDecoration={deleteDecoration}
                favourites = {props.favourites}
                setFavourites = {props.setFavourites}
                isLightTheme = {props.isLightTheme}
                isChristmas = {props.isChristmas}
                setChristmas = {props.setChristmas}
                removeFromFavourites = {removeFromFavourites}
                addToFavourites = {addToFavourites}>
            </Catalog>
        </>
    );
}
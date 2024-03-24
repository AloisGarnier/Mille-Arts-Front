import React, { useEffect } from "react";

import Catalog from "./Catalog";

export default function ResearchController(props) {

    useEffect(() => {
        fetchDecorations();
    }, []);
    useEffect(() => fetchAverages(), []);


    const backUrl = props.domain + "/catalog";
    const favUrl = props.domain + "/favourites/";
    const evalUrl = props.domain + "/evaluation/"

    function fetchDecorations() {
        fetch(backUrl + "/" + location.search.substring(3))
            .then(response => response.json())
            .then(json => props.setDecorations(json))
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
        <Catalog 
            owner={props.owner} 
            decorations={props.decorations} 
            basket={props.basket} 
            setBasket={props.setBasket}
            favourites={props.favourites}
            setFavourites={props.setFavourites}
            isLightTheme = {props.isLightTheme}
            isChristmas = {props.isChristmas}
            setChristmas = {props.setChristmas}
            averages = {props.averages}
            setAverages = {props.setAverages}
            removeFromFavourites = {removeFromFavourites}
            addToFavourites = {addToFavourites}>
        </Catalog>
    );

}
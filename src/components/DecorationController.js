import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import Decoration from "./Decoration";

import favicon from '../img/favicon.png'

export default function DecorationController(props) {

    const [thisDecoration, setThisDecoration] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0);
    const [tags, setTags] = useState([]);
    const [tagDisplay, setTagDisplay] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [average, setAverage] = useState(0);
    const [evalNumber, setEvalNumber] = useState(0);

    useEffect(() => { fetchDecoration(); }, []);
    useEffect(() => { fetchAverage(); }, []);
    useEffect(() => { fetchEvalNumber(); }, []);

    const backUrl = props.domain + "/catalog/";
    const favUrl = props.domain + "/favourites/";
    const evalUrl = props.domain + "/evaluation/";

    function fetchDecoration() {

        fetch(backUrl + location.search.substring(4) + "/all")
            .then(response => response.json())
            .then(json => setThisDecoration(json))
        
        fetch(backUrl + location.search.substring(4) + "/pictures")
            .then(response => response.json())
            .then(json => setPictures(json));

        fetch(backUrl + location.search.substring(4) + "/price")
            .then(response => response.json())
            .then(json => setCurrentPrice(json));

        fetch(backUrl + location.search.substring(4) + "/tags")
            .then(response => response.json())
            .then(json => displayTags(json));
    }

    function fetchAverage() {
        fetch(evalUrl + "average/" + location.search.substring(4))
            .then(response => response.text())
            .then(text => setAverage(parseFloat(text)))
    }

    function fetchEvalNumber() {
        fetch(evalUrl + "evaluationNumber/" + location.search.substring(4))
        .then(response => response.text())
        .then(text => setEvalNumber(parseFloat(text)))
    }

    function modifyDecoration(id, name, picture1, picture2, picture3, description, price, preparationDelay, weight, dimensions, tag1, tag2, tag3) {
        let tempTags = [tag1, tag2, tag3];
        let tempTags2 = [];
        for(let i=0;i<3;i++) {
            if(tempTags[i]) {
                tempTags2.push(tempTags[i]);
            }
        }

        let tempPics = [picture1, picture2, picture3];
        let tempPics2 = [];
        for(let i=0;i<3;i++) {
            if(tempPics[i]) {
                tempPics2.push(tempPics[i]);
            }
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                name: name,
                pictures: tempPics2, 
                description: description, 
                preparationDelay: preparationDelay,
                weight: weight,
                dimensions: dimensions,
                price: price,
                tags: tempTags2
            })
        };
        fetch(backUrl + "modify", requestOptions)
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

    function displayTags(json) {
        let tempTags = ["", "", ""];
        let display = [];
        for(let i=0; i<json.length;i++) {
            tempTags[i] = json[i];
            display.push(
                <span class="badge my-badge rounded-pill bg-info mx-2">{json[i]}</span>
            );
        }
        setTags(tempTags);
        setTagDisplay(display);
    }

    return(
        <>
            <Helmet>
                <title>{thisDecoration.name + " - Mille-Arts"}</title>
                <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Page de décoration" />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>
            <Decoration
                owner = {props.owner}
                decoration={thisDecoration} 
                currentPrice={currentPrice}
                tags={tags}
                tagDisplay={tagDisplay}
                basket={props.basket}
                setBasket={props.setBasket}
                modifyDecoration={modifyDecoration}
                pictures={pictures}
                favourites={props.favourites}
                setFavourites={props.setFavourites}
                removeFromFavourites = {removeFromFavourites}
                addToFavourites = {addToFavourites}
                average = {average}
                setAverage = {setAverage}
                evalNumber = {evalNumber}
                setEvalNumber = {setEvalNumber}
                isLightTheme = {props.isLightTheme}
                isChristmas = {props.isChristmas}
                setChristmas = {props.setChristmas}
            />
        </>
    );
}
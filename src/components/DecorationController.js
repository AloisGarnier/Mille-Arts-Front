import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import Decoration from "./Decoration";

import favicon from '../img/favicon.png'

export default function DecorationController(props) {

    const [thisDecoration, setThisDecoration] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0);
    const [tags, setTags] = useState([]);
    const [tagDisplay, setTagDisplay] = useState([]);

    useEffect(() => {
        fetchDecoration();
    }, []);

    const backUrl = "http://" + props.domain + ":8081/catalog/";

    function fetchDecoration() {

        fetch(backUrl + location.search.substring(4) + "/all")
            .then(response => response.json())
            .then(json => setThisDecoration(json));

        fetch(backUrl + location.search.substring(4) + "/price")
            .then(response => response.json())
            .then(json => setCurrentPrice(json));

        fetch(backUrl + location.search.substring(4) + "/tags")
            .then(response => response.json())
            .then(json => displayTags(json));
    }

    function modifyDecoration(id, name, picture, description, price, preparationDelay, tag1, tag2, tag3) {
        let tempTags = [tag1, tag2, tag3];
        let tempTags2 = [];
        for(let i=0;i<3;i++) {
            if(tempTags[i]) {
                tempTags2.push(tempTags[i]);
            }
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                name: name,
                picture: picture, 
                description: description, 
                preparationDelay: preparationDelay,
                price: price,
                tags: tempTags2
            })
        };
        fetch(backUrl + "modify", requestOptions)
            .then(response => response.json())
    }

    function displayTags(json) {
        let tempTags = ["", "", ""];
        let display = [];
        for(let i=0; i<json.length;i++) {
            tempTags[i] = json[i];
            display.push(
                <span class="badge my-badge rounded-pill bg-secondary">{json[i]}</span>
            );
        }
        setTags(tempTags);
        setTagDisplay(display);
    }

    return(
        <>
            <Helmet>
                <title>{thisDecoration.name} - Mille Arts</title>
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
            />
        </>
    );
}
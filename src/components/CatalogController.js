import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import Catalog from "./Catalog";

import favicon from '../img/favicon.png'

export default function CatalogController(props) {

    useEffect(() => fetchAllDecorations(), []);

    const backUrl = "http://" + props.domain + ":8081/catalog/";

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
                deleteDecoration={deleteDecoration}>
            </Catalog>
        </>
    );
}
import React, { useEffect } from "react";

import Catalog from "./Catalog";

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
        <Catalog 
            owner={props.owner} 
            domain={props.domain} 
            decorations={props.decorations} 
            basket={props.basket} 
            setBasket={props.setBasket}
            deleteDecoration={deleteDecoration}>
        </Catalog>
    );
}
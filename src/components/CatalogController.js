import React, { useEffect } from "react";

import Catalog from "./Catalog";

export default function CatalogController(props) {

    useEffect(() => fetchAllDecorations(), []);

    const backUrl = "http://" + props.domain + ":8081/catalog";

    function fetchAllDecorations() {
        fetch(backUrl + "/all")
            .then(response => response.json())
            .then(json => props.setDecorations(json))
    }

    return(
        <Catalog domain={props.domain} decorations={props.decorations} basket={props.basket} setBasket={props.setBasket}></Catalog>
    );
}
import React, { useEffect } from "react";

import Catalog from "./Catalog";

export default function ResearchController(props) {

    useEffect(() => {
        fetchDecorations();
    }, []);

    const backUrl = "http://localhost:8081/catalog";

    function fetchDecorations() {
        fetch(backUrl + "/" + location.search.substring(3))
            .then(response => response.json())
            .then(json => props.setDecorations(json))
    }

    return(
        <Catalog decorations={props.decorations} basket={props.basket} setBasket={props.setBasket}></Catalog>
    );

}
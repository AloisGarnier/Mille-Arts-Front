import React, { useEffect, useState } from "react";

import Catalog from "./Catalog";

export default function CatalogController(props) {

    const [decorations, setDecorations] = useState([]);

    useEffect(() => fetchAllDecorations(), []);

    const backUrl = "http://localhost:8081/catalog";

    function fetchAllDecorations() {
        fetch(backUrl + "/all")
            .then(response => response.json())
            .then(json => setDecorations(json))
    }

    return(
        <Catalog decorations={decorations} basket={props.basket} setBasket={props.setBasket}></Catalog>
    );


}
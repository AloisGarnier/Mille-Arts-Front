import React, { useEffect, useState } from "react";

import Decoration from "./Decoration";

export default function DecorationController(props) {

    const [thisDecoration, setThisDecoration] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0);
    const [tagDisplay, setTagDisplay] = useState([]);

    useEffect(() => {
        fetchDecoration();
    }, []);

    const backUrl = "http://" + props.domain + ":8081/catalog";

    function fetchDecoration() {

        fetch(backUrl + "/" + location.search.substring(4) + "/all")
            .then(response => response.json())
            .then(json => setThisDecoration(json));

        fetch(backUrl + "/" + location.search.substring(4) + "/price")
            .then(response => response.json())
            .then(json => setCurrentPrice(json));

        fetch(backUrl + "/" + location.search.substring(4) + "/tags")
            .then(response => response.json())
            .then(json => displayTags(json));
    }

    function displayTags(json) {
        let display = [];
        for(let i=0; i<json.length;i++) {
            display.push(
                <span class="badge my-badge rounded-pill bg-secondary">{json[i]}</span>
            );
        }
        setTagDisplay(display);
    }

    return(
        <Decoration 
            decoration={thisDecoration} 
            currentPrice={currentPrice}
            tags={tagDisplay}
            basket={props.basket}
            setBasket={props.setBasket}
        />
    );
}
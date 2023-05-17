import React, { useEffect, useState } from "react";

import Decoration from "./Decoration";

export default function DecorationController() {

    const [thisDecoration, setThisDecoration] = useState("");

    useEffect(() => {
        fetchDecoration();
    }, []);

    const backUrl = "http://localhost:8081/catalog";

    function fetchDecoration() {

        fetch(backUrl + "/" + location.search.substring(4) + "/all")
            .then(response => response.json())
            .then(json => setThisDecoration(json));

    }

    return(
        <Decoration decoration={thisDecoration}/>
    );
}
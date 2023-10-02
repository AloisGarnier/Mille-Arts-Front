import React, { useEffect, useState } from "react";

import NewDecoration from "./NewDecoration";

export default function NewDecorationController(props) {

    const backUrl = "http://" + props.domain + ":8081/catalog/";

    function addNewDecoration(name, picture, description, price, preparationDelay, tag1, tag2, tag3) {
        let tempTags = [tag1, tag2, tag3];
        let tempTags2 = [];
        for(let i=0;i<3;i++) {
            if(tempTags[i]) {
                tempTags2.push(tempTags[i]);
            }
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                picture: picture, 
                description: description, 
                preparationDelay: preparationDelay,
                price: price,
                tags: tempTags2
            })
        };
        fetch(backUrl + "create", requestOptions)
            .then(response => response.json())
    }

    return(
        <NewDecoration
            owner = {props.owner}
            addNewDecoration={addNewDecoration}
        />
    );

}
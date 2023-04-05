import React from "react";

import Signup from "./Signup";

export default function SignupController(props) {

    const backUrl = "http://localhost:8081/security";

    function addCustomer(firstName, lastName, login, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName: firstName, lastName: lastName, username: login, password: password})
        };
        fetch(backUrl + "/register", requestOptions)
        .then(response => response.json())
            .then(json => props.setOwner({ 
                token: json.token,
                id: json.owner.id,
                firstName: json.owner.firstName,
                lastName: json.owner.lastName
            }));
    }

    return (
        <Signup linkCatalog={props.linkCatalog} addCustomer={(firstName, lastName, login, password)  => addCustomer(firstName, lastName, login, password)} />
    ); 


}
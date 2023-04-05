import React from "react";

import Login from "./Login";

export default function LoginController(props) {

    const backUrl = "http://localhost:8081/security";

    function fetchCustomer(login, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: login, password: password})
        };
        fetch(backUrl + "/authorize", requestOptions)
            .then(response => response.json())
            .then(json => props.setOwner({ 
                token: json.token,
                id: json.owner.id,
                firstName: json.owner.firstName,
                lastName: json.owner.lastName
            }));
    }

    return (
        <Login linkSignUp={props.linkSignUp} fetchCustomer={(login, password) => fetchCustomer(login, password)} />
    ); 
}
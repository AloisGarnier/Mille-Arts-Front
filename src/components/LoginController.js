import React from "react";

import Login from "./Login";

export default function LoginController(props) {

    const backUrl = "http://localhost:8081/security";

    function ownerRegistration(json) {
        props.setOwner({ 
            id: json.owner.id,
            firstName: json.owner.firstName, 
            lastName: json.owner.lastName, 
            email: json.owner.username, 
            password: json.owner.password,
            phoneNumber: json.owner.phoneNumber
        })

        window.localStorage.setItem("owner", JSON.stringify({ 
            token: json.token,
            id: json.owner.id,
            firstName: json.owner.firstName,
            lastName: json.owner.lastName,
            email: json.owner.username,
            password: json.owner.password,
            phoneNumber: json.owner.phoneNumber
        }))
    }

    function fetchCustomer(login, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: login, password: password})
        };
        fetch(backUrl + "/authorize", requestOptions)
            .then(response => response.json())
            .then(json => ownerRegistration(json));

        return props.owner ? true : false;
    }

    return (
        <Login linkSignUp={props.linkSignUp} fetchCustomer={(login, password) => fetchCustomer(login, password)} />
    ); 
}
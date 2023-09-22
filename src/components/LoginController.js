import React from "react";
import { Helmet } from "react-helmet";

import Login from "./Login";

import favicon from '../img/favicon.png'

export default function LoginController(props) {

    const backUrl = "http://" + props.domain + ":8081/security";

    function ownerRegistration(json) {
        if(!json.owner.withdrawalDate) {
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
        <>
            <Helmet>
                <title>Connexion - Mille Arts</title>
                <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Page de connexion" />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>
            <Login linkSignUp={props.linkSignUp} fetchCustomer={(login, password) => fetchCustomer(login, password)} />
        </>

    ); 
}
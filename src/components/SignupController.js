import React from "react";
import { Helmet } from "react-helmet";

import Signup from "./Signup";

import favicon from '../img/favicon.png'

export default function SignupController(props) {

    const backUrl = "http://" + props.domain + "/security";

    function ownerRegistration(json) {
        props.setOwner({ 
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

    function addCustomer(firstName, lastName, email, password, date, month, year, phoneNumber) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                firstName: firstName, 
                lastName: lastName, 
                username: email, 
                password: password,
                date: date,
                month: month,
                year: year,
                phoneNumber: phoneNumber})
        };
        fetch(backUrl + "/register", requestOptions)
            .then(response => response.json())
            .then(json => ownerRegistration(json));

        return props.owner ? true : false;
    }

    return (
        <>
            <Helmet>
                <title>Inscription - Mille Arts</title>
                <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Page de création de compte" />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>
            <Signup linkCatalog={props.linkCatalog} addCustomer={(firstName, lastName, email, password, date, month, year, phoneNumber)  => addCustomer(firstName, lastName, email, password, date, month, year, phoneNumber)} />
        </>
    ); 


}
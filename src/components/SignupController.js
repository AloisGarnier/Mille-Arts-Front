import React from "react";

import Signup from "./Signup";

export default function SignupController(props) {

    const backUrl = "http://" + props.domain + ":8081/security";

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
        <Signup linkCatalog={props.linkCatalog} addCustomer={(firstName, lastName, email, password, date, month, year, phoneNumber)  => addCustomer(firstName, lastName, email, password, date, month, year, phoneNumber)} />
    ); 


}
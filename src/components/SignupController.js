import React from "react";

import Signup from "./Signup";

export default function SignupController(props) {

    const backUrl = "http://localhost:8081/security";

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
            .then(json => props.setOwner({ 
                token: json.token,
                id: json.owner.id,
                firstName: json.owner.firstName,
                lastName: json.owner.lastName,
                email: json.owner.username,
                password: json.owner.password,
                date: json.owner.date,
                month: json.owner.month,
                year: json.owner.year,
                phoneNumber: json.owner.phoneNumber
            }));

        return props.owner ? true : false;
    }

    return (
        <Signup linkCatalog={props.linkCatalog} addCustomer={(firstName, lastName, email, password, date, month, year, phoneNumber)  => addCustomer(firstName, lastName, email, password, date, month, year, phoneNumber)} />
    ); 


}
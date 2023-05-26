import React from "react";

import MyAccount from "./MyAccount";

export default function MyAccountController(props) {

    const backUrl = "http://" + props.domain + ":8081/security";

    function ownerRegistration(json) {
        let ownerId = props.owner.id;
        props.setOwner({ 
            id: ownerId,
            firstName: json.owner.firstName, 
            lastName: json.owner.lastName, 
            email: json.owner.username, 
            phoneNumber: json.owner.phoneNumber
        })

        window.localStorage.setItem("owner", JSON.stringify({ 
            id: props.owner.id,
            firstName: json.owner.firstName,
            lastName: json.owner.lastName,
            email: json.owner.username,
            password: json.owner.password,
            phoneNumber: json.owner.phoneNumber
        }))
    }

    function changeCustomer(firstName, lastName, email, password, phoneNumber) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName, 
                lastName: lastName, 
                username: email, 
                phoneNumber: phoneNumber})
        };
        fetch(backUrl + "/change/" + props.owner.id, requestOptions)
            .then(response => response.json())
            .then(json => ownerRegistration(json));
    }

    return (
        <MyAccount 
            domain={props.domain}
            owner={props.owner} 
            setOwner={props.setOwner}
            changeCustomer={(firstName, lastName, email, password, phoneNumber) => changeCustomer(firstName, lastName, email, password, phoneNumber)} 
        />
    );
}
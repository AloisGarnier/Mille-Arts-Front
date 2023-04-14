import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MyAccount(props) {

    const [activeTab, setActiveTab] = useState(["nav-link", "nav-link", "nav-link"]);
    const [body, setBody] = useState([]);

    function logOut() {
        props.setOwner(undefined);
        window.localStorage.removeItem("owner");
    }

    function clickFirstTab() {
        setActiveTab(["nav-link active", "nav-link", "nav-link"]);
    }

    function clickSecondTab() {
        setActiveTab(["nav-link", "nav-link active", "nav-link"]);
    }

    function clickThirdTab() {
        setActiveTab(["nav-link", "nav-link", "nav-link active"]);
    }

    return(
        <div class="card my-card">
            <h3 class="card-header my-header">Mon compte</h3>
            <div class="card-body">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <button class={activeTab[0]} data-bs-toggle="tab" onClick={() => clickFirstTab()} aria-selected="false" role="tab" tabindex="-1">Informations personnelles</button>
                    </li>
                    <li class="nav-item">
                        <button class={activeTab[1]} data-bs-toggle="tab" onClick={() => clickSecondTab()} aria-selected="true" role="tab">Adresses</button>
                    </li>
                    <li class="nav-item">
                        <button class={activeTab[2]} data-bs-toggle="tab" onClick={() => clickThirdTab()} aria-selected="false" tabindex="-1" role="tab">Historique de commandes</button>
                    </li>
                </ul>
                <div id="myTabContent" class="tab-content">
                    <Link to="/" onClick={() => logOut()}>Se déconnecter</Link>
                </div>
            </div>
        </div>
    );
}
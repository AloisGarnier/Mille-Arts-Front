import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MyAccount(props) {

    const [activeTab, setActiveTab] = useState(["nav-link", "nav-link", "nav-link"]);
    const [body, setBody] = useState([]);

    function logOut() {
        props.setOwner(undefined);
        window.localStorage.removeItem("owner");
        return props.linkLogOut;
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
                    <div class="tab-pane fade" id="home" role="tabpanel">
                        <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                    </div>
                    <div class="tab-pane fade active show" id="profile" role="tabpanel">
                        <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
                    </div>
                    <div class="tab-pane fade" id="dropdown1">
                        <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.</p>
                    </div>
                    <div class="tab-pane fade" id="dropdown2">
                        <Link to={() => logOut()}>Se déconnecter</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
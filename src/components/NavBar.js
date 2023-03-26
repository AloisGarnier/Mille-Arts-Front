import React, { useState, useContext } from "react";

export default function NavBar() {
    
    return (
    
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarColor01">
                    <form class="d-flex">
                        <input class="form-control me-sm-2" type="search" placeholder="Votre recherche"></input>
                        <button class="btn btn-link my-2 my-sm-0" type="submit"><i class="fas fa-search"></i></button>
                    </form>
                </div>
                <a class="navbar-brand" href="#">Mille Arts</a>
                <div class="collapse navbar-collapse navbar-right" id="navbarColor02">
                    <button type="submit" class="btn btn-link"><i class="fa-solid fa-user"></i>&thinsp; Connexion</button>
                    <button type="submit" class="btn btn-link"><i class="fa-solid fa-basket-shopping"></i>&thinsp; 0</button>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01 #navbarColor02" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>

    );
}
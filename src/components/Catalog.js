import React from "react";

import img1 from '../img/maison.jpg';
import img2 from '../img/champignon.jpg';
import img3 from '../img/peintre.jpg';
import img4 from '../img/sac.jpg';

export default function Catalog() {

    return (
        <div class="d-flex flex-wrap justify-content-center">
            <div class="card bg-light mb-3 single-card">
                <div class="card-header">9€50</div>
                <div class="card-body">
                    <div class="d-flex justify-content-center">
                        <img class="little-image" src={img1}/>
                    </div>
                    <div class="d-flex justify-content-center">
                        <p class="card-text">Petite maison d'hiver</p>
                    </div>
                </div>
            </div>
            <div class="card bg-light mb-3 single-card">
                <div class="card-header">10€50</div>
                <div class="card-body">
                    <div class="d-flex justify-content-center">
                        <img class="little-image" src={img2}/>
                    </div>
                    <p class="card-text">Champignon de Noël</p>
                </div>
            </div>
            <div class="card bg-light mb-3 single-card">
                <div class="card-header">9€</div>
                <div class="card-body">
                    <div class="d-flex justify-content-center">
                        <img class="little-image" src={img3}/>
                    </div>
                    <p class="card-text">Bonhomme de neige artiste</p>
                </div>
            </div>
            <div class="card bg-light mb-3 single-card">
                <div class="card-header">13€50</div>
                <div class="card-body">
                    <div class="d-flex justify-content-center">
                        <img class="little-image" src={img4}/>
                    </div>
                    <p class="card-text">Sac en tissu</p>
                </div>
            </div>
        </div>
    );

}
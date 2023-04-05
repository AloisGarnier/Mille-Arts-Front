import React from "react";

export default function Decoration() {

    return(
        <div class="card bg-light mb-3 single-card">
                <div class="card-header">Petite maison d'hiver</div>
                <div class="card-body">
                    <div class="d-flex justify-content-center">
                        <img class="little-image" src={img1}/>
                    </div>
                    <div class="d-flex flex-wrap justify-content-center">
                        <span class="badge rounded-pill bg-primary">150€</span>
                        <span class="badge rounded-pill bg-secondary">Hiver</span>
                        <span class="badge rounded-pill bg-secondary">Noël</span>
                        <span class="badge rounded-pill bg-secondary">Maison</span>
                    </div>
                    <div class="d-flex flex-wrap justify-content-center">
                        <button type="button" class="btn btn-success">Ajouter 1 au panier</button>
                        <button type="button" class="btn btn-info">Plus d'infos</button>
                    </div>
                </div>
            </div>
    );

}
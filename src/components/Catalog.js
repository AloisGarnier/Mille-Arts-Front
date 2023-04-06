import React from "react";

export default function Catalog(props) {

    function addAllDecorations() {
        let allDecorations = [];

        props.decorations.forEach(deco => {

            let currentPrice = 0;
            for(let i = 0; i < deco.decorationPrices.length; i++) {
                if(deco.decorationPrices[i].withdrawalPrice == null) {
                    currentPrice = deco.decorationPrices[i].price.amount;
                }
            }

            allDecorations.push(
            <div class="card bg-light mb-3 single-card">
                <div class="card-header">{deco.name}</div>
                <div class="card-body">
                    <div class="d-flex justify-content-center">
                        <img class="little-image" src={deco.picture}/>
                    </div>
                    <div class="d-flex flex-wrap justify-content-center">
                        <span class="badge badge-price rounded-pill bg-warning">{currentPrice} €</span>
                    </div>
                    <div class="d-flex flex-wrap justify-content-center">
                        <span class="badge my-badge rounded-pill bg-secondary">Hiver</span>
                        <span class="badge my-badge rounded-pill bg-secondary">Noël</span>
                        <span class="badge my-badge rounded-pill bg-secondary">Maison</span>
                    </div>
                    <div class="d-flex flex-wrap justify-content-center">
                        <button type="button" class="btn btn-success">Ajouter 1 au panier</button>
                        <button type="button" class="btn btn-info">Plus d'infos</button>
                    </div>
                </div>
            </div> 
            )
        });

        return allDecorations;
    }

    return (
        <div class="d-flex flex-wrap justify-content-center my-catalog">
            {addAllDecorations()}
        </div>
    );

}
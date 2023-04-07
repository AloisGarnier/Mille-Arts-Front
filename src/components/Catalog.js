import React from "react";

export default function Catalog(props) {

    function addOne(decoration) {
        let newBasket = [...props.basket];
        newBasket.push(decoration);
        props.setBasket(newBasket);
    }

    function addAllDecorations() {
        let allDecorations = [];

        props.decorations.forEach(deco => {

            let currentPrice = 0;
            for(let i = 0; i < deco.decorationPrices.length; i++) {
                if(deco.decorationPrices[i].withdrawalPrice == null) {
                    currentPrice = deco.decorationPrices[i].price.amount;
                }
            }

            let tags = [];
            for(let i = 0; i < deco.decorationTags.length; i++) {
                tags.push(
                    <span class="badge my-badge rounded-pill bg-secondary">{deco.decorationTags[i].tag.name}</span>
                );
            }

            allDecorations.push(
            <div class="card bg-light mb-3 single-card">
                <div class="card-header">
                    <div class="my-card-header">
                        <span class="deco-name">{deco.name}</span>
                    </div>
                    <div class="my-card-header">
                        <span class="badge badge-price bg-danger">{currentPrice} €</span>
                    </div>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-center">
                        <img class="little-image" src={deco.picture}/>
                    </div>
                    <div class="d-flex flex-wrap justify-content-center mt-2">
                        {tags}
                    </div>
                    <div class="d-flex flex-wrap justify-content-center">
                        <button onClick={() => addOne(deco)} type="button" class="btn btn-success">Ajouter 1 au panier</button>
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
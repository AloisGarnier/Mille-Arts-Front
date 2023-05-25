import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Catalog(props) {

    function moreDetails(decoration) {
        return "/decoration?id=" + decoration.id;
    }

    function addOne(decoration) {
        let newBasket = [...props.basket];
        newBasket.push([decoration, 1]);
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

            let tagNames = [];
            let tags = [];
            for(let i = 0; i < deco.decorationTags.length; i++) {
                tagNames.push(deco.decorationTags[i].tag.name);
            }
            tagNames.sort();
            for(let i = 0; i < deco.decorationTags.length; i++) {
                tags.push(
                    <span class="badge my-badge rounded-pill bg-secondary">{tagNames[i]}</span>
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
                    <div class="d-flex justify-content-center h-50">
                        <img class="little-image" src={deco.picture}/>
                    </div>
                    <div class="d-flex flex-wrap justify-content-center align-content-end h-25">
                        {tags}
                    </div>
                    <div class="d-flex flex-wrap justify-content-center align-content-end h-25">
                        <button onClick={() => addOne(deco)} type="button" class="btn btn-success">Ajouter 1 au panier</button>
                        <Link to={moreDetails(deco)} type="button" class="btn btn-info">Plus d'infos</Link>
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
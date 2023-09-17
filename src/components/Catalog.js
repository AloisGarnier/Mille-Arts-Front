import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Catalog(props) {

    function moreDetails(decoration) {
        return "/decoration?id=" + decoration.id;
    }

    function getFormattedPrice(price) {
        if(price - Math.trunc(price) >= 0.01) {
            return Math.floor(price) + "," + ((price - Math.trunc(price))*100) + " €";
        } else {
            return price + " €";
        }
    }

    function addOne(decoration) {
        let newBasket = [...props.basket];
        newBasket.push([decoration, 1]);
        props.setBasket(newBasket);
    }

    function christmas() {
        if (props.christmas) {

            let currentDate = new Date();
            let christmasDate = new Date(currentDate.getFullYear(), 11, 25);
            let distance = christmasDate - currentDate;
            if (distance < 0) {
                christmasDate = new Date(currentDate.getFullYear() + 1, 11, 25);
                let distance = christmasDate - currentDate;
            }
            distance = Math.floor(distance/(1000*60*60*24));

            return(
                <div class="alert alert-dismissible alert-danger">
                    Youpi ! Plus que {distance} jours avant Noël !
                </div>
            );
        }
    }

    function bottomButtons(deco) {
        if(props.owner && props.owner.id == 1) {
            return(
                <div class="d-flex flex-wrap justify-content-center align-content-center h-25">
                    <Link to={moreDetails(deco)} type="button" class="btn btn-info">Modifier</Link>
                    <button onClick={() => props.deleteDecoration(deco)} type="button" class="btn btn-danger">Supprimer</button>
                </div>
            );
        } else {
            return(
                <div class="d-flex flex-wrap justify-content-center align-content-center h-25">
                    <button onClick={() => addOne(deco)} type="button" class="btn btn-success">Ajouter 1 au panier</button>
                    <Link to={moreDetails(deco)} type="button" class="btn btn-info">Plus d'infos</Link>
                </div>
            );
        }
    }

    function addAllDecorations() {
        let allDecorations = [];

        if(props.decorations) {
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
                        <span class="badge my-badge rounded-pill bg-secondary mx-1">{tagNames[i]}</span>
                    );
                }
    
                allDecorations.push(
                <div class="card bg-light mb-3 single-card">
                    <div class="card-header">
                        <div class="my-card-header">
                            <span class="deco-name">{deco.name}</span>
                        </div>
                        <div class="my-card-header">
                            <span class="badge badge-price bg-danger">{getFormattedPrice(currentPrice)}</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-center h-50">
                            <img class="little-image" src={deco.picture}/>
                        </div>
                        <div class="d-flex flex-wrap justify-content-center align-content-center h-25">
                            {tags}
                        </div>
                            {bottomButtons(deco)}
                    </div>
                </div> 
                )
            });
        }

        if(props.owner && props.owner.id == 1) {
            allDecorations.push(
                <div class="card bg-light mb-3 single-card">
                    <div class="card-header">
                        <div class="my-card-header">
                            <span class="deco-name">Nouvelle décoration</span>
                        </div>
                    </div>
                    <div class="card-body d-flex justify-content-center">
                        <Link to="/nouvelle-decoration" type="button" class="btn btn-success align-self-center">Créer</Link>
                    </div>
                </div> 
            );
        }
        
        return allDecorations;
    }

    return (
        <>
             <div class="d-flex flex-wrap justify-content-center my-christmas">
                {christmas()}
            </div>
            <div class="d-flex flex-wrap justify-content-center my-catalog">
                {addAllDecorations()}
            </div>
        </>
    );
}
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import favicon from '../img/favicon.png'

export default function Basket(props) {

    function getFormattedPrice(price) {
        if(price - Math.trunc(price) >= 0.01) {
            return Math.floor(price) + "," + Math.trunc(((price - Math.trunc(price))*100)) + " €";
        } else {
            return price + " €";
        }
    }

    function getTotal() {
        if(props.basket.length != 0) {

            let totalPrice = 0;
            
            for(let i=0; i < props.basket.length; i++) {

                let deco = props.basket[i][0];
                let quantity = props.basket[i][1];
    
                let currentPrice = 0;
                for(let i = 0; i < deco.decorationPrices.length; i++) {
                    if(deco.decorationPrices[i].withdrawalPrice == null) {
                        currentPrice = deco.decorationPrices[i].price.amount;
                    }
                }
                totalPrice += currentPrice*quantity;
                
            }

            return(
                <div class="d-flex justify-content-end">
                    <h3 class="my-header">
                    Total : {getFormattedPrice(totalPrice)}
                    </h3>
                </div>
            );
        }
    }

    function resetBasket() {
        props.setBasket([]);
        window.localStorage.removeItem("basket");
    }

    function bottomButtons() {
        if(props.basket.length > 0) {
            if(props.owner) {
                return(
                <div class="m-2 d-flex justify-content-end">
                    <Link 
                        type="button" 
                        class="btn btn-danger none-if-small"
                        to="/catalogue"
                        onClick={() => resetBasket()}
                    >
                        Réinitialiser votre panier
                    </Link>
                    <Link 
                        type="button" 
                        class="btn btn-success none-if-small"
                        to="/livraison"
                    >
                        Valider votre panier
                    </Link>
                    <Link 
                        type="button" 
                        class="btn btn-danger none-if-large"
                        to="/catalogue"
                        onClick={() => resetBasket()}
                    >
                        Remettre à zéro
                    </Link>
                    <Link 
                        type="button" 
                        class="btn btn-success none-if-large"
                        to="/livraison"
                    >
                        Valider
                    </Link>
                </div>)
            } else {
                return(
                <div class="m-2 d-flex justify-content-end">
                    <Link 
                        type="button" 
                        class="btn btn-danger none-if-small"
                        to="/catalogue"
                        onClick={() => resetBasket()}
                    >
                        Réinitialiser votre panier
                    </Link>
                    <Link 
                        type="button" 
                        class="btn btn-warning none-if-small"
                        to="/connexion"
                    >
                        Merci de vous connecter afin de passer commande
                    </Link>
                    <Link 
                        type="button" 
                        class="btn btn-danger none-if-large"
                        to="/catalogue"
                        onClick={() => resetBasket()}
                    >
                        Remettre à zéro
                    </Link>
                    <Link 
                        type="button" 
                        class="btn btn-warning none-if-large"
                        to="/connexion"
                    >
                        Se connecter
                    </Link>
                </div>)
            }
        }
    }

    function basketElements() {
        let basketElements = [];

        if(props.basket.length == 0) {
                return(<div class="d-flex justify-content-center">Votre panier est vide... allez vite le remplir !</div>);
        } else {
            for(let i=0; i < props.basket.length; i++) {

                let deco = props.basket[i][0];
                let quantity = props.basket[i][1];

                let currentPrice = 0;
                for(let i = 0; i < deco.decorationPrices.length; i++) {
                    if(deco.decorationPrices[i].withdrawalPrice == null) {
                        currentPrice = deco.decorationPrices[i].price.amount;
                    }
                }

                basketElements.push(
                    <tr class="table-light">
                        <th><Link to={"/decoration?id=" + deco.id} type="button">{deco.name}</Link></th>
                        <td>
                            {quantity}
                        </td>
                        <td>{getFormattedPrice(currentPrice)}</td>
                        <td>{getFormattedPrice(currentPrice*quantity)}</td>
                        <td>{getFormattedPrice(currentPrice*quantity/6)}</td>
                    </tr>
                );
            }
        }
        return(<table class="table table-hover none-if-small">
                    <thead>
                        <tr>
                            <th scope="col">Décoration</th>
                            <th scope="col">Quantité</th>
                            <th scope="col">Prix/article</th>
                            <th scope="col">Prix total</th>
                            <th scope="col">dont TVA (20%)</th>
                        </tr>
                    </thead>
                    <tbody>{basketElements}</tbody>
                </table>);
    }

    function basketElementsSmall() {
        let basketElements = [];

        if(props.basket.length == 0) {
                return(<div class="d-flex justify-content-center">Votre panier est vide... allez vite le remplir !</div>);
        } else {
            for(let i=0; i < props.basket.length; i++) {

                let deco = props.basket[i][0];
                let quantity = props.basket[i][1];

                let currentPrice = 0;
                for(let i = 0; i < deco.decorationPrices.length; i++) {
                    if(deco.decorationPrices[i].withdrawalPrice == null) {
                        currentPrice = deco.decorationPrices[i].price.amount;
                    }
                }

                basketElements.push(
                    <div class="d-flex flex-row">
                        <div class="whitespace-nowrap">
                            <Link to={"/decoration?id=" + deco.id} type="button" class="whitespace-nowrap">{deco.name}</Link>
                            &nbsp; x{quantity} :&nbsp;
                        </div>
                        <div class="whitespace-nowrap">
                            {getFormattedPrice(currentPrice*quantity)} (TVA : {getFormattedPrice(currentPrice*quantity/6)})
                        </div>
                    </div>
                );
            }
        }

        return(
        <div class="flex-column-not-important none-if-large">
            {basketElements}
        </div>);
    }

    return(
        <div class="card my-card basket-card">
            <Helmet>
                <title>Votre panier - Mille Arts</title>
                <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Votre panier à valider" />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>
            <h3 class="card-header my-header">Votre panier</h3>
            <div class="card-body d-flex flex-column justify-content-center">
                {basketElements()}
                {basketElementsSmall()}
                {getTotal()}
                {bottomButtons()} 
            </div>
        </div>
    );

}
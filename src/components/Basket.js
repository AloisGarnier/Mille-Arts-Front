import React from "react";
import { Link } from "react-router-dom";

export default function Basket(props) {

    function basketElements() {
        let basketElements = [];

        if(props.basket.length == 0) {
            basketElements.push(
                <div class="empty-basket">Votre panier est vide</div>
            );
        }
        return basketElements;
    }

    return(
        <div class="card my-card basket-card">
            <h3 class="card-header my-header">Votre panier</h3>
            <div class="card-body">
                {basketElements()}
            </div>
        </div>
    );

}
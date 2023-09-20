import React from "react";
import { Link } from "react-router-dom";


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

    function bottomButtons() {
        
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
        return(<table class="table table-hover">
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

    return(
        <div class="card my-card basket-card">
            <h3 class="card-header my-header">Votre panier</h3>
            <div class="card-body d-flex flex-column justify-content-center">
                {basketElements()}
                {getTotal()}
                {bottomButtons()} 
            </div>
        </div>
    );

}
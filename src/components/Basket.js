import React from "react";

export default function Basket(props) {

    function basketElements() {
        let basketElements = [];

        if(props.basket.length == 0) {
            basketElements.push(
                <div class="empty-basket">Le panier est vide ! Allez vite le remplir...</div>
            );
        } else {
            for(let i=0; i < props.basket.length; i++) {
                basketElements.push(
                    <div>
                        {props.basket[i].name}
                    </div>
                );
            }
        }
        
        return basketElements;
    }

    return(
        <div class="card my-card basket-card">
            <h3 class="card-header my-header">Mon panier</h3>
            <div class="card-body">
                {basketElements()}
            </div>
        </div>
    );

}
import React from "react";
import { Helmet } from "react-helmet";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import favicon from '../img/favicon.png'

export default function Payment(props) {

    const paypalUrl = props.domain + "/paypal/";
    const commandUrl = props.domain + "/commands/";

    function getTotal() {
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

        return(totalPrice.toFixed(2));
    }

    function sendOrder() {
        var decoIds = []
        var quants = []
        var mods = []
        for(let i=0; i < props.basket.length; i++) {
            decoIds.push(props.basket[i][0].id)
            quants.push(props.basket[i][1])
            mods.push(props.basket[i][2])
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                totalPrice: getTotal(),
                addressElements: props.deliveryAddress,
                customerId: props.owner.id,
                decorationIds: decoIds,
                quantities: quants,
                models: mods
            })
        };
        fetch(commandUrl + "newcommand", requestOptions)
            .then(() => console.log(decoIds))
    }

    function createOrder() {
        return fetch(paypalUrl + "init", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            body: getTotal()
        })
            .then((response) => response.json())
            .then((order) => order.id);
    }

    function onApprove(data) {
        sendOrder();
        props.setBasket([]);
        window.localStorage.removeItem("basket");
          return fetch(paypalUrl + "capture", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderID: data.orderID
            })
          })
          .then((response) => response.json())
          .then(() => window.location.href = '/catalogue')

    }

    const initialOptions = {
        "client-id": "AX9eCDEYeb4nkJLqlCJEGVgwo7oWtGy-AGG-UH7FNmuwPNBanNfz-9mSuW1NJeljitE3ZMjRVnZxZB8K",
        "enable-funding": "venmo,card",
        "disable-funding": "paylater",
        "data-sdk-integration-source": "integrationbuilder_sc",
        currency: "EUR",
    };

    function cardClass() {
        if(props.isChristmas) {
            return "card christmas-card my-card basket-card"
        }

        if(props.isLightTheme) {
            return "card light-card my-card basket-card"
        }
        
        return "card dark-card my-card basket-card"
    }

    function bcClass() {
        if(props.isChristmas) {
            return "breadcrumb my-bg bg-light-red"
        }

        if(props.isLightTheme) {
            return "breadcrumb my-bg bg-light-red"
        }
        
        return "breadcrumb my-bg bg-light-purple"
    }

    return(
        <>
                <ol class={bcClass()}>
                    <li class="breadcrumb-item"><a href="/panier">1. Panier</a></li>
                    <li class="breadcrumb-item"><a href="/livraison">2. Livraison</a></li>
                    <li class="breadcrumb-item"><b>3. Paiement</b></li>
                </ol>
                    <div class={cardClass()}>
                        <Helmet>
                                <title>Paiement - Mille Arts</title>
                                <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                                <meta property="og:title" content="Mille Arts" />
                                <meta property="og:description" content="Paiement" />
                                <meta property="og:url" content="https://mille-arts.fr/" />
                                <meta property="og:type" content="website" />
                                <link rel="icon" href={favicon} />
                        </Helmet>
                        <h3 class="card-header my-header">Paiement</h3>
                        <div class="card-body d-flex flex-wrap justify-content-around align-items-center">
                            <div class="d-flex flex-wrap align-self-center">
                                <PayPalScriptProvider options={initialOptions}>
                                    <PayPalButtons
                                        style={{shape: "pill",
                                                layout: "vertical",}}
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        </div>
                    </div>
        </>
        )
}

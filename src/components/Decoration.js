import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";

export default function Decoration(props) {

    function getQuantity() {
        let options = [];
        for(let i=1; i < 10; i++) {
            options.push(<option value={i}>{i}</option>)
        }
        return options;
    }

    function getFormattedPrice(price) {
        if(price - Math.trunc(price) >= 0.01) {
            return Math.floor(price) + "," + ((price - Math.trunc(price))*100) + " €";
        } else {
            return price + " €";
        }
    }

    function addInBasket(quantity) {
        let newBasket = [...props.basket];
        newBasket.push([props.decoration, quantity]);
        props.setBasket(newBasket);
    }

    return(
        <div class="card my-card">
            <h3 class="card-header my-header">{props.decoration.name}</h3>
            <div class="card-body d-flex flex-row justify-content-around my-5">
                <span class="d-flex justify-content-center">
                    <img class="image" src={props.decoration.picture}/>
                </span>
                <span class="d-flex flex-column justify-content-start align-content-start w-25">
                    <div class="mb-3"> {getFormattedPrice(props.currentPrice)}</div>
                    <div> {props.decoration.description} </div>
                </span>
                <span class="d-flex flex-column justify-content-start align-self-center">
                    <Formik
                        initialValues={{
                            quantity: 1
                        }}
                    >
                    {({ errors, touched, values }) => (
                        <Form>
                            <div class="form-floating">
                                <Field name="quantity" as="select" class="form-select">
                                    {getQuantity()}
                                </Field>
                                <label for="floatingInput">Quantité</label>
                            </div>
                            <Link 
                                type="button" 
                                class="btn btn-success"
                                to="/catalogue"
                                onClick={() => addInBasket(values.quantity)}
                            >
                                Ajouter au panier
                            </Link>
                        </Form>
                        )} 
                    </Formik>
                </span>
            </div>
        </div>
    );
}
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
        let alreadyInBasket = false;
        for(let i = 0; i<newBasket.length; i++) {
            if(newBasket[i][0].id == props.decoration.id) {
                newBasket[i][1] += parseInt(quantity);
                alreadyInBasket = true;
            } 
        }
        if (!alreadyInBasket) {
            newBasket.push([props.decoration, parseInt(quantity)]);
        }
        props.setBasket(newBasket);
    }

    function getTags(tags) {
        if(tags) {
            let tagNames = [];
            let tagDivs = [];
            for(let i = 0; i < tags.length; i++) {
                tagNames.push(tags[i].tag.name);
            }
            tagNames.sort();
            for(let i = 0; i < tags.length; i++) {
                tagDivs.push(
                    <div class="alert alert-dismissible alert-info">
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        <input initialValues={tagNames[i]} />
                    </div>
                );
            }
    
            return tagDivs;
        }

    }

    function displayCard() { 
        if(props.owner && props.owner.id == 1) {
            return(
            <div class="card my-card">
                <Formik
                    enableReinitialize
                    initialValues={{
                        name: props.decoration.name,
                        picture: props.decoration.picture,
                        description: props.decoration.description,
                        price: props.currentPrice,
                        preparationDelay: props.decoration.preparationDelay,
                        tag1: props.tags[0],
                        tag2: props.tags[1],
                        tag3: props.tags[2]
                    }}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                    <h3 class="card-header my-header">
                        <label for="floatingInput">Titre</label>
                        <Field name="name" type="label" class="form-control" />
                    </h3>
                    <div class="card-body d-flex flex-column">
                        <div class="form-floating mb-3">
                                <Field name="picture" type="label" class="form-control" />
                                <label for="floatingInput">URL de l'image</label>
                        </div>
                        <div class="form-floating mb-3">
                                <Field name="description" type="label" class="form-control my-textarea" component="textarea"/>
                                <label for="floatingInput">Description</label>
                        </div>
                        <div class="form-floating mb-3 d-flex flex-row justify-content-around">
                            <div class="d-flex flex-column w-25">
                                <label for="floatingInput">Prix</label>
                                <div class="input-group">
                                    <Field name="price" type="label" class="form-control"/>
                                    <span class="input-group-text">€</span>
                                </div>
                            </div>
                            <div class="d-flex flex-column w-25">
                                <label for="floatingInput">Temps de préparation</label>
                                <div class="input-group">
                                    <Field name="preparationDelay" type="label" class="form-control"/>
                                    <span class="input-group-text">jours</span>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="floatingInput">Tags</label>  
                            <div class="d-flex flex-row">
                                <Field name="tag1" type="label" class="form-control"/>
                                <Field name="tag2" type="label" class="form-control"/>
                                <Field name="tag3" type="label" class="form-control"/>
                            </div>                      
                        </div>
                        <div class="m-2 d-flex justify-content-end">
                            <Link to="/catalogue" type="button" class="btn btn-warning">Annuler</Link>
                            <Link 
                                type="button" 
                                class="btn btn-success"
                                to="/catalogue"
                                onClick={() => props.modifyDecoration(props.decoration.id, 
                                    values.name, 
                                    values.picture, 
                                    values.description, 
                                    values.price, 
                                    values.preparationDelay,
                                    values.tag1,
                                    values.tag2,
                                    values.tag3
                                    )}
                            >
                                    Valider
                            </Link>
                        </div>
                    </div>
                    </Form>
                    )} 
                </Formik>
            </div>); 
        } else {
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
    }

    return(
        <>{displayCard()}</>
    );
}
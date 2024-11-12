import React, {useState} from "react";
import { Formik, Form, Field } from "formik";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';

import favicon from '../img/favicon.png'

export default function Delivery(props) {

    const [wrongAddress, setWrongAddress] = useState(false);
    const navigate = useNavigate();

    function processDelivery(streetNumber, street, complement, zipCode, city) {
        if(streetNumber != '' && street != '' && zipCode != '' && city != '') {
            props.setDeliveryAddress([streetNumber, street, complement, zipCode, city])
            navigate("/paiement")
            navigate(0)
        } else {
            setWrongAddress(true)
        }
    }
    
    function processWrongAddress() {
        if(wrongAddress) {
            return(
                <div class="m-2 d-flex justify-content-end text-danger">
                    Merci d'entrer une adresse valide
                </div>
            )
        }
    }

    function addressChoice() {

        const signupSchema = Yup.object().shape({

            streetNumber: Yup.string().required('Champ obligatoire'),
            street: Yup.string().required('Champ obligatoire'),
            city: Yup.string().required('Champ obligatoire'),
            zipCode: Yup.string().required('Champ obligatoire'),
         
          });
    
            return(
                <Formik
                    initialValues={{
                        streetNumber: '',
                        street: '',
                        complement: '',
                        city: '',
                        zipCode: '',
                    }}
                    validationSchema={signupSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                    {({ errors, touched, values }) => (
                        <Form>
                            <label>Adresse de livraison</label>
                            <div class="d-flex flex-direction-row">
                                <div class="form-floating mb-3 me-3 w-25">
                                    <Field name="streetNumber" type="label" class="form-control" />
                                    <label for="floatingInput" class="always-grey">Numéro</label>
                                    {errors.streetNumber && touched.streetNumber ? (<div class="error">{errors.streetNumber}</div>) : null}
                                </div>
                                <div class="form-floating mb-3 w-75">
                                    <Field name="street" type="label" class="form-control" />
                                    <label for="floatingInput" class="always-grey">Rue</label>
                                    {errors.street && touched.street ? (<div class="error">{errors.street}</div>) : null}
                                </div>
                            </div>
                            <div class="form-floating mb-3 me-3">
                                    <Field name="complement" type="label" class="form-control" />
                                    <label for="floatingInput" class="always-grey">Complément d'adresse (lieu-dit, étage...)</label>
                                    {errors.complement && touched.complement ? (<div class="error">{errors.complement}</div>) : null}
                                </div>
                            <div class="d-flex flex-direction-row">
                                <div class="form-floating mb-3 me-3 w-50">
                                    <Field name="zipCode" type="label" class="form-control" />
                                    <label for="zipCode" class="always-grey">Code postal</label>
                                    {errors.zipCode && touched.zipCode ? (<div class="error">{errors.zipCode}</div>) : null}
                                </div>
                                <div class="form-floating mb-3 w-50">
                                    <Field name="city" type="label" class="form-control" />
                                    <label for="floatingInput" class="always-grey">Ville</label>
                                    {errors.city && touched.city ? (<div class="error">{errors.city}</div>) : null}
                                </div>
                            </div>
                            {processWrongAddress()}
                            <div class="m-2 d-flex justify-content-end">
                                <Link 
                                    type="button" 
                                    class="btn btn-success"
                                    onClick={() => processDelivery(values.streetNumber, 
                                        values.street, 
                                        values.complement,
                                        values.zipCode,
                                        values.city)}
                                >
                                    Valider votre adresse de livraison
                                </Link>
                            </div>
                        </Form>
                    )}  
                </Formik>
            );
    }

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
                <li class="breadcrumb-item"><b>2. Livraison</b></li>
                <li class="breadcrumb-item">3. Paiement</li>
            </ol>
            <div class={cardClass()}>
                <Helmet>
                        <title>Livraison - Mille Arts</title>
                        <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                        <meta property="og:title" content="Mille Arts" />
                        <meta property="og:description" content="Options de livraison" />
                        <meta property="og:url" content="https://mille-arts.fr/" />
                        <meta property="og:type" content="website" />
                        <link rel="icon" href={favicon} />
                </Helmet>
                <h3 class="card-header my-header">Livraison</h3>
                <div class="card-body d-flex flex-wrap justify-content-around align-items-center">
                        La livraison en France métropolitaine est offerte ! <br/>
                        Si vous habitez hors de France, merci de nous contacter avant toute commande. <br/>
                        <div class="m-5">
                            {addressChoice()}
                        </div>
                </div>
            </div>
        </>
    )
}
import React, {useState} from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function About(props) {

    function displayAbout() {

        let whatAbout = [];

        if (props.owner && props.owner.id == 1) {
            whatAbout.push(
                <Formik
                    enableReinitialize
                    initialValues={{
                        about: props.about
                    }}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                        <Field name="about" type="label" class="form-control" component="textarea" />
                        <Link 
                            type="button" 
                            class="btn btn-warning"
                            onClick={() => props.modifyAbout(values.about)}
                        >
                            Modifier
                        </Link>
                    </Form>
                )}  
            </Formik>
            )
        } else {
            whatAbout.push(
                <div class="d-flex flex-row flex-wrap justify-content-center">
                    {props.about}
                </div>
                );
        }

        return whatAbout;
    }

    return(
        <>
      <Helmet>
      <title>A propos - Mille Arts</title>
        <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
        <meta property="og:title" content="Mille Arts" />
        <meta property="og:description" content="Venez dans ma boutique en-ligne pour acheter plein d'objets décoratifs" />
        <meta property="og:url" content="https://mille-arts.fr/" />
        <meta property="og:type" content="website" />
      </Helmet>
            <div class="card my-card">
                <h3 class="card-header my-header">Qui suis-je ?</h3>
                <div class="card-body">
                    <div class="form-group login-form">
                        {displayAbout()}
                    </div>
                </div>
            </div>
            <div class="card my-card">
                <h3 class="card-header my-header">Mentions légales</h3>
                <div class="card-body">
                    <div class="form-group login-form d-flex flex-row flex-wrap justify-content-center">
                        <div class="mx-5 my-1">
                            Le site internet mille-arts.fr est édité par Caroline Jurien de La Gravière,<br/>
                            domiciliée au 58, rue Chardon-Lagache 75016 Paris <br/>
                            Adresse e-mail de contact : caroline.milard@orange.fr
                        </div>
                        <div class="mx-5 my-1">
                            Le site est hébergé par la société Google Cloud Platform, <br/>
                            immatriculée au RCS de Paris sous le numéro Paris B 881 721 583, <br/>
                            et dont l'adresse postale est : 8, rue de Londres 75009 Paris
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
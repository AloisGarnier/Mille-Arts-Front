import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

export default function Login(props) {

    function cardClass() {
        if(props.isChristmas) {
            return "card christmas-card my-card"
        }

        if(props.isLightTheme) {
            return "card light-card my-card"
        }
        
        return "card dark-card my-card"
    }

    const loginSchema = Yup.object().shape({

        email: Yup.string().email('Adresse e-mail invalide').required('Champ obligatoire'),
        password: Yup.string().required('Champ obligatoire'),
     
      });

    const loginForm = () => {

        return(
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={loginSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <div class="form-floating mb-3">
                            <Field name="email" type="email" class="form-control" />
                            <label for="floatingInput" class="always-grey">Adresse e-mail</label>
                            {errors.email && touched.email ? (<div class="error">{errors.email}</div>) : null}
                        </div> 
                        
                        <div class="form-floating">
                            <Field name="password" type="password" class="form-control" />
                            <label for="floatingInput" class="always-grey">Mot de passe</label>
                            {errors.password && touched.password ? (<div class="error">{errors.password}</div>) : null}
                        </div>
                        
                        <div class="m-2 d-flex justify-content-end">
                            <Link to="/inscription" type="button" class="btn btn-warning">Je n'ai pas de compte</Link>
                            <Link 
                                type="button" 
                                class="btn btn-success"
                                to="/catalogue"
                                onClick={() => props.fetchCustomer(values.email, values.password)}
                            >
                                    Valider
                            </Link>
                        </div>
                    </Form>
                )}  
            </Formik>
        );
    }

    return(
        <div class={cardClass()}>
            <h3 class="card-header my-header">Connexion</h3>
            <div class="card-body">
                <div class="form-group login-form">
                    {loginForm()}
                </div>
            </div>
        </div>
        
    );

}
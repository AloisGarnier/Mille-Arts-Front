import React from "react";
import { Link } from "react-router-dom";

export default function Login(props) {

    return(
        <div class="card my-card">
            <h3 class="card-header my-header">Connexion</h3>
            <div class="card-body">
                <div class="form-group login-form">
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"></input>
                        <label for="floatingInput">Adresse e-mail</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"></input>
                        <label for="floatingPassword">Mot de passe</label>
                    </div>
                    <div class="m-2 d-flex justify-content-end">
                        <Link to={props.linkSignUp} type="button" class="btn btn-warning">Je n'ai pas de compte</Link>
                        <button type="button" class="btn btn-success">Valider</button>
                    </div>
                </div>
            </div>
        </div>
        
    );

}
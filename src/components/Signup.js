import React, {useState} from "react";
import { Link } from "react-router-dom";

export default function Signup(props) {

    const [fields, setFields] = useState({ firstName: "", lastName: "", email: "", password: "" });

    return (
        <div class="card my-card">
            <h3 class="card-header my-header">Nouveau compte</h3>
            <div class="card-body">
                <div class="form-group login-form">
                    <div class="d-flex flex-direction-row">
                        <div class="form-floating mb-3 w-50">
                            <input 
                                type="name" 
                                class="form-control" 
                                id="floatingInput" 
                                placeholder="name@example.com"
                                value={fields.lastName}
                                onChange={form => setFields({...fields, lastName: form.target.value})}>
                            </input>                            
                            <label for="floatingInput">Nom</label>
                        </div>
                        <div class="form-floating mb-3 w-50">
                            <input 
                                type="name" 
                                class="form-control" 
                                id="floatingInput" 
                                placeholder="name@example.com"
                                value={fields.firstName}
                                onChange={form => setFields({...fields, firstName: form.target.value})}>
                            </input>                            
                            <label for="floatingInput">Prénom</label>
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input 
                            type="email" 
                            class="form-control" 
                            id="floatingInput" 
                            placeholder="name@example.com"
                            value={fields.email}
                            onChange={form => setFields({...fields, email: form.target.value})}>
                        </input>                        
                        <label for="floatingInput">Adresse e-mail</label>
                    </div>
                    <div class="form-floating">
                        <input 
                            type="password" 
                            class="form-control" 
                            id="floatingPassword" 
                            placeholder="Password"
                            value={fields.password}
                            onChange={form => setFields({...fields, password: form.target.value})}>
                        </input>                        
                        <label for="floatingPassword">Mot de passe</label>
                    </div>
                    <div class="m-2 d-flex justify-content-end">
                        <Link 
                            type="button" 
                            class="btn btn-success"
                            to={props.linkCatalog}
                            onClick={() => props.addCustomer(fields.firstName, fields.lastName, fields.email, fields.password)}>
                                Valider
                            </Link>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
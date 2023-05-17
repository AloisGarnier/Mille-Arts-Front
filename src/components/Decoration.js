import React from "react";

export default function Decoration(props) {

    return(
        <div class="card my-card">
            <h3 class="card-header my-header">{props.decoration.name}</h3>
            <div class="card-body">
                <div class="d-flex justify-content-center h-50">
                    <img class="little-image" src={props.decoration.picture}/>
                </div>
                <div class="d-flex flex-wrap justify-content-center align-content-end h-25">
                </div>
                <div class="d-flex flex-wrap justify-content-center align-content-end h-25">
                    <button type="button" class="btn btn-info">Plus d'infos</button>
                </div>
            </div>
        </div>
    );
}
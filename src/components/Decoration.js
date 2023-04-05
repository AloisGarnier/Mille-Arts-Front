import React from "react";

export default function Decoration(props) {

    function getAllTags() {
        let tags = [];
        for(let i=0; i<props.tags; i++) {
            tags.push(
                <span class="badge rounded-pill bg-secondary">{props.tags[i].name}</span>
            );
        }
        return tags;
    }

    return(
        <div class="card bg-light mb-3 single-card">
            <div class="card-header">{props.name}</div>
            <div class="card-body">
                <div class="d-flex justify-content-center">
                    <img class="little-image" src={props.image}/>
                </div>
                <div class="d-flex flex-wrap justify-content-center">
                    <span class="badge rounded-pill bg-primary">{props.price}</span>
                    {getAllTags()}
                </div>
                <div class="d-flex flex-wrap justify-content-center">
                    <button type="button" class="btn btn-success">Ajouter 1 au panier</button>
                    <button type="button" class="btn btn-info">Plus d'infos</button>
                </div>
            </div>
        </div>
    );

}
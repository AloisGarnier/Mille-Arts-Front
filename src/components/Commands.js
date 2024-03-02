import React, { useState, useEffect } from "react";

import { Accordion } from "react-bootstrap";

export default function Commands(props) {

    const [activeStep, setActiveStep] = useState(1);
    const [activeTab, setActiveTab] = useState(["nav-link active", "nav-link", "nav-link"]);

    useEffect(() => clickFirstTab(), []);

    function displayCommands() {

        let commands;
        switch(activeStep){
            case 1:
                commands = props.toDoCommands;
                break;
            case 2:
                commands = props.toDeliverCommands;
                break;
            case 3:
                commands = props.doneCommands;
                break;
            default:
                break;
        }

        // If there is no command
        if(commands == null) {
            let niceDisplay = "";
            switch(activeStep){
                case 1:
                    niceDisplay = "à réaliser";
                    break;
                case 2:
                    niceDisplay = "à envoyer";
                    break;
                case 3:
                    niceDisplay = "réalisée pour le moment";
                    break;
                default:
                    break;
            }
            return(
                <div>Il n'y a aucune commande {niceDisplay}</div>
            )
        }

        let commandsDisplay = [];
        let commandsNumber = 0;
        switch(activeStep){
            case 1:
                commandsNumber = props.toDoCommands.length;
                break;
            case 2:
                commandsNumber = props.toDeliverCommands.length;
                break;
            case 3:
                commandsNumber = props.doneCommands.length;
                break;
            default:
                break;
        }
        for(let i=0; i<commandsNumber; i++) {
            commandsDisplay.push(
                <Accordion.Item eventKey={i}>
                    <Accordion.Header class="accordion-header" id="headingOne">
                            Accordion Item #1
                    </Accordion.Header>
                    <Accordion.Body id="collapseOne" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            )
        }  
        
        return(
            <div class="my-accordion">
                <Accordion alwaysOpen>
                    {commandsDisplay}
                </Accordion>
            </div>
            );
    }
    
    function moveStepButton(command) {
        switch(activeStep){
            case 1:
                return(
                    <Link 
                        type="button" 
                        class="btn btn-success"
                        to="/commandes"
                        //onClick={}
                    >
                            Réalisée
                    </Link>
                )
            case 2:
                <Link 
                        type="button" 
                        class="btn btn-success"
                        to="/commandes"
                        //onClick={}
                    >
                            Envoyée
                    </Link>
                break;
            default:
                return(<></>)
        }
    }

    function clickFirstTab() {
        setActiveStep(1);
        setActiveTab(["nav-link active", "nav-link", "nav-link"]);
    }

    function clickSecondTab() {
        setActiveStep(2);
        setActiveTab(["nav-link", "nav-link active", "nav-link"]);
    }

    function clickThirdTab() {
        setActiveStep(3);
        setActiveTab(["nav-link", "nav-link", "nav-link active"]);
    }

    return(
        <div class="card my-card">
            <h3 class="card-header my-header">Commandes</h3>
            <div class="card-body">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <button 
                        class={activeTab[0]} 
                        data-bs-toggle="tab" 
                        onClick={() => clickFirstTab()} 
                        aria-selected="false" 
                        role="tab" 
                        tabindex="-1">
                            A réaliser
                        </button>
                    </li>
                    <li class="nav-item">
                        <button 
                        class={activeTab[1]} 
                        data-bs-toggle="tab" 
                        onClick={() => clickSecondTab()} 
                        aria-selected="true" 
                        role="tab">
                            A envoyer
                        </button>
                    </li>
                    <li class="nav-item">
                        <button 
                        class={activeTab[2]} 
                        data-bs-toggle="tab" 
                        onClick={() => clickThirdTab()} 
                        aria-selected="false" 
                        tabindex="-1" 
                        role="tab">
                            Terminées
                        </button>
                    </li>
                </ul>
                <div id="myTabContent" class="tab-content">
                    {displayCommands()}
                </div>
            </div>
        </div>
    );

}
import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Link, useNavigate} from "react-router-dom";

import CatalogController from "./CatalogController";
import LoginController from "./LoginController";
import SignupController from "./SignupController";
import ResearchController from "./ResearchController";
import Basket from "./Basket";
import MyAccountController from "./MyAccountController";
import DecorationController from "./DecorationController";
import ChristmasController from "./ChristmasController";
import AboutController from "./AboutController";
import NewDecorationController from "./NewDecorationController";
import Delivery from "./Delivery";

import lightBg from "../img/light-background.jpg";
import darkBg from "../img/dark-background.jpg";
import christmasBg from "../img/christmas-background.png";

import lightBtn from "../img/go-to-dark-mode.png"
import darkBtn from "../img/go-to-light-mode.png"

import "../css/style.css";
import "../css/sketchy.css";
import "../css/fontawesome.all.min.css";

export default function App() {

  const domain = "localhost";

  const [themeBackground, setThemeBackground] = useState(lightBg);
  const [buttonTheme, setButtonTheme] = useState(lightBtn);
  const [owner, setOwner] = useState(null);
  const [basket, setBasket] = useState([]);
  const [research, setResearch] = useState({search: ''});
  const [decorations, setDecorations] = useState([]);
  const [isCollapsedDisplayed, setCollapsedDisplayed] = useState(false);
  const [about, setAbout] = useState("");

  useEffect(() => fetchConnectedOwner(), []);

  const navigate = useNavigate();

  /**
   * Fetches a connectedOwner in localStorage if there is one
   */
  function fetchConnectedOwner() {
    if(JSON.parse(window.localStorage.getItem("owner"))) {
      setOwner(JSON.parse(window.localStorage.getItem("owner")));
    }
  }

  function ownerName() {
    return owner != undefined ? owner.firstName + " " + owner.lastName : "Connexion";
  }

  function account() {
    return owner != undefined ? "/compte" : "/connexion";
  }

  function displayBasket() {
    if(!owner || owner.id != 1) {
      return(
        <Link to="/panier" class="btn btn-link"><i class="fa-solid fa-basket-shopping"></i>&thinsp; {basket.length}</Link>
      );
    }
  }

  function changeTheme() {
    buttonTheme == lightBtn ? setThemeBackground(darkBg) : setThemeBackground(lightBg);
    buttonTheme == lightBtn ? setButtonTheme(darkBtn) : setButtonTheme(lightBtn);
  }

  function getParamInURL() {
    return "/recherche?q=" + research.search;
  }

  /**
   * Goes to the corresponding research page
   * @param {when the research form is validated by click or enter} event 
   */
  function goToResearchPage(event) {
      event.preventDefault();
      navigate("/recherche?q=" + research.search);
      navigate(0);
  }

  function displayCollapsedItems() {
    if(isCollapsedDisplayed){
      return (
        <div class="d-flex flex-column">
          <Link to={account()} class="btn btn-link"><i class="fa-solid fa-user"></i>&thinsp; {ownerName()}</Link>
          {displayBasket()}
          <Link to="/catalogue" class="btn btn-link">Tous les articles</Link>
          <Link to="/nouveautes" class="btn btn-link">Nouveautés</Link>
          <Link to="/mieux-notes" class="btn btn-link">Les mieux notés</Link>
          <Link to="/noel" class="btn btn-link">C'est déjà Noël !</Link>
          <Link to="/a-propos" class="btn btn-link">Qui suis-je ?</Link>
        </div>
      )
    }
  }
  
  function navBarClass() {
    if(themeBackground == darkBg) {
      return("navbar navbar-expand-lg navbar-light bg-light-purple sticky-top")
    } else {
      return("navbar navbar-expand-lg navbar-light bg-light-red sticky-top")
    }
  }

  return (
    <div class="theme" style={{ backgroundImage: `url(${themeBackground})` }}>
      <nav class={navBarClass()}>
        <div class="container-fluid">
          <div class="col">
            <div class="my-row">
              <div class="collapse navbar-collapse navbar-left">
                <form class="d-flex" onSubmit={event => goToResearchPage(event)}>
                  <input 
                    class="form-control me-sm-2" 
                    type="input" 
                    placeholder="Votre recherche"
                    value={research.search}
                    onChange={form => setResearch({...research, search: form.target.value})}
                  ></input>
                  <Link reloadDocument type="submit" to={getParamInURL()} class="btn btn-link my-2 my-sm-0"><i class="fas fa-search"></i></Link>
                </form>
              </div>
              <Link class="d-flex navbar-brand" to="/">Mille Arts</Link>
              <div class="collapse navbar-collapse navbar-right">
                <Link to={account()} class="btn btn-link"><i class="fa-solid fa-user"></i>&thinsp; {ownerName()}</Link>
                {displayBasket()}
              </div>
              <button class="navbar-toggler collapsed" onClick={() => setCollapsedDisplayed(!isCollapsedDisplayed)}>
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
            <div class="my-bottom-row collapse navbar-collapse nav-item navbar-nav me-auto">
                <Link to="/catalogue" class="btn btn-link">Tous les articles</Link>
                <Link to="/nouveautes" class="btn btn-link">Nouveautés</Link>
                <Link to="/mieux-notes" class="btn btn-link">Les mieux notés</Link>
                <Link to="/noel" class="btn btn-link">C'est déjà Noël !</Link>
                <Link to="/a-propos" class="btn btn-link">Qui suis-je ?</Link>
            </div>
              <div class="nav-item navbar-nav me-auto collapsed my-toggler d-block d-lg-none">
                  {displayCollapsedItems()}
            </div>
          </div>
        </div>
      </nav>
      
        <Routes>
          <Route exact path="/" element={
            <CatalogController
            owner={owner}
            basket={basket}
            setBasket={setBasket}
            decorations={decorations}
            setDecorations={setDecorations}
            domain = {domain}
          />}></Route>
          <Route exact path="/catalogue" element={
            <CatalogController
            owner={owner}
            basket={basket}
            setBasket={setBasket}
            decorations={decorations}
            setDecorations={setDecorations}
            domain = {domain}
          />}></Route>
          <Route exact path="/connexion" element={
            <LoginController 
              owner={owner}
              setOwner={setOwner}
              domain = {domain}
          />}></Route>
          <Route exact path="/inscription" element={
            <SignupController
              owner={owner}
              setOwner={setOwner}
              domain = {domain}
          />}></Route>
          <Route exact path="/panier" element={
            <Basket
            owner={owner} 
            basket={basket}
            setBasket={setBasket}
            domain = {domain}
            />
          }></Route>
          <Route exact path="/recherche" element={
            <ResearchController
            owner={owner}
            research={research}
            basket={basket}
            setBasket={setBasket}
            decorations={decorations}
            setDecorations={setDecorations}
            domain = {domain}
          />}></Route>
          <Route exact path="/compte" element={
            <MyAccountController
            owner={owner}
            setOwner={setOwner}
            domain = {domain}
          />}></Route>
          <Route exact path="/decoration" element={
            <DecorationController
            owner={owner}
            basket={basket}
            setBasket={setBasket}
            domain = {domain}
          />}></Route>
          <Route exact path="/noel" element={
            <ChristmasController
            owner={owner}
            basket={basket}
            setBasket={setBasket}
            decorations={decorations}
            setDecorations={setDecorations}
            themeBackground={themeBackground}
            setThemeBackground={setThemeBackground}
            domain = {domain}
          />}></Route>
          <Route exact path="/a-propos" element={
            <AboutController
            domain = {domain}
            owner = {owner}
            about = {about}
            setAbout = {setAbout}
          />}></Route>
          <Route exact path="/nouvelle-decoration" element={
            <NewDecorationController
            domain = {domain}
            owner = {owner}
          />}></Route>
          <Route exact path="/livraison" element={
            <Delivery
            domain = {domain}
            owner = {owner}
          />}></Route>
        </Routes>
    

      <footer class="sticky-bottom my-footer">
        <button class="theme-button" onClick={() => changeTheme()} type="submit"><img class="theme-image" src={buttonTheme}/></button>
      </footer>
    </div>
  );
}
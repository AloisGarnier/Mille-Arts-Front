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

import lightBg from "../img/light-background.jpg";
import darkBg from "../img/dark-background.jpg";

import lightBtn from "../img/go-to-dark-mode.png"
import darkBtn from "../img/go-to-light-mode.png"

import "../css/style.css";
import "../css/sketchy.css";
import "../css/fontawesome.all.min.css";

export default function App() {

  const domain = "34.155.129.238";

  const [themeBackground, setThemeBackground] = useState(lightBg);
  const [buttonTheme, setButtonTheme] = useState(lightBtn);
  const [owner, setOwner] = useState(null);
  const [basket, setBasket] = useState([]);
  const [research, setResearch] = useState({search: ''});
  const [decorations, setDecorations] = useState([]);
  const [isCollapsedDisplayed, setCollapsedDisplayed] = useState(false);

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

  function changeTheme() {
    themeBackground == lightBg ? setThemeBackground(darkBg) : setThemeBackground(lightBg);
    themeBackground == lightBg ? setButtonTheme(darkBtn) : setButtonTheme(lightBtn);
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
          <Link to="/panier" class="btn btn-link"><i class="fa-solid fa-basket-shopping"></i>&thinsp; {basket.length}</Link>
          <Link to="/catalogue" class="btn btn-link">Tous les articles</Link>
          <Link to="/nouveautes" class="btn btn-link">Nouveautés</Link>
          <Link to="/mieux-notes" class="btn btn-link">Les mieux notés</Link>
          <Link to="/noel" class="btn btn-link">C'est déjà Noël !</Link>
          <Link to="/a-propos" class="btn btn-link">Qui suis-je ?</Link>
        </div>
      )
    }
  }

  return (
    <div class="theme" style={{ backgroundImage: `url(${themeBackground})` }}>
      <nav class="navbar navbar-expand-lg navbar-light bg-light-red sticky-top">
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
                <Link to="/panier" class="btn btn-link"><i class="fa-solid fa-basket-shopping"></i>&thinsp; {basket.length}</Link>
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
            basket={basket}
            setBasket={setBasket}
            decorations={decorations}
            setDecorations={setDecorations}
            domain = {domain}
          />}></Route>
          <Route exact path="/catalogue" element={
            <CatalogController
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
            basket={basket}
            setBasket={setBasket}
            domain = {domain}
            />
          }></Route>
          <Route exact path="/recherche" element={
            <ResearchController
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
            basket={basket}
            setBasket={setBasket}
            domain = {domain}
          />}></Route>
        </Routes>
    

      <footer class="sticky-bottom my-footer">
        <button class="theme-button" onClick={() => changeTheme()} type="submit"><img class="theme-image" src={buttonTheme}/></button>
      </footer>
    </div>
  );
}
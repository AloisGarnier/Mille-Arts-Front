import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Link, useNavigate} from "react-router-dom";

import CatalogController from "./CatalogController";
import LoginController from "./LoginController";
import SignupController from "./SignupController";
import ResearchController from "./ResearchController";
import Basket from "./Basket";
import MyAccount from "./MyAccount";

import lightBg from "../img/light-background.jpg";
import darkBg from "../img/dark-background.jpg";

import lightBtn from "../img/go-to-dark-mode.png"
import darkBtn from "../img/go-to-light-mode.png"

import "../css/style.css";
import "../css/sketchy.css";
import "../css/fontawesome.all.min.css";

export default function App() {

  const [themeBackground, setThemeBackground] = useState(lightBg);
  const [buttonTheme, setButtonTheme] = useState(lightBtn);
  const [owner, setOwner] = useState(null);
  const [basket, setBasket] = useState([]);
  const [research, setResearch] = useState({search: ''});
  const [decorations, setDecorations] = useState([]);

  useEffect(() => fetchConnectedOwner(), []);

  const navigate = useNavigate();

  function fetchConnectedOwner() {
    if(JSON.parse(window.localStorage.getItem("owner"))) {
      setOwner(JSON.parse(window.localStorage.getItem("owner")));
    }
  }

  function ownerName() {
    return owner != undefined ? owner.firstName + " " + owner.lastName : "Connexion";
  }

  function account() {
    return owner != undefined ? "/myaccount" : "/login";
  }

  function changeTheme() {
    themeBackground == lightBg ? setThemeBackground(darkBg) : setThemeBackground(lightBg);
    themeBackground == lightBg ? setButtonTheme(darkBtn) : setButtonTheme(lightBtn);
  }

  function getParamInURL() {
    return "/research?q=" + research.search;
  }

  function goToResearchPage(event) {
      event.preventDefault();
      navigate("/research?q=" + research.search);
      navigate(0);
  }

  return (
    <div class="theme" style={{ backgroundImage: `url(${themeBackground})` }}>
      <nav class="navbar navbar-expand-lg navbar-light bg-light-red sticky-top">
        <div class="container-fluid">
          <div class="col">
            <div class="my-row">
              <div class="collapse navbar-collapse navbar-left" id="navbarColor01">
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
              <Link class="d-flex navbar-brand" to="/catalog">Mille Arts</Link>
              <div class="collapse navbar-collapse navbar-right" id="navbarColor02">
                <Link to={account()} class="btn btn-link"><i class="fa-solid fa-user"></i>&thinsp; {ownerName()}</Link>
                <Link to="/basket" class="btn btn-link"><i class="fa-solid fa-basket-shopping"></i>&thinsp; {basket.length}</Link>
              </div>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01 #navbarColor02" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
            <div class="my-bottom-row collapse navbar-collapse">
              <div id="navbarColor02">
                <Link to="/catalog" class="btn btn-link">Tous les articles</Link>
                <Link to="/novelties" class="btn btn-link">Nouveautés</Link>
                <Link to="/best" class="btn btn-link">Les mieux notés</Link>
                <Link to="/christmas" class="btn btn-link">C'est déjà Noël !</Link>
                <Link to="/about" class="btn btn-link">Qui suis-je ?</Link>
              </div>
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
          />}></Route>
          <Route exact path="/catalog" element={
            <CatalogController
            basket={basket}
            setBasket={setBasket}
            decorations={decorations}
            setDecorations={setDecorations}
          />}></Route>
          <Route exact path="/login" element={
            <LoginController 
              linkSignUp="/signup"
              owner={owner}
              setOwner={setOwner}
          />}></Route>
          <Route exact path="/signup" element={
            <SignupController
              linkCatalog="/catalog"
              owner={owner}
              setOwner={setOwner}
          />}></Route>
          <Route exact path="/basket" element={
            <Basket 
            basket={basket}
            setBasket={setBasket}
            />
          }></Route>
          <Route exact path="/research" element={
            <ResearchController
            research={research}
            basket={basket}
            setBasket={setBasket}
            decorations={decorations}
            setDecorations={setDecorations}
          />}></Route>
          <Route exact path="/myaccount" element={
            <MyAccount
            linkLogOut="/"
            owner={owner}
            setOwner={setOwner}
          />}></Route>
        </Routes>
    

      <footer class="sticky-bottom my-footer">
        <button class="theme-button" onClick={() => changeTheme()} type="submit"><img class="theme-image" src={buttonTheme}/></button>
      </footer>
    </div>
  );
}
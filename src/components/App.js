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
import NewController from "./NewController";
import CommandController from "./CommandController";
import StatsController from "./StatsController";
import Legal from "./Legal";
import Terms from "./Terms";

import lightBg from "../img/light-bg.png";
import darkBg from "../img/dark-bg.png";
import christmasBg from "../img/christmas-bg.png";

import favicon from '../img/favicon.png'

import "../css/style.css";
import "../css/sketchy.css";
import "../css/fontawesome.all.min.css";
import { Helmet } from "react-helmet";

export default function App() {

  const domain = "https://34.120.129.4";
  //const domain = "http://localhost:8081"

  const [themeBackground, setThemeBackground] = useState(lightBg);
  const [owner, setOwner] = useState(null);
  const [basket, setBasket] = useState([]);
  const [research, setResearch] = useState({search: ''});
  const [decorations, setDecorations] = useState([]);
  const [isCollapsedDisplayed, setCollapsedDisplayed] = useState(false);
  const [isLightTheme, setLightTheme] = useState(true);
  const [isChristmas, setChristmas] = useState(false);
  const [about, setAbout] = useState("");
  const [cookies, setCookies] = useState(false);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => fetchConnectedOwner(), []);
  useEffect(() => fetchPreviousBasket(), []);
  useEffect(() => fetchCookies(), []);
  useEffect(() => fetchFavourites(), []);

  const navigate = useNavigate();

  /**
   * Fetches a connectedOwner in localStorage if there is one
   */
  function fetchConnectedOwner() {
    if(JSON.parse(window.localStorage.getItem("owner"))) {
      setOwner(JSON.parse(window.localStorage.getItem("owner")));
    }
  }

  function fetchPreviousBasket() {
    if(JSON.parse(window.localStorage.getItem("basket"))) {
      setBasket(JSON.parse(window.localStorage.getItem("basket")));
    }
  }

  function fetchCookies() {
    if(JSON.parse(window.localStorage.getItem("cookies"))) {
      setCookies(JSON.parse(window.localStorage.getItem("cookies")));
    }
  }

  function fetchFavourites() {
    if(JSON.parse(window.localStorage.getItem("favourites"))) {
      setFavourites(JSON.parse(window.localStorage.getItem("favourites")))
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
    isLightTheme ? setThemeBackground(darkBg) : setThemeBackground(lightBg);
    isLightTheme ? setLightTheme(false) : setLightTheme(true);
    setChristmas(false);
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
    if(isCollapsedDisplayed && (!owner || owner.id != 1)){
      return (
        <div class="d-flex flex-column">
          <Link to={account()} class="btn btn-link" onClick={() => setCollapsedDisplayed(!isCollapsedDisplayed)}><i class="fa-solid fa-user"></i>&thinsp; {ownerName()}</Link>
          <Link to="/panier" class="btn btn-link" onClick={() => setCollapsedDisplayed(!isCollapsedDisplayed)}><i class="fa-solid fa-basket-shopping"></i>&thinsp; {basket.length}</Link>
          <Link to="/catalogue" class="btn btn-link" onClick={() => setCollapsedDisplayed(!isCollapsedDisplayed)}>Tous les articles</Link>
          <Link to="/a-propos" class="btn btn-link" onClick={() => setCollapsedDisplayed(!isCollapsedDisplayed)}>Qui suis-je ?</Link>
          <form class="d-flex" onSubmit={event => goToResearchPage(event)}>
                  <input 
                    class="form-control me-sm-2" 
                    type="input" 
                    placeholder="Votre recherche"
                    value={research.search}
                    onChange={form => setResearch({...research, search: form.target.value})}
                  ></input>
                  <Link reloadDocument type="submit" to={getParamInURL()} class="btn btn-link my-2 my-sm-0" onClick={() => setCollapsedDisplayed(!isCollapsedDisplayed)}><i class="fas fa-search"></i></Link>
                </form>
        </div>
      )
    }
  }
  
  function navBarClass() {
    if(!isLightTheme && !isChristmas) {
      return("navbar navbar-expand-lg navbar-light bg-light-purple sticky-top")
    } else {
      return("navbar navbar-expand-lg navbar-light bg-light-red sticky-top")
    }
  }

  function acceptCookies() {
    setCookies(true);
    window.localStorage.setItem("cookies", true);
  }

  function checkCookiesAcceptance() {
    if(!cookies) {
      return(
        <div class="alert popup alert-danger d-flex flex-row justify-content-between">
          <div class="m-2">
            Nous utilisons des cookies et outils similaires afin de faciliter votre navigation sur ce site et améliorer votre expérience d'achat. <br/>
            Merci d'accepter tous les cookies ou de refuser les cookies non-essentiels.
          </div>
          <div class="m-2 d-flex justify-content-end">
            <Link 
                type="button" 
                class="btn btn-info"
                to="/catalogue"
                onClick={() => acceptCookies()}
            >
                J'accepte seulement les cookies essentiels
            </Link>
            <Link 
                type="button" 
                class="btn btn-success"
                to="/catalogue"
                onClick={() => acceptCookies()}
            >
                J'accepte tous les cookies
            </Link>
          </div>
        </div>
      );
    }
  }

  function isSnow() {
    if(themeBackground == christmasBg) {
      let snowflakes = [];
      for(let i=0;i<200;i++) {
        snowflakes.push(
          <div class="snow"></div>  
        );
      }
      return(
      <>
        {snowflakes}
      </>);
    }
  }

  function mainOptions() {
    if(!owner || owner.id != 1) {
      return(
        <div>
          <Link to="/catalogue" class="btn btn-link">Tous les articles</Link>
          <Link to="/nouveautes" class="btn btn-link">Nouveautés</Link>
          <Link to="/noel" class="btn btn-link">C'est déjà Noël !</Link>
          <Link to="/a-propos" class="btn btn-link">Qui suis-je ?</Link>
        </div>
      );
    } else {
      return(
        <div>
          <Link to="/catalogue" class="btn btn-link">Catalogue</Link>
          <Link to="/commandes" class="btn btn-link">Commandes</Link>
          <Link to="/gestion" class="btn btn-link">Statistiques</Link>
          <Link to="/a-propos" class="btn btn-link">Contact</Link>
        </div>
      );
    }
  }

  return (
    <div class="theme" style={{backgroundImage:`url(${themeBackground})`}}>
      {isSnow()}
      <Helmet>
        <title>Mille Arts</title>
        <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
        <meta property="og:title" content="Mille Arts" />
        <meta property="og:description" content="Venez dans ma boutique en-ligne pour acheter plein d'objets décoratifs" />
        <meta property="og:url" content="https://mille-arts.fr/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href={favicon} />
      </Helmet>
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
              <Link class="d-flex navbar-brand me-auto" to="/">Mille Arts</Link>
              <div class="collapse navbar-collapse navbar-right">
                <Link to={account()} class="btn btn-link"><i class="fa-solid fa-user"></i>&thinsp; {ownerName()}</Link>
                {displayBasket()}
              </div>
              <div class="collapsed navbar-right-collapsed">
                <div class="d-flex navbar-toggler-collapsed">
                  <button class="navbar-toggler" onClick={() => setCollapsedDisplayed(!isCollapsedDisplayed)}>
                    <span class="navbar-toggler-icon"></span>
                  </button>
                </div>
              </div>
            </div>

            <div class="my-bottom-row collapse navbar-collapse nav-item navbar-nav me-auto">
              <div class="sun-moon">
                <label class="form-check-label me-2" for="flexSwitchCheckChecked"><i class="fa-solid fa-sun"></i></label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onClick={() => changeTheme()} value={isLightTheme}/>
                  <label class="form-check-label" for="flexSwitchCheckChecked"><i class="fa-sharp fa-solid fa-moon"></i></label>
                </div>
              </div>
              {mainOptions()}
              <div class="pe-3 d-flex flex-row justify-content-around">
                <Link to="https://id.pinterest.com/carolinemilard" target="_blank" class="btn-link social-network"><i class="fa-brands fa-pinterest"></i></Link>
                <Link to="https://www.instagram.com/carolinemilard/" target="_blank" class="btn-link social-networkk"><i class="fa-brands fa-instagram"></i></Link>
              </div>
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
            favourites = {favourites}
            setFavourites = {setFavourites}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
          />}></Route>
          <Route exact path="/catalogue" element={
            <CatalogController
            owner={owner}
            basket={basket}
            setBasket={setBasket}
            decorations={decorations}
            setDecorations={setDecorations}
            domain = {domain}
            favourites = {favourites}
            setFavourites = {setFavourites}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
          />}></Route>
          <Route exact path="/connexion" element={
            <LoginController 
              owner={owner}
              setOwner={setOwner}
              domain = {domain}
              favourites={favourites}
              setFavourites={setFavourites}
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
            favourites = {favourites}
            setFavourites = {setFavourites}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
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
            favourites = {favourites}
            setFavourites = {setFavourites}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
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
            favourites = {favourites}
            setFavourites = {setFavourites}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
          />}></Route>
          <Route exact path="/nouveautes" element={
            <NewController
            owner={owner}
            basket={basket}
            setBasket={setBasket}
            decorations={decorations}
            setDecorations={setDecorations}
            themeBackground={themeBackground}
            setThemeBackground={setThemeBackground}
            domain = {domain}
            favourites = {favourites}
            setFavourites = {setFavourites}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
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
            basket = {basket}
          />}></Route>
          <Route exact path="/commandes" element={
            <CommandController
            domain = {domain}
          />}></Route>
          <Route exact path="/gestion" element={
            <StatsController
            domain = {domain}
          />}></Route>
          <Route exact path="/cgv" element={
            <Terms
            domain = {domain}
            owner = {owner}
            basket = {basket}
          />}></Route>
          <Route exact path="/mentions-legales" element={
            <Legal
            domain = {domain}
            owner = {owner}
            basket = {basket}
          />}></Route>
        </Routes>
    

      <footer class="my-footer d-flex flex-row sticky-bottom">
        {checkCookiesAcceptance()}
      </footer>
    </div>
  );
}
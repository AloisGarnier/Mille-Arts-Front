import React, {useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Catalog from "./Catalog";
import LoginController from "./LoginController";
import Signup from "./Signup";

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

  function ownerName() {
    return owner != null ? owner.firstName + " " + owner.lastName : "Connexion";
  }

  function changeTheme() {
    themeBackground == lightBg ? setThemeBackground(darkBg) : setThemeBackground(lightBg);
    themeBackground == lightBg ? setButtonTheme(darkBtn) : setButtonTheme(lightBtn);
  }

  return (
    <div class="theme" style={{ backgroundImage: `url(${themeBackground})` }}>
    <BrowserRouter>
      <nav class="navbar navbar-expand-lg navbar-light bg-light-red sticky-top">
        <div class="container-fluid">
          <div class="collapse navbar-collapse navbar-left" id="navbarColor01">
            <form class="d-flex">
              <input class="form-control me-sm-2" type="search" placeholder="Votre recherche"></input>
              <button class="btn btn-link my-2 my-sm-0" type="submit"><i class="fas fa-search"></i></button>
            </form>
          </div>
          <Link class="navbar-brand" to="/catalog">Mille Arts</Link>
          <div class="collapse navbar-collapse navbar-right" id="navbarColor02">
            <Link to="/login" class="btn btn-link"><i class="fa-solid fa-user"></i>&thinsp; {ownerName()}</Link>
            <button type="submit" class="btn btn-link"><i class="fa-solid fa-basket-shopping"></i>&thinsp; 0</button>
          </div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01 #navbarColor02" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

        <Routes>
          <Route exact path="/" element={<Catalog/>}></Route>
          <Route exact path="/catalog" element={<Catalog/>}></Route>
          <Route exact path="/login" element={
            <LoginController 
              linkSignUp="/signup"
              owner={owner}
              setOwner={setOwner}
          />}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
        </Routes>

    </BrowserRouter>

      <footer class="sticky-bottom my-footer">
        <button class="theme-button" onClick={() => changeTheme()} type="submit"><img class="theme-image" src={buttonTheme}/></button>
      </footer>
    </div>

  );
}
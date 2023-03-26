import React, {createContext} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import NavBar from "./NavBar";

import "../css/style.css"
import "../css/sketchy.css"
import "../css/fontawesome.all.min.css"

export default function App() {

  return (
    <NavBar />
  );
}
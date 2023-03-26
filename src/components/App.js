import React, {createContext} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import "../css/sketchy.css"
import "../css/style.css"

export const myContext = createContext();

function HelloWorld () {
  ReactDOM.render(
    <h1>Hello World !</h1>,
    document.getElementById("root")
  );
}

function HelloWorldJSX() {
  return (
    <h1>Hello World !</h1>
  );
}

class InnerComponent extends React.Component {
  render() {
    return (
      <div className="margin-1">
        Je suis un composant (de classe) interne.
      </div>
    );
  }
}

export default function App() {

  return (
    <div>
      <BrowserRouter>
        <div className="bg-light pt-3 pb-2">
          <ol>
            <li><Link to="/hello/world/jsx">Hello World JSX</Link></li>
            <li><Link to="/component/class/inner">Composant (de classe) interne</Link></li>
            <li><Link to="/component/class">Composant de classe</Link></li>
            <li><Link to="/component/class/function">Composant fonctionnel</Link></li>
            <li><Link to="/state/lift">Remonter l'état</Link></li>
            <li><Link to="/view/update">Mise à jour de la vue</Link></li>
            <li><Link to="/bootstrap">Bootstrap</Link></li>
            <li><Link to="/fetch">Fetch</Link></li>
            <li><Link to="/inheritence">Héritage</Link></li>
            <li><Link to="/composition">Composition</Link></li>
            <li><Link to="/context">Contexte</Link></li>
          </ol>
        </div>
        <hr className="mt-0" />
        <div>
          <Routes>
            <Route exact path="/hello/world/jsx" element={<HelloWorldJSX/>}></Route>
            <Route exact path="/component/class/inner" element={<InnerComponent/>}></Route>
            <Route exact path="/component/class" element={<CounterClass/>}></Route>
            <Route exact path="/component/class/function" element={<CounterFunction/>}></Route>
            <Route exact path="/state/lift" element={<StateLift/>}></Route>
            <Route exact path="/view/update" element={<ViewUpdate/>}></Route>
            <Route exact path="/bootstrap" element={<Bootstrap/>}></Route>
            <Route exact path="/fetch" element={<FetchController/>}></Route>
            <Route exact path="/inheritence" element={<Inheritence/>}></Route>
            <Route exact path="/composition" element={<Composition/>}></Route>
            <Route exact path="/context" element={<Context/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
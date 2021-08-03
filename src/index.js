import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login";
import Main from "./components/Main";
import Curso from "./components/Curso";
import Monitor from "./components/Monitor";
import Usuario from "./components/Usuario";


const App = () => (

    <BrowserRouter>
        <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/:userId/cursos" component={Main} exact />
            <Route path="/:userId/cursos/:cursoId" component={Curso} exact />
            <Route path="/:userId/monitor/:monitorId" component={Monitor} exact />
            <Route path="/:userId/usuario" component={Usuario} exact />
        </Switch>
    </BrowserRouter>

)
ReactDOM.render(<App />, document.getElementById("root"));


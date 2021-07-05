import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar.js";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Details from "./components/Details";
import Create from "./components/Create";
import NotFound from "./components/NotFound";

//Routes: / , /home , /create , /details

function App(props) {
    const DefaultRoutes = () => {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route path="/home/" component={Home} />
                    <Route path="/details/:entry" component={Details} />
                    <Route path="/create/" component={Create} />
                    <Route component={RedirectToNotFound} />
                </Switch>
            </div>
        );
    };

    const RedirectToNotFound = () => {
        return <Redirect to="/notfound" />;
    };

    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/notfound" component={NotFound} />
                    <Route exact path="/" component={LandingPage} />
                    <Route component={DefaultRoutes} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

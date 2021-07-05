import React from "react";
import { Link } from "react-router-dom";

import { LANDINGPAGE_BG } from "../constants";
import "../styles/LandingPage.css";
import "../styles/Buttons.scss";

class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <img src={LANDINGPAGE_BG} className="bg" alt="background" />
                <div className="bg-text centered">
                    <h1 className="title">Henry Pokedex</h1>
                    <div className="div-btn">
                        <Link to="/home">
                            <button className="landing-btn">INGRESAR</button>
                        </Link>
                    </div>

                    <p>PERN STACK: Proyecto individual</p>
                </div>
            </div>
        );
    }
}

export default LandingPage;

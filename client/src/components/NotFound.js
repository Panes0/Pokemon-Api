import React from "react";
import { Link } from "react-router-dom";
import { NOTFOUND_BG } from "../constants";
import "../styles/NotFound.scss";

class NotFound extends React.Component {
    render() {
        return (
            <div style={{ marginTop: "80px" }}>
                <img
                    src={NOTFOUND_BG}
                    className="notfound-img"
                    alt="background"
                />
                <h1>Page not found :(</h1>
                <Link to="/home">
                    <button className="notfound-btn">Get me back HOME</button>
                </Link>
            </div>
        );
    }
}

export default NotFound;

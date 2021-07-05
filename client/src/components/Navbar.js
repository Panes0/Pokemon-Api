import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navBar">
                <ul className="dropdown">
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/">Landing Page</Link>
                    </li>
                    <li>
                        <Link to="/create">Create</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "../styles/SearchBar.scss";

function SearchBar() {
    const [entry, setEntry] = useState("");
    const history = useHistory();
    const onFormSubmit = (e) => {
        //send to /pokemon/:entry
        e.preventDefault();
        history.push("/details/" + entry);
    };

    return (
        <form onSubmit={onFormSubmit} className="searchform">
            <input
                type="text"
                className="searchbar"
                placeholder="Search by Name or ID number..."
                onChange={(event) => {
                    setEntry(event.target.value);
                }}
                value={entry}
            />
            <i></i>
        </form>
    );
}

export default SearchBar;

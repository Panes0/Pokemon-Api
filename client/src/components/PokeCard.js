import React from "react";
import { useHistory } from "react-router-dom";

import "../styles/Card.css";

function PokeCard(props) {
    const history = useHistory(); //este hook para redireccionar
    var pokedata = props.pokedata;

    const onCardClick = () => {
        history.push("/details/" + pokedata.id);
    };

    return (
        <div onClick={onCardClick} className="card">
            <div className="card_image">
                <img src={pokedata.pic_url} alt="pokemon" />
            </div>

            <div className="card_title title-black">
                <p>
                    {pokedata.id}:{pokedata.name}
                </p>
            </div>
        </div>
    );
}

export default PokeCard;

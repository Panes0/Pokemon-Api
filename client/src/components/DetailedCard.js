import React from "react";
import "../styles/DetailedCard.scss";

function DetailedCard(props) {
    var pokedata = props.pokedata;

    return (
        <div className="det-card">
            <img
                src={pokedata.pic_url}
                alt="pokepic"
                width="200"
                height="200"
            />
            <div className="title">
                {pokedata.id}: {pokedata.name}
            </div>
            <div className="types">
                {pokedata.types.map((type) => {
                    return (
                        <div key={type} className="type">
                            {type}
                        </div>
                    );
                })}
            </div>

            <div className="phy-stats">
                <div className="prop">Height: {pokedata.height ?? "-"}</div>
                <div className="prop">Weight: {pokedata.weight ?? "-"}</div>
            </div>

            <div className="stats-col">
                <div className="stats">
                    <div className="item">HP</div>
                    <div className="item">ATK</div>
                    <div className="item">DEF</div>
                    <div className="item">SPD</div>
                </div>
                <div className="stats">
                    <div className="item">{pokedata.stats.hp ?? "-"}</div>
                    <div className="item">{pokedata.stats.attack ?? "-"}</div>
                    <div className="item">{pokedata.stats.defense ?? "-"}</div>
                    <div className="item">{pokedata.stats.speed ?? "-"}</div>
                </div>
            </div>
        </div>
    );
}

export default DetailedCard;

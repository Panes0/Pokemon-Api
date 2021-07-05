import React, { useState, useEffect } from "react";
import { LoadDisplay } from "../actions/actions";
import { connect } from "react-redux";
import { SORT, ORDER, CARDS_NUMBER, HENRY_ID_START } from "../constants";

import PokeCard from "./PokeCard";

import "../styles/PokeCards.scss";
import "../styles/Card.css";

function PokeCards(props) {
    var {
        loaded_pokemon,
        pokemon_display,
        // sort,
        // order,
        // page_number,
        // custom_only,
    } = props;

    const [order, setOrder] = useState(ORDER.ASCENDING);
    const [sort, setSort] = useState(SORT.NONE);
    const [page, setPage] = useState(0);
    const [customOnly, setCustomOnly] = useState(false);
    var busy = true;

    const onSortChange = (e) => {
        setSort(e.target.value);
    };

    const onOrderChange = (e) => {
        if (e.target.checked) {
            setOrder(ORDER.DESCENDING);
        } else {
            setOrder(ORDER.ASCENDING);
        }
    };

    const onCustomOnlyChange = (e) => {
        setPage(0);
        setCustomOnly(e.target.checked);
    };

    const onNextClick = (e) => {
        if (pokemon_display.length > CARDS_NUMBER * (1 + page)) {
            setPage(page + 1);
        }
    };

    const onPrevClick = (e) => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const sortAndFilter = () => {
        if (loaded_pokemon.length !== 0) {
            busy = true;
            //sorting and stuff
            let sort_int = Number.parseInt(sort);
            switch (sort_int) {
                case SORT.ALPHABETICALLY:
                    loaded_pokemon.sort((a, b) => {
                        return a.name < b.name
                            ? -1 * order
                            : a.name > b.name
                            ? 1 * order
                            : 0;
                    });
                    break;

                case SORT.ATTACK:
                    loaded_pokemon.sort((a, b) => {
                        return a.stats.attack < b.stats.attack
                            ? -1 * order
                            : a.stats.attack > b.stats.attack
                            ? 1 * order
                            : 0;
                    });
                    break;

                default:
                    //BY ID
                    loaded_pokemon.sort((a, b) => {
                        return a.id < b.id
                            ? -1 * order
                            : a.id > b.id
                            ? 1 * order
                            : 0;
                    });
                    break;
            }

            //filter customs
            if (customOnly) {
                pokemon_display = loaded_pokemon.filter((pok) => {
                    return pok.id >= HENRY_ID_START;
                });
            } else {
                pokemon_display = loaded_pokemon;
            }
            busy = false;
        }
    };

    useEffect(() => {
        LoadDisplay(pokemon_display);
    }, [loaded_pokemon, customOnly, order, sort, page, pokemon_display]);

    const render_cards = () => {
        sortAndFilter();
        if (pokemon_display.length !== 0) {
            //rendering
            var page_pokemon = pokemon_display.slice(
                CARDS_NUMBER * page,
                CARDS_NUMBER + CARDS_NUMBER * page
            );

            return page_pokemon.map((one_poke) => {
                return (
                    <div key={one_poke.id}>
                        <PokeCard pokedata={one_poke} />
                    </div>
                );
            });
        } else {
            if (busy) {
                //not yet fetched
                return <h1>LOADING...</h1>;
            } else {
                return <h1>No Pokemon found.</h1>;
            }
        }
    };

    return (
        <div className="pokecards">
            <div className="filters">
                <select name="sort" id="sort" onChange={onSortChange}>
                    <option value={SORT.ID}>ID #</option>
                    <option value={SORT.ALPHABETICALLY}>Alphabetically</option>
                    <option value={SORT.ATTACK}>Attack</option>
                </select>

                <div className="checkbox-wraper">
                    <input
                        name="reverse"
                        type="checkbox"
                        checked={order === ORDER.DESCENDING}
                        onChange={onOrderChange}
                    />
                    <label className="checkbox-label">Reverse</label>
                </div>

                <div className="checkbox-wraper">
                    <input
                        name="custom"
                        type="checkbox"
                        checked={customOnly}
                        onChange={onCustomOnlyChange}
                    />
                    <label className="checkbox-label">Custom only</label>
                </div>
            </div>

            <div className="cards-list">{render_cards()}</div>

            <div className="pageCtrl">
                <button name="previous" href="#" onClick={onPrevClick}>
                    Previous
                </button>
                <div className="pagenumber">{page}</div>
                <button name="next" href="#" onClick={onNextClick}>
                    Next
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loaded_pokemon: state.loaded_pokemon,
        pokemon_display: state.pokemon_display,
    };
};

//pruba para cargar los pokemon al state
const mapDispatchToProps = (dispatch) => {
    return {
        LoadDisplay: (pokemon_arr) => {
            dispatch(LoadDisplay(pokemon_arr));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokeCards);

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
    EMPTY,
    EMPTY_OBJECT,
    SEARCH_ID_URL,
    SEARCH_NAME_URL,
    STATUS,
    DETAILS_BG,
} from "../constants";
import axios from "axios";
import { AddPokemon } from "../actions/actions";

import DetailedCard from "./DetailedCard";

import "../styles/Details.scss";

function Details(props) {
    //let status = STATUS.EMPTY;
    let [status, setStatus] = useState(STATUS.EMPTY);
    let [pokemon, setPokemon] = useState(EMPTY_OBJECT);

    let loaded_pokemon = props.loaded_pokemon;
    let { entry } = useParams(); //este id es el que voy a buscar en el store o fetchearlo.

    const fetchData = async () => {
        //checkeo en el cache o busco en api. funciona para strings o numeros
        let found_pokemon = {};
        let name = entry;
        let id = Number.parseInt(entry);
        let response = {};
        if (pokemon.name !== name && pokemon.id !== id) {
            setStatus(STATUS.EMPTY);
            //es un numero por lo tanto busco por ID
            if (Number.isInteger(id) && id > 0) {
                found_pokemon = loaded_pokemon.filter((pok) => pok.id === id);
                if (found_pokemon.length === EMPTY) {
                    try {
                        response = await axios.get(SEARCH_ID_URL + id);
                        found_pokemon = response.data;
                    } catch (e) {
                        setStatus(STATUS.NOT_FOUND);
                    }
                } else {
                    found_pokemon = found_pokemon[0];
                }
            } else {
                //es un string con el nombre del pokemon.
                found_pokemon = loaded_pokemon.filter(
                    (pok) => pok.name === name
                );
                if (found_pokemon.length === EMPTY) {
                    try {
                        response = await axios.get(SEARCH_NAME_URL + name);
                        found_pokemon = response.data;
                    } catch (e) {
                        setStatus(STATUS.NOT_FOUND);
                    }
                } else {
                    found_pokemon = found_pokemon[0];
                }
            }
            props.AddPokemon(found_pokemon);
            setPokemon(found_pokemon);
            if (Object.keys(found_pokemon).length === 0) {
                setStatus(STATUS.NOT_FOUND);
            } else {
                setStatus(STATUS.LOADED);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [entry]); // eslint-disable-line react-hooks/exhaustive-deps

    const render = () => {
        if (status === STATUS.EMPTY) {
            return (
                <div>
                    <h1>LOADING POKEMON!</h1>
                </div>
            );
        } else if (status === STATUS.NOT_FOUND) {
            return (
                <div>
                    <h1>POKEMON NOT FOUND.</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <DetailedCard pokedata={pokemon} />
                </div>
            );
        }
    };

    return (
        <div className="center">
            <img src={DETAILS_BG} className="bg" alt="background" />
            {render()}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loaded_pokemon: state.loaded_pokemon,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        AddPokemon: (pokemon) => {
            dispatch(AddPokemon(pokemon));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);

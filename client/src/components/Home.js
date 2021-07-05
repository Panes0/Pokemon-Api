import { FORTY_POKEMON, GET_ALLCUSTOM, HOME_BG } from "../constants.js";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import axios from "axios";
import { AddPokemon } from "../actions/actions";

import SearchBar from "./SearchBar";
import PokeCards from "./PokeCards";

function Home(props) {
    const { loaded_pokemon } = props;

    const fetchPokelist = async () => {
        //get los pokemon del back.
        let response = await axios.get(FORTY_POKEMON);
        let poke_list = response.data;
        for (let single_pokemon of poke_list) {
            if (
                !loaded_pokemon.some((poke) => {
                    return poke.id === single_pokemon.id;
                })
            ) {
                props.AddPokemon(single_pokemon);
            }
        }

        //get los pokemon creados
        response = await axios.get(GET_ALLCUSTOM);
        poke_list = response.data;
        for (let single_pokemon of poke_list) {
            if (
                !loaded_pokemon.some((poke) => {
                    return poke.id === single_pokemon.id;
                })
            ) {
                props.AddPokemon(single_pokemon);
            }
        }
    };

    useEffect(() => {
        fetchPokelist();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={{ marginTop: "80px" }}>
            <img src={HOME_BG} className="bg" alt="background" />
            <SearchBar />

            <PokeCards />
        </div>
    );
}

//Le paso del store los states que voy a usar al props.
const mapStateToProps = (state, ownProps) => {
    return {
        loaded_pokemon: state.loaded_pokemon,
    };
};

//pruba para cargar los pokemon al state
const mapDispatchToProps = (dispatch) => {
    return {
        AddPokemon: (pokemon) => {
            dispatch(AddPokemon(pokemon));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

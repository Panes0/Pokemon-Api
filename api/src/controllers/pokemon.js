//aca van todas las acciones de las request a "/pokemon"
const axios = require("axios");
const { Op } = require("sequelize");
const { Pokemon, Poketype } = require("../db.js");
const {
    API_POKEMON,
    API_POKETYPE,
    API_LIMIT,
    HENRY_ID_START,
    POKE_COUNT,
    STATS,
    HENRY_PIC,
} = require("../constants");

//objeto rta contiene. ID, name, height,weight, stats{hp,atk,def,speed}, types[], pic_url
//le tiras la rta de la api (single, NO array) o de la DB y te lo transforma en un objeto para que todas las rtas sean iguales
const normalizeResponse = (pokedata) => {
    //como me doy cuenta si es de api o de la DB?
    var stats = {};
    var types = [];
    var pic_url = HENRY_PIC;
    if (pokedata.hasOwnProperty("stats")) {
        //implies API data
        stats = {
            hp: pokedata.stats[STATS.HP].base_stat,
            attack: pokedata.stats[STATS.ATTACK].base_stat,
            defense: pokedata.stats[STATS.DEFENSE].base_stat,
            speed: pokedata.stats[STATS.SPEED].base_stat,
        };
        types = pokedata.types.map((x) => {
            return x.type.name;
        });
        pic_url = pokedata.sprites.other["official-artwork"].front_default; //todo un tema si tiene un - la key
    } else {
        //pokedata from DB
        stats = {
            hp: pokedata.hp,
            attack: pokedata.attack,
            defense: pokedata.defense,
            speed: pokedata.speed,
        };
        types = pokedata.poketypes.map((x) => {
            return x.name;
        });
    }

    var normalized_data = {
        id: pokedata.id,
        name: pokedata.name,
        height: pokedata.height,
        weight: pokedata.weight,
        stats,
        types,
        pic_url,
    };

    return normalized_data;
};

//de cieta forma me tengo que traer todos los pokemon si despues quiero ordenarlos o
// const loadAllPokemonToDB = async (req, res) => {
//     var promise_arr = [];
//     var response_array = [];
//     var pokemon_array = [];
//     try {
//         //let all_pokemon = await axios.get(API_POKEMON + `?limit=${API_LIMIT}`);
//         let all_pokemon = await axios.get(API_POKEMON + `?limit=${2}`);
//         console.log(all_pokemon.data.results[0]);

//         for (var pokemon of all_pokemon.data.results) {
//             //console.log(pokemon.url);
//             promise_arr.push(axios.get(pokemon.url)); //en promise_arr guardo todas las promesas que despues ejecuto en paralelo
//         }
//         //promise_arr_1 = promise_arr.splice(promise_arr.length / 2);
//         response_array = await Promise.all(promise_arr);
//         //console.log("RESPONSE:", response_array);
//         pokemon_array = response_array.map((x) => normalizeResponse(x.data));

//         //test consolelog nombres
//         for (var poke of pokemon_array) {
//             console.log(poke.name);
//         }

//         res.send(pokemon_array);

//         // for (var i = 1; i <= API_LIMIT; i++) {
//         //     promise_arr.push(axios.get(API_POKEMON + `/${i}`));
//         // }
//         // response_array = await Promise.all(promise_arr);
//     } catch (e) {
//         console.log("ERROR @ LOADING DB:", e);
//         //response.data
//         //console.log(pokemon_array);
//         //pokemon_array = response_array.map((x) => normalizeResponse(x.data));
//         //res.send(pokemon_array[20]);
//     }
// };

const getPokemon = async (req, res) => {
    let { name } = req.query;
    var response, found_pokemon;

    if (!name) {
        //sin nombre, devuelve 40 pokemon
        var response_array = [];
        var promise_arr = [];
        var pokemon_array = [];
        try {
            for (var i = 1; i <= POKE_COUNT; i++) {
                promise_arr.push(axios.get(API_POKEMON + `/${i}`));
            }
            response_array = await Promise.all(promise_arr);

            pokemon_array = response_array.map((x) =>
                normalizeResponse(x.data)
            );
            res.send(pokemon_array);
        } catch (e) {
            res.send(e);
        }
    } else {
        //name existe
        try {
            response = await axios.get(API_POKEMON + `/${name}`);
        } catch (e) {
            //console.log("API: 404");
            found_pokemon = await Pokemon.findOne({
                where: { name },
                include: { model: Poketype },
            });
            if (found_pokemon !== null) {
                found_pokemon.dataValues.id += HENRY_ID_START;
            }
        }

        //Respuestas
        if (!response && !found_pokemon) {
            res.sendStatus(404);
        } else {
            response
                ? res.send(normalizeResponse(response.data))
                : res.send(normalizeResponse(found_pokemon.dataValues));
        }
    }
};

const getPokemonById = async (req, res) => {
    let { id } = req.params;
    id = Number.parseInt(id); //si no es numero returns NaN
    if (id > 0) {
        //valid id
        //HENRY_ID_START starts @ ID:20000
        if (id > HENRY_ID_START) {
            //checking DB
            var id_db = id - HENRY_ID_START;
            var found_pokemon = await Pokemon.findByPk(id_db, {
                include: { model: Poketype },
            });
            if (found_pokemon == null) {
                //not found
                res.sendStatus(404);
            } else {
                found_pokemon.dataValues.id += HENRY_ID_START;
                //console.log(found_pokemon.dataValues);
                res.send(normalizeResponse(found_pokemon.dataValues));
            }
        } else {
            //checking api:
            try {
                var response = await axios.get(API_POKEMON + `/${id}`);
                res.send(normalizeResponse(response.data));
            } catch (e) {
                //not found
                res.sendStatus(404);
            }
        }
    } else {
        //id == NaN
        res.sendStatus(400);
    }
};

//crea un pokemon y lo tira en la DB
//al body van todos los parametros del nuevo pokemon.
const createPokemon = async (req, res) => {
    let { name, hp, attack, defense, speed, height, weight, types } = req.body;

    let new_pokemon = {
        name,
        hp: hp || null,
        attack: attack || null,
        defense: defense || null,
        speed: speed || null,
        height: height || null,
        weight: weight || null,
    };
    types.forEach((x) => Number.parseInt(x)); //del json vienen array de strings

    try {
        var created_pokemon = await Pokemon.findOrCreate({
            where: {
                ...new_pokemon,
            },
            include: { model: Poketype },
        });
        if (types != null) {
            await created_pokemon[0].setPoketypes(types);
        }
        res.send(created_pokemon[0]);
    } catch (e) {
        res.sendStatus(300);
    }
};

const getAllCustomPokemon = async (req, res) => {
    var response, found_pokemon;
    var pokemon_array = [];
    try {
        response = await Pokemon.findAll({
            include: { model: Poketype },
        });
        if (response.length !== 0) {
            found_pokemon = response.dataValues;

            response.forEach((poke) => {
                poke.dataValues.id += HENRY_ID_START;
            });

            //response.data
            pokemon_array = response.map((x) =>
                normalizeResponse(x.dataValues)
            );
        }
        res.send(pokemon_array);
    } catch (e) {
        res.sendStatus(404);
    }
};

module.exports = {
    getPokemon,
    getPokemonById,
    createPokemon,
    getAllCustomPokemon,
    //loadAllPokemonToDB,
};

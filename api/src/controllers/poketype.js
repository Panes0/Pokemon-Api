const axios = require("axios");
const { Poketype } = require("../db.js");
const { API_POKEMON, API_POKETYPE } = require("../constants.js");

const getPokeTypes = async (req, res) => {
    let response = await axios.get(API_POKETYPE);
    let types_array = response.data.results; //tiene {name , url}

    for (var type of types_array) {
        Poketype.findOrCreate({
            where: { name: type.name },
        });
    }
    console.log("Types loaded to DB.");

    res.sendStatus(200);
};

module.exports = {
    getPokeTypes,
};

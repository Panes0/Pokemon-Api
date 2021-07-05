"use strict";

var express = require("express");
var pokemon = express.Router();
//var model = require("../models/model");
const {
    getPokemon,
    getPokemonById,
    createPokemon,
    getAllCustomPokemon,
    //loadAllPokemonToDB,
} = require("../controllers/pokemon.js");

pokemon.get("/", getPokemon);

pokemon.get("/allcustom", getAllCustomPokemon);

//pokemon.get("/loadDB", loadAllPokemonToDB);

pokemon.get("/:id", getPokemonById);

pokemon.post("/", createPokemon);

module.exports = pokemon;

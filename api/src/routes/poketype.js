"use strict";

var express = require("express");
var poketype = express.Router();
//var model = require("../models/model");
const { getPokeTypes } = require("../controllers/poketype.js");

poketype.get("/", getPokeTypes);

module.exports = poketype;

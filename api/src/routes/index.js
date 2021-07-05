const { Router } = require("express");
const pokemon = require("./pokemon.js");
const poketype = require("./poketype.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemon", pokemon); //get: /, /id
router.use("/types", poketype);

module.exports = router;

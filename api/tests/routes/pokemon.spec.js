/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
    name: "Pikachu",
};
const new_pokemon = {
    name: "newpokemon",
    hp: 1,
    attack: 2,
    defense: 3,
    speed: 4,
    height: 5,
    weight: 6,
    types: [1, 5, 2],
};

describe("Pokemon routes", () => {
    before(() =>
        conn.authenticate().catch((err) => {
            console.error("Unable to connect to the database:", err);
        })
    );
    beforeEach(() =>
        Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
    );
    describe("GET /pokemon", () => {
        it("should get 200", () => {
            agent.get("/pokemon").expect(200);
        }).timeout(5000);
        it("should get 200", () => agent.get("/pokemon/allcustom").expect(200));
        it("should get 200", () => agent.get("/pokemon/1").expect(200));
        it("should get 404", () => agent.get("/pokemon/999").expect(404));
        it("should get 400", () =>
            agent.get("/pokemon/idonotexist").expect(400));
    });

    describe("POST /pokemon", () => {
        it("should get 200", () =>
            agent.post("/pokemon").send(new_pokemon).expect(200));
    });
});

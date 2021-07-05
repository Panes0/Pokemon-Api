const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
    before(() =>
        conn.authenticate().catch((err) => {
            console.error("Unable to connect to the database:", err);
        })
    );
    describe("Validators", () => {
        beforeEach(() => Pokemon.sync({ force: true }));
        describe("name", () => {
            it("should throw an error if name is null", (done) => {
                Pokemon.create({})
                    .then(() => done(new Error("It requires a valid name")))
                    .catch(() => done());
            });
            it("should work when its a valid name", () => {
                Pokemon.create({ name: "Pikachu" });
            });
            it("should throw an error if hp is not an int", (done) => {
                Pokemon.create({ name: "Pikachu", hp: "asd" })
                    .then(() =>
                        done(new Error("It requires a valid hp datatype"))
                    )
                    .catch(() => done());
            });
            it("should throw an error if attack is not an int", (done) => {
                Pokemon.create({ name: "Pikachu", attack: "asd" })
                    .then(() =>
                        done(new Error("It requires a valid attack datatype"))
                    )
                    .catch(() => done());
            });
            it("should throw an error if defense is not an int", (done) => {
                Pokemon.create({ name: "Pikachu", defense: "asd" })
                    .then(() =>
                        done(new Error("It requires a valid defense datatype"))
                    )
                    .catch(() => done());
            });
            it("should throw an error if speed is not an int", (done) => {
                Pokemon.create({ name: "Pikachu", speed: "asd" })
                    .then(() =>
                        done(new Error("It requires a valid speed datatype"))
                    )
                    .catch(() => done());
            });
            it("should throw an error if height is not an int", (done) => {
                Pokemon.create({ name: "Pikachu", height: "asd" })
                    .then(() =>
                        done(new Error("It requires a valid height datatype"))
                    )
                    .catch(() => done());
            });
            it("should throw an error if weight is not an int", (done) => {
                Pokemon.create({ name: "Pikachu", weight: "asd" })
                    .then(() =>
                        done(new Error("It requires a valid weight datatype"))
                    )
                    .catch(() => done());
            });
        });
    });
});

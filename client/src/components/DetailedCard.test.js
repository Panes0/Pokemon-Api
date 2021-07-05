import React from "react";
import { screen, render } from "@testing-library/react";
import { Router } from "react-router-dom";
import DetailedCard from "./DetailedCard";

const pokedata = {
    name: "name",
    pic_url: "url",
    height: 11,
    weight: 22,
    stats: {
        hp: 1,
        attack: 2,
        defense: 3,
        speed: 4,
    },
    types: [1, 2, 3, 4],
};

const component = render(<DetailedCard pokedata={pokedata} />);

describe("DetailedCard", () => {
    it("must have class det-card", () => {
        expect(component.container.firstChild).toHaveClass("det-card");
    });
});

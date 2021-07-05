import React from "react";
import ReactDom from "react-dom";

import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/ingresar/i);
    expect(linkElement).toBeInTheDocument();
});

import React from "react";
import { FORM_BG } from "../constants";

import CreateForm from "./CreateForm";

import "../styles/Create.scss";

function Create() {
    return (
        <div>
            <img src={FORM_BG} className="bg" alt="background" />
            <CreateForm />
        </div>
    );
}

export default Create;

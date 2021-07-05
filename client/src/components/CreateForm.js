import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { CREATE_URL, ALL_TYPES } from "../constants";
import "../styles/CreateForm.scss";
import "../styles/Checkbox.css";

const type_init = Object.fromEntries(
    Object.keys(ALL_TYPES).map((key) => [key, false])
);

//////////////////////////////////////
//////////////////////////////////////
function CreateForm(props) {
    let history = useHistory();
    const [formData, setFormData] = useState({
        name: "",
        hp: 1,
        attack: 1,
        defense: 1,
        speed: 1,
        height: 1,
        weight: 1,
    });
    const [types, setTypes] = useState(type_init);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (formData.name !== "") {
            //convierto los checkboxes a un array con los numeros de tipo
            let type_indexes = [];
            let index = 1;
            for (const type in types) {
                if (types[type]) {
                    type_indexes.push(index);
                }
                index++;
            }
            try {
                await axios.post(CREATE_URL, {
                    ...formData,
                    types: type_indexes,
                });

                history.push("/home"); // redirect
            } catch (e) {
                alert(e);
            }
        } else {
            alert("The new Pokemon must have a Name.");
        }
    };

    const onNameChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            name: value,
        });
    };

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onTypeChange = (e) => {
        const name = e.target.name;
        const value = e.target.checked;

        setTypes({
            ...types,
            [name]: value,
        });
    };

    const typeCheckboxes = () => {
        let ret_array = [];
        for (const [key] of Object.entries(ALL_TYPES)) {
            ret_array.push(
                <li key={key}>
                    <input
                        type="checkbox"
                        id={key}
                        name={key}
                        key={key}
                        value={types[key]}
                        onChange={onTypeChange}
                    />
                    <label htmlFor={key}>{key}</label>
                </li>
            );
        }
        return ret_array;
    };

    return (
        <div className="form">
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={onNameChange}
                        placeholder="Name"
                        className="name"
                    />
                </div>
                <div className="stats">
                    <label>HP:</label>
                    <input
                        name="hp"
                        type="number"
                        value={formData.hp}
                        min="1"
                        onChange={onChange}
                        className="bar"
                    />
                    <label>ATK:</label>
                    <input
                        name="attack"
                        type="number"
                        min="1"
                        value={formData.attack}
                        onChange={onChange}
                        className="bar"
                    />
                    <label>DEF:</label>
                    <input
                        name="defense"
                        type="number"
                        min="1"
                        value={formData.defense}
                        onChange={onChange}
                        className="bar"
                    />
                    <label>SPD:</label>
                    <input
                        name="speed"
                        type="number"
                        min="1"
                        value={formData.speed}
                        onChange={onChange}
                        className="bar"
                    />
                </div>

                <div className="weight-height">
                    <label>height:</label>
                    <input
                        name="height"
                        type="number"
                        min="1"
                        value={formData.height}
                        onChange={onChange}
                    />
                    <label>weight:</label>
                    <input
                        name="weight"
                        type="number"
                        min="1"
                        value={formData.weight}
                        onChange={onChange}
                    />
                </div>

                <div className="container">
                    <ul className="ks-cboxtags">{typeCheckboxes()}</ul>
                </div>

                <input type="submit" className="submit-btn" />
            </form>
        </div>
    );
}

export default CreateForm;

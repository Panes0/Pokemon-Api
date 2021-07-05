//estos reciben el payload y retornan algo que podes tirar en el dispatcher
//ej: dispatch(AddPokemon(pokemon));
import { ADD_POKEMON, LOAD_DISPLAY } from "../constants";

export const AddPokemon = (payload) => {
    return {
        type: ADD_POKEMON,
        payload: payload,
    };
};

export const LoadDisplay = (payload) => {
    return {
        type: LOAD_DISPLAY,
        payload: payload,
    };
};

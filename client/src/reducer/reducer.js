import { ADD_POKEMON, LOAD_DISPLAY } from "../constants";
//const initialState = [];

//state es array de pokemon
//          {id,
//          name,
//          height,
//          weight,
//          stats,
//          types,
//          pic_url,};

const initialState = {
    loaded_pokemon: [], //estos son todos los pokemon que se fetchearon
    pokemon_display: [], //estos son los pokemon que estan en el paginado
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // Aca va tu codigo;
        case ADD_POKEMON:
            if (state.loaded_pokemon.length === 0) {
                //tengo que revisar que no sea vacio porque si no no puedo iterar
                return {
                    ...state,
                    loaded_pokemon: [action.payload],
                };
            } else {
                if (
                    !state.loaded_pokemon.some(
                        (poke) => poke.id === action.payload.id
                    )
                ) {
                    //con eso checkeo que no se agreguen repetidos
                    return {
                        ...state,
                        loaded_pokemon: [
                            ...state.loaded_pokemon,
                            action.payload,
                        ],
                    };
                } else {
                    return state;
                }
            }

        case LOAD_DISPLAY:
            return {
                ...state,
                pokemon_display: action.payload,
            };

        default:
            return state;
    }
};

export default rootReducer;

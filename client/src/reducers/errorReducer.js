import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {};

// Every reducer is going to export a function which takes the initialstate and an action
export default function(state = initialState, action) {

    switch (action.type) {

        case GET_ERRORS:
            return action.payload; // this will get accessed from the component if there is any errors

        case CLEAR_ERRORS:
            return {};

        default:
            return state;
    }
}

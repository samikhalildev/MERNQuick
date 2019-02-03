
// Action Types
import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {};


export default function(state = initialState, action) {

    switch (action.type) {

        case GET_ERRORS:
            return action.payload; // This will be sent to the errors state which can then display errors in the view

        case CLEAR_ERRORS:
            return {};

        default:
            return state;
    }
}

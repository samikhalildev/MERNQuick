
// Action Types
import { SET_CURRENT_USER } from "../actions/types";

import isEmpty from '../utils/is-empty'

// This will be the state for this reducer when the application starts up
const initialState = {
    isAuthenticated: false,
    user: {}
};

// A reducer exports a function which takes the current state and an action
export default function (state = initialState, action) {

    // Depending on the action type, the reducer will update the store
    // The data passed in can be accessed via action.payload
    switch (action.type) {

        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };

        default:
            return state;
    }
}



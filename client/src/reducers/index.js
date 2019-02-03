/*
 * Combines together all reducers to one big object to the store
 */
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';


// The key is how you can access the state within your components
// If you create a new reducer, you must add it here.
const allReducers = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer
});

export default allReducers;

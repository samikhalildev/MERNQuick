import axios from 'axios';


// This will make sure to assign the account header
const setAuthToken = token => {

    if (token) {
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // Delete account header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;

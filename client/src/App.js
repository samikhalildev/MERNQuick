
import React, { Component } from 'react';

// React Router
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// CSS
import './styles/main.css';

// JWT Token
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

// Actions
import { logoutUser, setCurrentUser } from './actions/authActions';
import { clearProfile } from "./actions/profileActions";


// Components
import PrivateRoute from './components/layout/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

import Login from './components/account/Login';
import Register from './components/account/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/dashboard/CreateProfile';
import EditProfile from './components/dashboard/EditProfile';



// Check for token
if (localStorage.jwtToken) {

    // Set account token header
    setAuthToken(localStorage.jwtToken);

    // Decode token and get user info and expiration
    const decoded = jwt_decode(localStorage.jwtToken);

    // Set user and isAuthenticate
    store.dispatch(setCurrentUser(decoded));
}


/*
Redux steps:
    1. Create a provider here
    2. Create a store in store.js
    3. Create reducers and combine all reducers
    4. Create types
    5. Create actions for each reducer

In Components:
    1. Import actions
    2. Export actions
    3. this.props.action
    4. map state to props using mapStateToProps()
    5. add PropTypes to props
 */

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>

                        <Route exact path="/" component={Landing} />

                        <div className="container">
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />

                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            </Switch>

                            <Switch>
                                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                            </Switch>

                            <Switch>
                                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                            </Switch>

                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;

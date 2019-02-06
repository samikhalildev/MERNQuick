## Single Page Applications (SPAs)
MERN is one of the most popular stack for Single Page Applications (SPAs). 

In traditional web applications, the server usually renders the web page depending on the web request.
In SPAs the whole application lives on a single web page that is sent from the server once I.e. the client only gets one HTML page from the server.

## React
React is where the magic of SPAs happen. React allows us to create components of UI's and render them on the page depending on the URL route, similar to how traditional web servers render HTML but instead on the client.

A component is simply a React class that renders HTML. When the state changes, React listens for these changes and will automatically update the view to reflect the changes

App.js is the meeting place for all components. Index.js is the root file of our app that renders components into the DOM.


#### There are two ways of using data in React:
- State: managed within the component (similar to variables declared inside a function). Use state when data needs to dynamic.
- Props: short for properties, passed to a component (similar to a function parameter). Use props when data doesn't need to be dynamic.


## Redux
Redux allows us to manage and use data within the components in our app. The reason we need a state management system like Redux is because React state is private, it is only accessed within that component, so we use Redux for data that we need to access in multiple components.

### Redux Terminology
- Store: A big JavaScript object that holds the application state. 

- Reducer: A function that takes in the current state and an action and returns the next state of the app. It specifies how the application's state changes in response to actions. 

- Action: An object contains information to send data from the view to the store.

- Action type: A string that describes what the data is, used within an action creator and a reducer to update the store. It is just some text to indicate what data is being dispatched to the reducer.

- Action Creator: A function that dispatches an action to all reducers, usually called from the view as props.

#### Let's show the user's profile when they click on a profile page

### Here's what happens inside:
When a user clicks on a profile page, an action creator is called which dispatches an action containing a type and payload to all reducers. The reducer managing the Profile state updates the store. Once the store is updated, our view re-renders the component to reflect the changes on our application.

### Step by step guide:

1. Add an action type to indicate what the data is when it is dispatched to the reducer:
```js 
export const GET_PROFILE = 'GET_PROFILE' 
```

2. In actions/profileActions, add an action creator:
```js
import { GET_PROFILE } from './types';

// Will call this from the view later
export const getProfile = () => dispatch => {

    // Here we make an API call or whatever that you need to do
    axios
        .get(api_endpoint)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
}       
```

3. In reducers/profileReducer, create a reducer to handle the actions:
```js
import { GET_PROFILE } from './types';

// Create a state for the reducer when the application starts up
const initialState = {
    profile: {}
};

// The state parameter is the profile state that comes from the store
// The action is the object containing a type and payload we dispatched in our action creator above
export default function (state = initialState, action) {

    // We specify how to update the store based on the action type 
    switch (action.type) {

        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
            // We never write directly to state or its fields, instead we return new objects. 
        
        default:
            return state;
    }

}

// Note that each reducer manages its own part of the global state. 
// The state parameter is different for every reducer.
```

4. This is where we create our profile state. In reducers/index.js, add the profileReducer to the rootReducer object so that it can be sent to the store and accessed within the view:
```js
import profileReducer from './profileReducer';

// The key is how you can access this state within the components
const rootReducer = combineReducers({
    profile: profileReducer
});

export default rootReducer;
```

5. Connect your component to Redux:

```js
import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Action creators
import { getProfile } from "../actions/profileActions";

class Profile extends Component {
    render() {
        <div> 
            <h1> Profile </h1>
        </div>
    }
    
    // Pass actions inside the object
    export default connect(null, { getProfile })(Profile);

}
```

6. Create a mapStateToProps function to allow us to use the profile state within the Redux store as props:

```js
    const mapStateToProps = (state) => ({
        profile: state.profile
    });
    
    // Pass mapStateToProps as the first argument to connect.
    export default connect(mapStateToProps, { getProfile })(Profile);
```

7. Final step, calling the action creator getProfile() and using the profile state from our props:

```js
    componentDidMount() {    
        this.props.getProfile();
    }
    
    render() {
        <div>
            <h1> Profile </h1>
            <ul>
                <li> {this.props.profile.name} </li> 
                <li> {this.props.profile.age} </li> 
                <li> {this.props.profile.bio} </li> 
            </ul>
        </div>
     }
```

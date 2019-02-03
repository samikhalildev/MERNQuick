
// React and redux modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import './styles/main.css';

// Import actions here...
import { getCurrentProfile } from "../actions/profileActions";


// Custom react component/class
class ComponentExample extends Component {

    // Gets called before the component renders
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}



// Assign prop types to props being used
ComponentExample.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

// Map state to props so they can be used in this component
const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});


// Connect actions to use within redux and export component
export default connect(mapStateToProps, { getCurrentProfile })(ComponentExample);

import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// WithRouter is used to redirect to another page by passing history to the action creator
import { Link, withRouter } from 'react-router-dom';

// CSS
import './styles/main.css';

// Actions
import { getCurrentProfile } from "../actions/profileActions";



class Dashboard extends Component {

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
Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

// Map state to props so they can be used in this component
const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});


// Connect actions to use within redux
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

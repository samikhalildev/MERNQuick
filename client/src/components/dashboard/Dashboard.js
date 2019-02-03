import React, { Component } from 'react';

// Connecting redux and other modules
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Import the action that you want to use below...
import { getCurrentProfile } from "../../actions/profileActions";
import { deleteAccount } from "../../actions/profileActions";
import Spinner from '../layout/Spinner';

class Dashboard extends Component {

    // Gets called before the component renders
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    deleteAccount = (event) => {
        this.props.deleteAccount();
    }

    render() {

        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        console.log(profile);
        let dashbaordContent;

        if(profile === null || loading) {
            dashbaordContent = <Spinner/>;

        } else {

            // Check if logged in user has profile data
            if(Object.keys(profile).length > 0){
                dashbaordContent = (
                    <div>
                        <p className="lead text-muted"> Welcome <Link to={`/profile/${profile.handle}`}> {user.name} </Link> </p>
                        <div className="btn-group mb-4" role="group">
                            <Link to="/edit-profile" className="btn btn-light">
                                <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile
                            </Link>
                        </div>
                        <div style={{marginBottom: '60px'}}/>
                        <button onClick={this.deleteAccount} className="btn btn-danger">Delete My Account</button>
                    </div>
                );

            } else {
                // User doesn't have a profile
                dashbaordContent = (
                    <div>
                        <p className="lead text-muted"> Welcome {user.name} </p>
                        <p> You have not yet setup a profile, please add some info.</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info"> Create Profile </Link>
                    </div>
                )
            }

        }

        return (
            <div className="dashboard">
                <div children="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashbaordContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// Assign prop types to props
Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

// Map state to props so they can be used in this component
const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

// pass in actions used inside the object
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);

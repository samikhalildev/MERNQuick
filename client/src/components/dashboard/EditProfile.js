import React, { Component } from 'react';

// Connecting redux and other modules
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';

// Import other components
import TextFieldGroup from '../layout/TextFieldGroup';
import TextArea from '../layout/TextArea';
import SelectList from '../layout/SelectList';
import SocialMediaInput from '../layout/SocialMediaInput';

// import the action that you want to use below...
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubUsername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    // Gets called before the component renders
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            // Bring skills array back to CSV (comma separated values)
            const skillsCSV = profile.skills.join(',');

            // if profile field doesnt exist, make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.status = !isEmpty(profile.status) ? profile.status : '';
            profile.githubUsername = !isEmpty(profile.githubUsername) ? profile.githubUsername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';

            //Set component fields state
            this.setState({
                handle: profile.handle,
                school: profile.company,
                website: profile.website,
                fieldOfStudy: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubUsername: profile.githubUsername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                youtube: profile.youtube,
                linkedin: profile.linkedin,
                instagram: profile.instagram
            });

        }
    }

    onSubmit = (event) => {
        event.preventDefault();

        const profileData = {
            handle: this.state.handle,
            school: this.state.company,
            website: this.state.website,
            fieldOfStudy: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubUsername: this.state.githubUsername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            youtube: this.state.youtube,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            instagram: this.state.instagram
        };

        this.props.createProfile(profileData, this.props.history);
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {

        const { errors, displaySocialInputs } = this.state;

        let socialInput;

        if(displaySocialInputs) {
            socialInput = (
                <div>
                    <SocialMediaInput
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                    <SocialMediaInput
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />

                    <SocialMediaInput
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />

                    <SocialMediaInput
                        placeholder="Youtube Profile URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />

                    <SocialMediaInput
                        placeholder="Instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />

                </div>
            )
        }

        // Select options for status
        const options = [
            { label: 'Select Professional Status', value: '0' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or learning', value: 'Student or learning' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ];


        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center"> Edit Your Profile </h1>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>

                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname."
                                />

                                <SelectList
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    error={errors.status}
                                    options={options}
                                    info="Give us an idea of where you are at in your career."
                                />

                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.school}
                                    info="Could be your own company or one you work for."
                                />

                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Could be your own website or one you work for."
                                />

                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.fieldOfStudy}
                                    info="City or state"
                                />

                                <TextFieldGroup
                                    placeholder="* Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use comma separated values (eg. HTML,CSS,JS)"
                                />

                                <TextFieldGroup
                                    placeholder="Github username"
                                    name="githubUsername"
                                    value={this.state.githubUsername}
                                    onChange={this.onChange}
                                    error={errors.githubUsername}
                                    info="If you want your latest repos and a Github link, include your username"
                                />

                                <TextArea
                                    placeholder="Short Gio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                />

                                <div className="mb-3">
                                    <button type="button" onClick={() => {
                                        this.setState( prevState => ({
                                            displaySocialInputs: !prevState.displaySocialInputs
                                        }))
                                    }} className="btn btn-light">
                                        Add Social Network Links
                                        <span className="text-muted"> Optional </span>
                                    </button>
                                </div>

                                {socialInput}
                                <input type="submit" value="Edit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// Assign prop types to props
EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

// Map state to props so they can be used in this component
const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

// pass in actions used inside the object
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));

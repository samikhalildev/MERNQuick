const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation
const validateProfileInput = require('../../validation/profile');

// Load Models
const User = require('../../models/User');
const Profile = require('../../models/Profile');

/*  @route      GET api/profile/
    @desc       gets profile data
    @access     Public
 */
router.get('/test', (req, res) => {
    res.json({
        msg: "Profile api route works"
    });
});



/*  @route      GET api/profile
    @desc       Get user profile
    @access     Private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const errors = {};

    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {

            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);

            } else {
                res.json(profile);
            }

        })
        .catch(err => res.status(404).json(err));
});



/*  @route      GET api/profile/all
    @desc       Get all profiles
    @access     Public
 */
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {

            if (!profiles) {
                errors.noprofile = 'There are no profiles';
                res.status(404).json(errors);
            } else {
                res.json(profiles);
            }
        })
        .catch(err => res.status(404).json({ profile: 'THere is no profile for this user' }));
});





/*  @route      GET api/profile/:handle
    @desc       Get profile by handle (anyone can see profiles)
    @access     Public
 */
router.get('/:handle', (req, res) => {

    const errors = {};

    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {

            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            } else {
                res.json(profile);
            }

        })
        .catch(err => res.status(404).json({ profile: 'THere is no profile for this user' }));
});


/*  @route      GET api/profile/:user_id
    @desc       Get profile by user ID
    @access     Public
 */
router.get('/:user_id', (req, res) => {

    const errors = {};

    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {

            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            } else {
                res.json(profile);
            }

        })
        .catch(err => res.status(404).json({ profile: 'THere is no profile for this user' }));
});




/*  @route      POST api/profile
    @desc       Create or edit user profile
    @access     Private
 */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    // 1: Get fields
    const profileFields = {};

    profileFields.user = req.user.id;

    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) locationprofileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername;

    // Skills
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    // 2: Search user by their id
    Profile.findOne({ user: profileFields.user })
        .then(profile => {

            // 3.1: Update Profile
            if(profile) {
                Profile.findOneAndUpdate({ user: profileFields.user }, { $set: profileFields }, { new: true })
                    .then(profile => res.json(profile));


            } else {
                // 3.2: Create Profile
                Profile.findOne({ handle: profileFields.handle }).then(profile => {

                    // Check if handle exists
                    if(profile) {
                        errors.handle = 'That handle already exists';
                        res.status(400).json(errors);
                    }

                    // 4: Save profile and return as json
                    new Profile(profileFields).save().then(profile => res.json(profile));

                });
            }
        })
        .catch(err => console.log(err));
});

module.exports = router;

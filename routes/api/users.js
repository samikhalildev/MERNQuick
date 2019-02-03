const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/config');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');



// Status code:
// 202 = OK
// 400 = user error
// 404 = page not found

/*  @route      GET api/users/
    @desc       gets user data
    @access     Public
 */

router.get('/test', (req, res) => {
    res.json({
        msg: "Users api route works"
    });
});




/*  @route      GET api/users/register
    @desc       Register a user
    @access     Public
 */

router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {

            if (user) {
                errors.email = 'Email already exists';
               return res.status(400).json(errors);

            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // Size
                    r: 'pg',  // Rating
                    d: 'mm'   // Default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar
                });

                // Generate a hashed password and save user into db
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });

            }

        });
});





// LOGIN


/*  @route      GET api/users/login
    @desc       Login user/returning jwt token
    @access     Public
 */

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email })
        .then(user => {
            if(!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    // User matched
                    if(isMatch) {

                       // Create JWT payload
                       const payload = { id: user.id, name: user.name, avatar: user.avatar };

                       // Create Token
                       jwt.sign(payload, keys.secretKey, { expiresIn: 5000 }, (err, token) => {
                           res.json({
                              success: true,
                              token: 'Bearer ' + token
                           });
                       });

                   } else {
                        errors.password = 'Password incorrect';
                        return res.status(404).json(errors);
                   }

                });
        });
});


// Protected route

/*  @route      GET api/users/current
    @desc       Return current user
    @access     Private
 */

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;

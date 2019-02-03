// Import modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');


// Route files
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { database, port } = require('./config/config');

// Connect to MongoDB
mongoose
    .connect(database, { useNewUrlParser: true })
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log("Mongodb error:", err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);


// Paths
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {

    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server running on ${port}`));

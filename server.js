const express = require('express');
const mongoose = require('mongoose');

// Route files
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//const db = require('./config/keys').mongoURI;


// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/devconnector', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// Paths

app.get('/', (req, res) => res.send("hello"));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

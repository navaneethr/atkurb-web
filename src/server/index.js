require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("MLAB Connected");
});

mongoose.connection.on('connected', () => { console.log(`Mongoose connected to ${process.env.DB_CONNECTION}`); });
mongoose.connection.on('error', (err) => { console.log(`Mongoose connection error: ${err}`); });
mongoose.connection.on('disconnected', () => { console.log('Mongoose disconnected')});

// Use Middleware
app.use(bodyParser.json());
app.use(express.static('build'));

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

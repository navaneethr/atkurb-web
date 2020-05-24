require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sslRedirect = require('heroku-ssl-redirect');

const userRoute = require('./routes/user');
const cartRoute = require('./routes/cart');
const authRoute = require('./routes/auth');
const authStore = require('./routes/store');
const authInventory = require('./routes/inventory');

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("MLAB Connected");
});

mongoose.connection.on('connected', () => { console.log(`Mongoose connected to ${process.env.DB_CONNECTION}`); });
mongoose.connection.on('error', (err) => { console.log(`Mongoose connection error: ${err}`); });
mongoose.connection.on('disconnected', () => { console.log('Mongoose disconnected')});

// Use Middleware

// enable ssl redirect
app.use(sslRedirect());

app.use(bodyParser.json());
app.use(express.static('dist'));

app.use('/api/user', userRoute);
app.use('/api/cart', cartRoute);
app.use('/api/auth', authRoute);
app.use('/api/store', authStore);
app.use('/api/inventory', authInventory);


// Make sure to always have this at the end - Do not Move
if(process.env.PROD == "true") {
    app.get('*', function (req, res) {
        res.sendFile('./dist/index.html', { root: '.' });
    })
}

app.listen(process.env.PORT || 5000, () => console.log(`Listening on port ${process.env.PORT || 5000}!`));

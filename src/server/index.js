require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sslRedirect = require('heroku-ssl-redirect');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

const userRoute = require('./routes/user');
const cartRoute = require('./routes/cart');
const authRoute = require('./routes/auth');
const storeRoute = require('./routes/store');
const inventoryRoute = require('./routes/inventory');
const productsRoute = require('./routes/products');
const orderRoute = require('./routes/order');

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
app.use('/api/store', storeRoute);
app.use('/api/inventory', inventoryRoute);
app.use('/api/products', productsRoute);
app.use('/api/order', orderRoute);

// Make sure to always have this at the end - Do not Move
if(process.env.PROD == "true") {
    app.get('*', function (req, res) {
        res.sendFile('./dist/index.html', { root: '.' });
    })
}

io.on('connection', (socket) => {
    console.log("New Socket Connection");
    socket.on('hello', ({message}) => {
        console.log("Hello There");
        io.emit('hello', {message: "Hello World"})
    })
});

server.listen(process.env.PORT || 5000, () => console.log(`Listening on port ${process.env.PORT || 5000}!`));

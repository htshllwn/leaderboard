// Import Express
const express = require('express');

// Import Body parser
const bodyParser = require('body-parser');

// Import Mongoose
const mongoose = require('mongoose');

// Import cors
const cors = require('cors');

const app = express();

// Port.
const port = process.env.PORT || 3000;

// Enable cors
app.use(cors());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Mongoose Connection
const mongoDB = require('./helpers/mongoose/mongoose-connection');
mongoose.connect(mongoDB.connectionURI, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB");
});

// Mongoose Models
require('./models/index');

// API Routes.
const apiRoutes = require('./api-routes');
app.use('/api', apiRoutes);

// Send message for default URL.
app.get('/', (req, res) => res.send('Hello World with Express'));

// Launch app to listen to specified port.
app.listen(port, function () {
    console.log("Running on port " + port);
});

const express = require('express');

const app = express();

// Port.
const port = process.env.PORT || 3000;

// API Routes.
const apiRoutes = require('./api-routes');
app.use('/api', apiRoutes)

// Send message for default URL.
app.get('/', (req, res) => res.send('Hello World with Express'));

// Launch app to listen to specified port.
app.listen(port, function () {
    console.log("Running on port " + port);
});

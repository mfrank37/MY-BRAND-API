const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const badRequest = require('./controllers/badRequest');
require('dotenv').config();
require('./DB/connection');

let PORT = process.env.PORT || 3000;

// Handle req.body formats and api routes
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes);
app.use('/', badRequest);

app.listen(PORT);

module.exports = app;
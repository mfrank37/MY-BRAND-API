const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const badRequest = require('./controllers/badRequest');
require('dotenv').config();
require('./DB/connection');

const PORT = Number(process.env.PORT);

// Handle req.body formats and api routes
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes);
app.use('/', badRequest);

// start listening
app.listen(PORT || 80, () => {
  console.log("Server listening on port ", PORT);
});

module.exports = app;
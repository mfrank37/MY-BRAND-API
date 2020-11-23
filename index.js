const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
require('dotenv').config();
require('./DB/connection');
const PORT = Number(process.env.PORT);

// Handle req.body formats and api routes
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes);

// DEFAULT FOR ROOT. i.e: hostname/
app.use('/', (req, res) => {
  res.status(400).send({message: "Please use a valid request . . ."});
});

// start listening
app.listen(PORT || 80, () => {
  console.log("Server listening on port ", PORT);
});
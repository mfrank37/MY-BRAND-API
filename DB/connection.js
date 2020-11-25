require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.connector, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("\n\x1b[36m Database CONNECTED!\x1b[0m\n");
}).catch(err => {
  console.log("Error occured while connecting to database...\n", err);
});

mongoose.Promise = global.Promise;
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://dbUser:dbUserPassword@cluster0.jhisq.mongodb.net/main?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("\n\1b[35m Database connected!\n");
}).catch(err => {
  console.log("Error occured while connecting to database...\n", err);
});

mongoose.Promise = global.Promise;
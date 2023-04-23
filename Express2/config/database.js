const mongoose = require("mongoose");
//env se aa raha hai e code se
require("dotenv").config();
//function to establish the connection
const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      //tow flags promise
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("working on port");
    })
    .catch((error) => {
      console.log("Issue solved");
      console.error(error.message);
      process.exit(1);
    });
};
module.exports = dbConnect;
// testting again

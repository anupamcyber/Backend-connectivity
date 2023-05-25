const mongoose = require("mongoose");
require("dotenv").config();
exports.Connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("db connection is successful");
    })
    .catch((error) => {
      console.log("error in dbconnection");
      console.error(error.message);
      process.exit(1);
    });
};

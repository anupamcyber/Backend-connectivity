const mongoose = require("mongoose");
require("dotenv").config();
exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected succesfully"))
    .catch((err) => {
      console.log("database connected");
      console.error(err.message);
      process.exit(1);
    });
};

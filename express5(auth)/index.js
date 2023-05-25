const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
//middleware
app.use(express.json());
//dattabase connectoivty
console.log("connecting to db");
// require("./config/database").Connect();
require("./config/database").Connect();
//routers
app.use(cookieParser());
const user = require("./router/user");
// //mount
app.use("/api/v1", user);
app.listen(PORT, () => {
  console.log("app is running");
});

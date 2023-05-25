const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const blog = require("./route/blog");
app.use("/api/v1", blog);

app.listen(PORT, () => {
  console.log("app is runnning");
});
const connectWithDb = require("./config/database");
connectWithDb();
//or
// require("./config/database");//
app.get("/", (req, res) => {
  res.send(`<h1>HEllo this first page to dis</h1>`);
});

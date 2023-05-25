const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
//app.use
app.listen(3000, () => {
  console.log("server is listening");
});
app.get("/", (req, res) => {
  res.send("Ghow we are doing");
});
app.post("/api/user", (req, res) => {
  const { name, brand } = req.body;
  console.log(name);
  console.log(brand);
  //console.log(express.response);
  res.send("DOne is send succesfully");
});
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/anupamtestwork", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("succesfull pushed");
  })
  .catch((error) => {
    console.log("Received On");
  });

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("server is listening");
});
app.get("/", (req, res) => {
  res.send("Kaise ho");
});
app.post("/api/user", (req, res) => {
  const { name, brand } = req.body;
  console.log(name);
  console.log(brand);
  console.log(express.response);
  res.send("cr is send succesfully");
});
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/myDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("succesfull runn");
  })
  .catch((error) => {
    console.log("Received On");
  });

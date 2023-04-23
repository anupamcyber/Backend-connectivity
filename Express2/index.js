const express = require("express");
const app = express();
//load confog from env
require("dotenv").config();
const PORT = process.env.PORT || 4000;
//middleware
app.use(express.json());
//i,port todo list
const todoRoutes = require("./routes/todo");
//mount the todo api routes
app.use("/api/v1", todoRoutes);

app.listen(PORT, () => {
  console.log("server runnning");
});
//connect with database
const dbConnect = require("./config/database");
dbConnect();
app.get("/", (req, res) => {
  res.send(`<h1>HEllo sare</h1>`);
});

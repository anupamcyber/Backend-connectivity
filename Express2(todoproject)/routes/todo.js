const express = require("express");
const router = express.Router();

//import conntroller
const { createTodo } = require("../controllers/createTodo");
const { getTodo, getTodoById } = require("../controllers/getTodo");
const { updateTodo } = require("../controllers/updateTodo");
const deleteTod = require("../controllers/deleteTodo");
// define api router mapp with controller
router.post("/createTodo", createTodo);
router.get("/getTodo", getTodo);
router.get("/getTodo/:id", getTodoById);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTod);
module.exports = router;
  
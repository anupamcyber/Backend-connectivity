const Todo = require("../models/Todo");
//define route handler
exports.getTodo = async (req, res) => {
  try {
    //fetch all todo items form postman
    //ek just predefined function hai TODO.find
    const todos = await Todo.find({});
    //abhi response check kro
    res.status(200).json({
      success: true,
      data: todos,
      message: "All data are",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
      data: "internal server error",
      message: err.message,
    });
  }
};
//id wala
exports.getTodoById = async (req, res) => {
  try {
    //extarct kro or fetch id
    const id = req.params.id;
    const todo = await Todo.findById({ _id: id });
    //data forgiven id not found
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "NO Data found",
      });
    }
    //data found
    res.status(200).json({
      success: true,
      data: todo,
      message: `Todo ${id} data successfully fetched`,
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
      data: "internal server error",
      message: err.message,
    });
  }
};

const Todo = require("../models/Todo");
const deleteTod = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: todo,
      message: "deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: "cannot deleted ",
      message: err.message,
    });
  }
};
module.exports = deleteTod;

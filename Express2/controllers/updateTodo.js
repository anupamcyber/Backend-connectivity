const Todo = require("../models/Todo");

exports.updateTodo = async (req, res) => {
  try {
    //extarct kro or fetch id
    //   const id = req.params.id;
    //second way to do the same
    const { id } = req.params;
    const { title, description } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      { _id: id },
      { title, description, updateAt: Date.now() }
    );
    //e postman ma aaega
    res.status(200).json({
      success: true,
      data: todo,
      message: "updated succesfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,

      data: "internal server error",
      message: err.message,
    });
  }
};

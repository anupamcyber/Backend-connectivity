//require to import kro
//e ek kam krta hai for example carete krna
const Todo = require("../models/Todo");
//agal type ka export try kiya hai sirf
exports.createTodo = async (req, res) => {
  try {
    //extract the data coming from post man api adn store it in this operator
    const { title, description } = req.body;
    //crtae a new todo object and insert in into new todo object create command se insert karnege
    const response = await Todo.create({ title, description });
    //sucess wala
    res.status(200).json({
      success: true,
      data: response,
      message: "entry is done",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      data: "error occured",
      message: err.message,
    });
  }
};
// module.exports = { this.createTodo };

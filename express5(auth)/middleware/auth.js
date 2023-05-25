//auth
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    //const token = req.body.token;
    //more ways to retrive token are \
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token MIssing",
      });
    }
    //verify the token
    //used to decryt the payload part
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "error something went wrong",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "this did a protected rote for student",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "eror while loading",
    });
  }
};
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "this is restricted to admin page",
      });
    }
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "thi is erorr ",
    });
  }
};

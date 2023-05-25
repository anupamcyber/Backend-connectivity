const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const currentDate = new Date();
const moment = require("moment");

//signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    //checking
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User alredy exit",
      });
    }
    //add user

    //secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "error hashing password",
      });
    }
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "not found ",
    });
  }
};
//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please all the details ",
      });
    }
    //user available or nit
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        messaege: "user is not registered",
      });
    }
    //comapre
    //payload used for tokeun gemerate
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    //passwor dmatcg kr gaya
    if (await bcrypt.compare(password, user.password)) {
      let token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user = user.toObject();
      user.token = token;
      user.password = undefined;

      //cookies
      const options = {
        expires: new Date(Date.now() + 5000),
        httpOnly: true,
      };
      res.cookie("tokenanupam", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "user logged in successfully",
      });
      // res.status(200).json({
      //   success: true,
      //   token,
      //   user,
      //   message: "user logged in successfully",
      // });
    } else {
      return res.status(403).json({
        success: false,
        messaege: "password changed",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "not found",
    });
  }
};

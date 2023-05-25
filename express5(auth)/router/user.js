const express = require("express");
const router = express.Router();

const { login, signup } = require("../controller/Auth");
const { auth, isStudent, isAdmin } = require("../middleware/auth");
router.post("/login", login);
router.post("/signup", signup);

//protected router
router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected routes TEST ",
  });
});
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected routes STudent",
  });
});
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected routes admin",
  });
});
router.get("/email", auth, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await user.findOne({ id });
    res.status(200).json({
      success: true,
      message: "welocme to email route",
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "weror handled ",
    });
  }
  //const id = req.user.id;
  // res.json({
  //     success: true,
  //     id: id,
  //     message:"welcome to email part"
  // })
});
module.exports = router;

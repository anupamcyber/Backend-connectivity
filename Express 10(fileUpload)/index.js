const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
const db = require("./config/database");
db.connect();
const cloudinary = require("./config/cloudinery");
cloudinary.cloudinaryConnect();
const Upload = require("./router/fileupload");
app.use("/api/v1/upload", Upload);
app.listen(PORT, () => {
  console.log("app is running");
});

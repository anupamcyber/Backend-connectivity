const File = require("../models/file");
const cloudinary = require("cloudinary").v2;
const nodemailer = require("nodemailer");
//local file upload
exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("FILE is ", file);
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    file.mv(path, (err) => {
      console.log(err);
    });
    res.json({
      success: true,
      message: "local file uploaded",
    });
  } catch (err) {
    console.log("error");
  }
};

//function to upload in cludinary
function isFileSupported(filetype, supportedtype) {
  return supportedtype.includes(filetype);
}
async function uploadfileserver(file, folder, quality) {
  const option = { folder };
  if (quality) {
    option.quality = quality;
  }
  option.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, option);
}
//image upload ka hnadler
exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    //console.log(name, tags, email);
    const file = req.files.imageFile;
    //console.log(file);
    //file type validation
    const supportedtype = ["jpg", "png", "jpeg"];
    const filetype = file.name.split(".")[1].toLowerCase();
    console.log(filetype);
    if (!isFileSupported(filetype, supportedtype)) {
      return res.status(400).json({
        success: false,
        message: "file not suported",
      });
    }
    //suppotred so upload
    const response = await uploadfileserver(file, "codehelp");
    //console.log(response);
    const fileData = await File.create({
      name,
      tags,
      email,
      image: response.secure_url,
    });
    console.log("testing");
    res.json({
      success: true,
      image: response.secure_url,
      message: "image uploaded succesfully",
    });
  } catch (error) {
    // const filedata = await File.create({
    //   name, tag, email, imageUrl: response.secure_url;
    // })
    console.log(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};
// video uplaod
exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.videoFile;

    //pasted
    const supportedtype = ["mp4", "mov"];
    const filetype = file.name.split(".")[1].toLowerCase();
    console.log(filetype);
    if (!isFileSupported(filetype, supportedtype)) {
      return res.status(400).json({
        success: false,
        message: "file not suported",
      });
    }
    //suppotred so upload
    const response = await uploadfileserver(file, "codehelp");
    //console.log(response);
    const fileData = await File.create({
      name,
      tags,
      email,
      image: response.secure_url,
    });
    console.log("testing");
    res.json({
      success: true,
      image: response.secure_url,
      message: "video uploaded succesfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

//node mailer
// // email wala
exports.mailsender = async (doc) => {
  try {
    console.log("doc", doc);
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let info = await transporter.sendMail({
      from: `anupamshaw`,
      to: doc.email,
      subject: "hello",
      html: "test",
    });
    console.log("testting in ");
    console.log("info", info);
  } catch (err) {
    // console.log()
    console.error(err);
  }
};
//image upliader
exports.imageUploadRed = async (req, res) => {
  try {
    //destruction
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    //extract file
    const file = req.files.imageUrl;
    //variable for checking
    const supportedtype = ["png", "jpg"];
    const filetype = file.name.split(".")[1].toLowerCase();
    console.log(filetype);
    //
    if (!isFileSupported(filetype, supportedtype)) {
      return res.status(400).json({
        success: false,
        message: "file not suported",
      });
    }
    //compress and uplaod
    const response = await uploadfileserver(file, "codehelp", 30);
    //console.log(response);
    const fileData = await File.create({
      name,
      tags,
      email,
      image: response.secure_url,
    });
    console.log("testing");
    res.json({
      success: true,
      image: response.secure_url,
      message: "zip image uploaded succesfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

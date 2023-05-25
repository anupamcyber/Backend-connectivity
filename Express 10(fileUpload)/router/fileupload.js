const express = require("express");
const router = express.Router();
const { localFileUpload } = require("../controllers/fileuploadcontroller");
const { imageUpload } = require("../controllers/fileuploadcontroller");
const { videoUpload } = require("../controllers/fileuploadcontroller");
const { imageUploadRed } = require("../controllers/fileuploadcontroller");
const { mailsender } = require("../controllers/fileuploadcontroller");
//const { emailFunc } = require("../controllers/fileuploadcontroller");

//router.post("/email", emailFunc);
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageUploadRed", imageUploadRed);
router.post("/mailsender", mailsender);
module.exports = router;

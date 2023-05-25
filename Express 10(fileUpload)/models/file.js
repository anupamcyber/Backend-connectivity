const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
});

//post midlle ware
// fileSchema.post("save", async function (doc) {
//   try {
//     console.log("doc", doc);
//     let transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });
//     let info = await transporter.sendMail({
//       from: `anupamshaw`,
//       to: doc.email,
//       subject: "image upladoed",
//       html: "test on image upload",
//     });
//     console.log("testting in ");
//     console.log("info", info);
//   } catch (err) {
//     // console.log()
//     console.error(err);
//   }
// });
const file = mongoose.model("file", fileSchema);
module.exports = file;

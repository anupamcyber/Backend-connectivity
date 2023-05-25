const express = require("express");
const router = express.Router();
//import controller

const { likePost, unlikePost } = require("../controller/LikeController");
const { createComments } = require("../controller/CommentController");
const { createPost, getAllPosts } = require("../controller/PostController");
// const { createPost, getAllPosts } = require("../controller/PostController");
//const { getAllPosts } = require("../controller/PostController");
//mapping with request

router.post("/comments/create", createComments);
router.post("/posts/create", createPost);
router.get("/posts/get", getAllPosts);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);
//
module.exports = router;

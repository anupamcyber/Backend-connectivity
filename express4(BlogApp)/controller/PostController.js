const Post = require("../model/post");
exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post({
      title,
      body,
    });
    const savedPost = await post.save();

    res.json({
      post: savedPost,
    });
  } catch (err) {
    return res.status(400).json({
      error: "error while creating post",
    });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("likes")
      .populate("comments")
      .exec();
    res.json({
      post: posts,
    });
  } catch (err) {
    return res.status(400).json({
      error: "error while fetching data",
    });
  }
};

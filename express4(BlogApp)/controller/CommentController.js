const Post = require("../model/post");
const Comment = require("../model/comment");

//logic
exports.createComments = async (req, res) => {
  try {
    const { post, user, body } = req.body;
    const comment = new Comment({
      post,
      user,
      body,
    });
    const savedComment = await comment.save();
    //find
    const updatePost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    )

      .populate("comments")
      .exec();
    res.json({
      post: updatePost,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error is found",
      message: error,
    });
  }
};

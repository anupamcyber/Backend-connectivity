const Post = require("../model/post");
const Like = require("../model/like");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });
    const savedLike = await like.save();

    //upadte
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    )
      .populate("likes")
      .exec();
    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(400).json({
      error: "error while liking data",
    });
  }
};
exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;
    //find and delete
    const deleteLike = await Like.findOneAndDelete({ post: post, _id: like });
    //upadte the post collecxtion
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deleteLike._id } },
      { new: true }
    );
    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(400).json({
      error: "error while unliking post",
    });
  }
};

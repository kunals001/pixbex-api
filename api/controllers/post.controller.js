import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    const { title, desc, cate, video, tech } = req.body;

    if (!title || !desc || !cate || !video || !tech) {
      console.log("Missing Fields");
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const post = await Post.create({ title, desc, cate, video, tech });
    console.log("Post Created:", post);
    return res.status(201).json({ success: true, post });
  } catch (error) {
    console.error("Create Post Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const updatePost = async(req,res) =>{
    try {

        const user = await User.findById(req.user.id).select("-password");

        if(!user.isAdmin){
            return res.status(400).json({success: false, message: "User not found" });
        }

        const postId = req.params.postId;
        const updateData = req.body;

        const updatedPost = await Post.findByIdAndUpdate(postId,updateData,{new:true});
        res.status(200).json({success: true, message: "Post updated successfully",updatedPost });

    } catch (error) {
        console.log("Error in updatePost ", error);
        return res.status(500).json({ success: false, message: "Server error in updatePost" });
    }
}
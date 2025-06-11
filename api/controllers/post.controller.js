import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const createPost = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if(!user.isAdmin){
            return res.status(400).json({success: false, message: "User not found" });
        }

        const {title,desc,image,video,tech} = req.body;

        if(!title || !desc || !image || !video || !tech){
            return res.status(400).json({success: false, message: "Please enter all fields" });
        }

        const post = await Post.create({title,desc,image,video,tech});
        res.status(200).json({success: true, message: "Post created successfully",post });

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message });
    }
}
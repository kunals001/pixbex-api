import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        cate: {
            type: String,
            required: true,
        },
        video:{
            type: String,
            required: true
        },
        tech:{
            type: String,
            required: true
        },
        skills: [{
            type:String,
            required: true
        }]
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
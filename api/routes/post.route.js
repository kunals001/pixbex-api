import express from "express";
const router = express.Router();

import {protectRoute} from "../utils/protectRoute.js"
import {createPost,updatePost,getAllPosts,getPosts} from "../controllers/post.controller.js"

router.post("/create-post",protectRoute,createPost)
router.put("/update-post/:postId",protectRoute,updatePost)
router.get("/get-all-post",protectRoute,getAllPosts)
router.get("/get-post/:postId",protectRoute,getPosts)

export default router
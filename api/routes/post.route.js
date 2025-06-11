import express from "express";
const router = express.Router();

import {protectRoute} from "../utils/protectRoute.js"
import {createPost,updatePost} from "../controllers/post.controller.js"

router.post("/create-post",protectRoute,createPost)
router.put("/update-post/:postId",protectRoute,updatePost)

export default router
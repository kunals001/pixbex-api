import express from "express";
const router = express.Router();

import {protectRoute} from "../utils/protectRoute.js"
import {createPost} from "../controllers/post.controller.js"

router.post("/create-post",protectRoute,createPost)

export default router
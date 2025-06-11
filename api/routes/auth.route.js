import express from "express";
const router = express.Router();

import {protectRoute} from "../utils/protectRoute.js"
import {Login,CheckAuth,Upload} from "../controllers/auth.controller.js"

router.get("/upload",protectRoute,Upload);
router.get("/check-auth",protectRoute,CheckAuth)
router.post("/login",Login)


export default router
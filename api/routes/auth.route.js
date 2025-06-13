import express from "express";
const router = express.Router();

import {protectRoute} from "../utils/protectRoute.js"
import {Login,CheckAuth,Upload,Contact,GetContact,DeleteContact} from "../controllers/auth.controller.js"

router.get("/upload",protectRoute,Upload);
router.get("/check-auth",protectRoute,CheckAuth)
router.post("/login",Login)
router.post("/contact",Contact)
router.get("/get-all-contact",protectRoute,GetContact)
router.delete("/delete-contact/:id",protectRoute,DeleteContact)


export default router
import express from "express";
const router = express.Router();

import {protectRoute} from "../utils/protectRoute.js"
import {Login,Upload,Contact,GetContact,DeleteContact,Logout} from "../controllers/auth.controller.js"

router.get("/upload",protectRoute,Upload);
router.post("/login",Login)
router.post("/logout",Logout)
router.post("/contact",Contact)
router.get("/get-all-contact",protectRoute,GetContact)
router.delete("/delete-contact/:id",protectRoute,DeleteContact)


export default router
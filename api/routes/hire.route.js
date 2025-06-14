import express from "express";
const router = express.Router();

import {SendHire,GetHire,DeleteHire} from "../controllers/hire.controller.js"
import {protectRoute} from "../utils/protectRoute.js"

router.post("/send-hire",SendHire);
router.get("/get-all-hire",protectRoute,GetHire)
router.delete("/delete-hire/:id",protectRoute,DeleteHire)

export default router
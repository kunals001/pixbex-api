import express from "express";
const router = express.Router();

import {Login} from "../controllers/auth.controller.js"


router.post("/login",Login)


export default router
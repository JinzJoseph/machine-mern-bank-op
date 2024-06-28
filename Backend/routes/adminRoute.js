import express from "express";
import {verifyToken} from "../middleware/verifyUser.js"
import { getAllusers,blockUser,adminTrans } from "../controller/AdminController.js";
const router = express.Router();

router.get("/getuser",verifyToken,getAllusers);
router.post("/block/:id",verifyToken,blockUser);
router.get("/admintranshistroy",verifyToken,adminTrans)

export default router;

import express from "express";
import { checkBalance ,depositAmount,withDrawFund,transactionHistroy} from "../controller/userController.js";
import {verifyToken} from "../middleware/verifyUser.js"
const router = express.Router();
router.get("/balance",verifyToken,checkBalance);
router.post("/deposit",verifyToken,depositAmount)
router.put("/withdraw",verifyToken,withDrawFund)
router.get("/transaction-history",verifyToken,transactionHistroy)
export default router;
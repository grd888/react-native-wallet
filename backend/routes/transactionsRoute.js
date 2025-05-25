import express from "express";
const router = express.Router();
import { sql } from "../config/db.js";
import {
  getTransactionsByUserId,
  createTransaction,
  deleteTransaction,
  getTransactionSummary,
} from "../controllers/transactionsController.js";

router.get("/:userId", getTransactionsByUserId);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

router.get("/summary/:userId", getTransactionSummary);

export default router;

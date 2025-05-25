import express from "express";
const router = express.Router();
import { sql } from "../config/db.js";

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
    console.log("Transactions retrieved:", transactions);
    return res.status(200).json(transactions);
  } catch (error) {
    console.log("Error retrieving transactions:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user_id, title, amount, category } = req.body;
    if (!user_id || !title || amount == undefined || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const transaction = await sql`INSERT INTO transactions (user_id, title, amount, category) VALUES (${user_id}, ${title}, ${amount}, ${category}) RETURNING *`;
    console.log("Transaction created:", transaction);
    return res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error creating transaction:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }
    const transaction = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;
    if (transaction.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    console.log("Transaction deleted:", transaction);
    return res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log("Error deleting transaction:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/summary/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const balanceResult = await sql`SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}`;
    const incomeResult = await sql`SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0`;
    const expenseResult = await sql`SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions WHERE user_id = ${userId} AND amount < 0`;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expenseResult[0].expenses,
    });
  } catch (error) {
    console.log("Error retrieving transaction summary:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
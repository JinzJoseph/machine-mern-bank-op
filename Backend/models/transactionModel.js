import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["deposit", "withdrawal"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction
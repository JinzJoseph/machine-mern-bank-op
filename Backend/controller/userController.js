import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";
export const checkBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ balance: user.accountBalance });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch balance", error });
  }
};
export const depositAmount = async (req, res) => {
  const { amount } = req.body;

 

  try {
    
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.accountBalance += amount;

  
    const transaction = new Transaction({
      type: "deposit",
      amount,
      userId: user._id,
    });

   
    user.transactions.push(transaction._id);

   
    await user.save();
    await transaction.save();

    res
      .status(200)
      .json({ message: "Deposit successful", balance: user.accountBalance });
  } catch (error) {
    console.error("Error occurred while depositing amount:", error);
    res
      .status(500)
      .json({ message: "Failed to deposit", error: error.message });
  }
};

export const withDrawFund = async (req, res) => {
  const { amount } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user.accountBalance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }
    user.accountBalance -= amount;

    const transaction = new Transaction({
      type: "withdrawal",
      amount,
      userId: user._id,
    });

    user.transactions.push(transaction._id);

    await user.save();
    await transaction.save();

    res
      .status(200)
      .json({ message: "Withdrawal successful", balance: user.accountBalance });
  } catch (error) {
    res.status(500).json({ message: "Failed to withdraw", error });
  }
};
export const transactionHistroy = async (req, res) => {

  const userId = req.user.id;
  console.log(userId);
  try {
    const transactions = await Transaction.find({ userId }).sort({
      createdAt: -1,
    });
   
    res.status(200).json({
      success:true,
      message:"succesfull fetched",
      data:transactions
    });
  } catch (error) {
    console.log();
  }
};

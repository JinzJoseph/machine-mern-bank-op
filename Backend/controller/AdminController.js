import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";

export const getAllusers = async (req, res) => {
  try {
    if (req.user.role === "user") {
      return res.status(403).json({
        message: "You are not allowed to do thse process",
        success: false,
      });
    }
    const users = await User.find({ role: "user" });
    res.status(200).json({
      message: "successfully fetched data",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

export const blockUser = async (req, res) => {
  const id = req.params.id;
  const { isDisabled } = req.body;
  console.log(isDisabled);

  try {
    if (req.user.role === "user") {
      return res.status(403).json({
        message: "your are not allowed to do these process",
        success: false,
      });
    }
    const blockeduser = await User.findByIdAndUpdate(
      { _id: id },
      {
        isDisabled: isDisabled,
      }
    );
    res.status(200).json({
      message: "successfully blocked user",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const adminTrans = async (req, res) => {
  try {
    if (req.user.role === "user") {
        return res.status(403).json({
          message: "your are not allowed to do these process",
          success: false,
        });
      }
    const users = await User.find();

    let allTransactions = [];

    for (let user of users) {
      const transactions = await Transaction.find({ userId: user._id }).sort({
        date: -1,
      });
      allTransactions.push({ user: user.username, transactions });
    }

    res.status(200).json({ data: allTransactions });
  } catch (error) {
    console.error("Error fetching all user transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

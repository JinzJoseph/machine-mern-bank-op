import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AccountBalance = () => {
  const [balance, setBalance] = useState(0); // State to store balance
  const { currentUser } = useSelector((state) => state.user);

  // Function to fetch account balance from API
  const fetchAccountBalance = async () => {
    try {
      const res = await axios.get("/api/user/balance");
      setBalance(res.data.balance); // Update balance state with fetched data
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // Fetch balance on component mount or when currentUser changes
  useEffect(() => {
    fetchAccountBalance();
  }, [currentUser]);

  return (
    <div className="text-center mx-auto mt-8">
      <h3 className="text-2xl font-bold mb-4">Account Balance:</h3>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <p className="text-3xl font-semibold text-primary">{balance} </p>
      </div>
    </div>
  );
};

export default AccountBalance;

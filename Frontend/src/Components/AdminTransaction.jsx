import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

const AdminTransaction = () => {
  const [data, setdate] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/admin/admintranshistroy");
      console.log(res);
      if (res.status == 200) {
        setdate(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData()
  }, []);
  return (
    <div className="w-full">
     
      <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-8">All Users' Transaction History</h1>
      <div className=" shadow-md sm:rounded-lg">
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full">
            <tr>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Type</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((user, userIndex) => (
                user.transactions.map((transaction, txnIndex) => (
                  <tr key={`${userIndex}-${txnIndex}`} className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.user}</td>
                    <td className="px-6 py-4">{transaction.type}</td>
                    <td className="px-6 py-4">{transaction.amount}</td>
                    <td className="px-6 py-4">{moment(transaction.date).format('L')}</td>
                  </tr>
                ))
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">No Transactions Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AdminTransaction;

import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Transaction = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/user/transaction-history");
      console.log(res);
      if (res.status === 200) {
        setData(res.data.data);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-4">Transaction Details</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse border border-gray-200">
          <thead className="text-xs bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 font-bold border border-gray-200">Type</th>
              <th className="px-6 py-3 font-bold border border-gray-200">Amount</th>
              <th className="px-6 py-3 font-bold border border-gray-200">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 border border-gray-200">{item.type}</td>
                  <td className="px-6 py-4 border border-gray-200">{item.amount}</td>
                  <td className="px-6 py-4 border border-gray-200">{moment(item.date).format('L')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center" colSpan="3">
                  No Transactions available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';

const WithDraw = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const res = await axios.put('/api/user/withdraw', {
        amount
      });
      console.log(res);
  
      if (res.status === 200) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Successfully Withdrew Amount',
          showConfirmButton: false,
          timer: 1500,
        });
  
        fetchAccountBalance(); // Refresh balance after successful withdrawal
        setAmount('');
      } else
       {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrongqqq!',
        });
      }
    } catch (error) {
      console.error('Error occurred:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };
  

  const fetchAccountBalance = async () => {
    try {
      const res = await axios.get('/api/user/balance');
      setBalance(res.data.balance); // Update balance state with fetched data
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    fetchAccountBalance();
  }, [currentUser]); // Refetch balance when currentUser changes

  return (
    <div className="container mx-auto pt-5">
      <div className="">
        <h2 className="text-3xl font-bold">Enter the Amount To be Withdrawn</h2>
        <p>Total Amount: {balance}</p>
        <form onSubmit={handleSubmit}>
          <input
            className="mt-4 px-6 py-3"
            placeholder="Enter Amount..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-700 text-white ml-3 rounded" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default WithDraw;

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Addfund = () => {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/user/deposit", {
        amount,
      });

      console.log(res);

      if (res.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Credited Amount",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
       
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
      setAmount("")
    } catch (error) {
      console.error("Error occurred:", error);
    
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="container mx-auto pt-5">
      <div className="">
        <h2 className="text-3xl font-bold">Add Fund To Your Account</h2>
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

export default Addfund;

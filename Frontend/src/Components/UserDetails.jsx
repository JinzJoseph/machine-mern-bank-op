import axios from "axios";
import moment from "moment";
import React from "react";
import { useState, useEffect } from "react";
import { MdBlock } from "react-icons/md";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
const UserDetails = () => {
  // const [block,setblock]=useState(flas)
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    const res = await axios.get("/api/admin/getuser");
    console.log(res);
    if (res.status == 200) {
      setUsers(res.data.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const handleBlock = async (id) => {
    try {
      const res = await axios.post(`/api/admin/block/${id}`, {
        isDisabled: true,
      });
console.log(res);
      if (res.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Blocked User",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // Handle other status codes if needed
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.log();
    }
  };
  return (
    <div className="w-full container mx-auto">
      <div className=" ">
        <h2 className="text-center text-4xl font-bold justify-center m-6"> User Details </h2>

        <table className="w-full text-sm text-left border-collapse border border-gray-200">
          <thead className="text-xs bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 font-bold border border-gray-200">
                user Name
              </th>
              <th className="px-6 py-3 font-bold border border-gray-200">
                Email
              </th>
              <th className="px-6 py-3 font-bold border border-gray-200">
                {" "}
                Account Balance
              </th>
              <th className="px-6 py-3 font-bold border border-gray-200">
                {" "}
                Created At
              </th>
              <th className="px-6 py-3 font-bold border border-gray-200">
                {" "}
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((item, index) => (
                <tr key={index} className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 border border-gray-200">
                    {item.username}
                  </td>
                  <td className="px-6 py-4 border border-gray-200">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 border border-gray-200">
                    {item.accountBalance}
                  </td>
                  <td className="px-6 py-4 border border-gray-200">
                    {moment(item.date).format("L")}
                  </td>
                  <td className="px-6 py-4 border border-gray-200">
                    <button
                      type="submit"
                      onClick={() => handleBlock(item._id)}
                      className="py-2  bg-red-600 rounded px-2 cursor-pointer"
                    >
                      <MdBlock />
                    </button>
                  </td>
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

export default UserDetails;

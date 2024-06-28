import React, { useEffect, useState } from "react";
import { FaBalanceScale } from "react-icons/fa";
import { Link, NavLink, useNavigate, Outlet } from "react-router-dom";
import { TbReportMoney } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";
import Swal from "sweetalert2";
import { PiHandWithdraw } from "react-icons/pi";
import { FcViewDetails } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import AccountBalance from "../Components/AccountBalance";
import Addfund from "../Components/Addfund";
import DashWelcome from "../Components/DashWelcome";
import Transaction from "../Components/Transaction";
import WithDraw from "../Components/WithDraw";
import { signoutSuccess } from "../redux/user/UserSlice";
import axios from "axios";
import { FaUsers } from "react-icons/fa";
import UserDetails from "../Components/UserDetails";
import AdminTransaction from "../Components/AdminTransaction";
import { GrTransaction } from "react-icons/gr";
const Home = () => {
  const [tab, SetTab] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const role = currentUser.role;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const TabFromuRL = urlParams.get("tab");
    console.log(TabFromuRL);
    SetTab(TabFromuRL);
  }, [location.search]);

  const handleSignout = async () => {
    try {
      await axios.post(
        "/api/auth/signout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(signoutSuccess());
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!",
      }).then((result) => {
        if (result.isConfirmed) {
          logout()
            .then(() => {
              Swal.fire({
                title: "Logout!",
                text: "Logout Successful.",
                icon: "success",
              });
              navigate("/");
            })
            .catch((err) => console.log(err));
        }
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="bg-white h-full p-5 pt-8 relative shadow-lg w-72">
        <div className="flex justify-between items-center mb-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNheQ4hEAu3tjuOdx3uskOms09d9beFGrnGQ&s"
            alt="Logo"
            className="cursor-pointer h-10"
            onClick={() => SetTab("")}
          />
          <Link to="/home" className="text-dark-primary font-bold text-xl">
            My Bank
          </Link>
        </div>
        <ul className="pt-6">
          <p className="ml-3 text-gray-400 mb-3">Menu</p>
          {currentUser && currentUser.role === "user" && (
            <>
              <li>
                <NavLink
                  to="/home?tab=welcomepage"
                  className="flex items-center gap-x-2 p-2 mb-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm rounded-md"
                >
                  <FaBalanceScale className="text-2xl" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/home?tab=accountbalance"
                  className="flex items-center gap-x-2 p-2 mb-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm rounded-md"
                >
                  <FaBalanceScale className="text-2xl" />
                  <span>Check Account Balance</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/home?tab=addfund"
                  className="flex items-center gap-x-2 p-2 mb-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm rounded-md"
                >
                  <TbReportMoney className="text-2xl" />
                  <span>Add Fund</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/home?tab=withdraw"
                  className="flex items-center gap-x-2 p-2 mb-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm rounded-md"
                >
                  <PiHandWithdraw className="text-2xl" />
                  <span>Withdraw Fund</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/home?tab=transaction"
                  className="flex items-center gap-x-2 p-2 mb-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm rounded-md"
                >
                  <FcViewDetails className="text-2xl" />
                  <span>Transaction History</span>
                </NavLink>
              </li>
            </>
          )}
          {currentUser && currentUser.role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/home?tab=userList"
                  className="flex items-center gap-x-2 p-2 mb-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm rounded-md"
                >
                  <FaUsers className="text-2xl" />
                  <span>user List</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/home?tab=transactionHistroy"
                  className="flex items-center gap-x-2 p-2 mb-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm rounded-md"
                >
                  <GrTransaction className="text-2xl" />
                  <span>Transaction</span>
                </NavLink>
              </li>
            </>
          )}
          <li className="flex">
            <button
              onClick={handleSignout}
              className="flex items-center gap-x-2 p-2 mb-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm rounded-md w-full"
            >
              <BiLogOutCircle className="text-2xl" />
              <span>Sign out</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="flex-grow bg-gray-100 p-6">
        {/* Content based on the selected tab */}

        <div className="w-1/2">
          {tab === "welcomepage" && <DashWelcome />}

          {tab === "accountbalance" && <AccountBalance />}

          {tab === "addfund" && <Addfund />}

          {tab === "withdraw" && <WithDraw />}

          {tab === "transaction" && <Transaction />}
          {tab === "userList" && <UserDetails />}
          { tab==="transactionHistroy" && <AdminTransaction/>}
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { useSelector } from "react-redux";
const DashWelcome = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <h2 className="text-center text-3xl font-bold ">
        Welcome Again Mr:{" "}
        <span className="text-green">{currentUser.username}</span>
        <h3>My Profile</h3>
        <div className="shadow-lg rounded-lg p-3 flex flex-col justify-between border-1 border-secondary overflow-hidden m-4 ">
          <div className="w-full ml-12 items-center">
            {!currentUser.image && (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNSvcz8OHDlh3YOCYm58kJ5D3c_s6oWhQdGg&s"
                alt=""
              />
            )}
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              {currentUser.username}
            </h2>
            <p className="text-gray-600 mb-2">{currentUser.email}</p>
    

            {/*  */}
          </div>
        </div>
      </h2>
    </div>
  );
};

export default DashWelcome;

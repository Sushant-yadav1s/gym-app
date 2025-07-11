import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ErrorIcon from "@mui/icons-material/Error";
import ReportIcon from "@mui/icons-material/Report";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [showMessage, setShowMessage] = useState(false); // 👈 State for message
const handleOnClickMenu=(value)=>{
  sessionStorage.setItem('func',value);
}
  return (
    <div className="w-full min-h-screen text-black p-5 bg-gray-100 relative">
      {/* Top Bar */}
      <div className="w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between items-center">
        <MenuIcon
          className="cursor-pointer"
          onClick={() => setShowMessage(!showMessage)} // 👈 Toggle message
        />
        <img
          className="w-8 h-8 rounded-full border-2"
          src="https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg"
          alt="User"
        />
      </div>

      {/* Welcome Message */}
      {showMessage && (
        <div className="mt-3 p-4 bg-slate-900 text-white rounded-lg w-fit text-sm shadow-lg animate-fade-in">
          <p>
            <span className="text-blue-400 font-bold">Hi</span> Welcome to our
            Gym Management System.
          </p>
          <p className="mt-1">Feel free to ask any queries</p>
        </div>
      )}

      {/* Cards Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 pb-5">
        {/* 1. Joined Members */}
        <Link
          to="/member"
          className="w-full h-fit border-2 bg-white rounded-lg shadow cursor-pointer"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
          <div className="py-7 px-5 flex flex-col items-center text-center hover:bg-slate-900 hover:text-white">
            <PeopleAltIcon sx={{ color: "green", fontSize: "50px" }} />
            <p className="text-xl mt-3 font-semibold font-mono">
              Joined Members
            </p>
          </div>
        </Link>

        {/* 2. Monthly Joined */}
        <Link
          to={"/specific/monthly"} onClick={()=>handleOnClickMenu("monthlyJoined")}
          className="w-full h-fit border-2 bg-white rounded-lg shadow cursor-pointer"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex flex-col items-center text-center hover:bg-slate-900 hover:text-white">
            <SignalCellularAltIcon sx={{ color: "purple", fontSize: "50px" }} />
            <p className="text-xl mt-3 font-semibold font-mono">
              Monthly Joined
            </p>
          </div>
        </Link>

        {/* 3. Expiring Within 3 Days */}
        <Link
          to={"/specific/expire-with-in-3-days"}   onClick={()=>handleOnClickMenu("threeDayExpire")}
          className="w-full h-fit border-2 bg-white rounded-lg shadow cursor-pointer"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-400"></div>
          <div className="py-7 px-5 flex flex-col items-center text-center hover:bg-slate-900 hover:text-white">
            <AccessAlarmIcon sx={{ color: "red", fontSize: "50px" }} />
            <p className="text-xl mt-3 font-semibold font-mono">
              Expiring within 3 days
            </p>
          </div>
        </Link>

        {/* 4. Expiring Within 4-7 Days */}
        <Link
          to={"/specific/expire-with-in-4-7-days"}  onClick={()=>handleOnClickMenu("fourToSevenDaysExpire")}
          className="w-full h-fit border-2 bg-white rounded-lg shadow cursor-pointer"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex flex-col items-center text-center hover:bg-slate-900 hover:text-white">
            <AccessAlarmIcon sx={{ color: "red", fontSize: "50px" }} />
            <p className="text-xl mt-3 font-semibold font-mono">
              Expiring Within 4-7 Days
            </p>
          </div>
        </Link>

        {/* 5. Expired */}
        <Link
          to={"/specific/expired"}  onClick={()=>handleOnClickMenu("expired")}
          className="w-full h-fit border-2 bg-white rounded-lg shadow cursor-pointer"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex flex-col items-center text-center hover:bg-slate-900 hover:text-white">
            <ErrorIcon sx={{ color: "red", fontSize: "50px" }} />
            <p className="text-xl mt-3 font-semibold font-mono">Expired</p>
          </div>
        </Link>

        {/* 6. InActive Members */}
        <Link
          to={"/specific/inactive-members"}  onClick={()=>handleOnClickMenu("Inactive members")}
          className="w-full h-fit border-2 bg-white rounded-lg shadow cursor-pointer"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400"></div>
          <div className="py-7 px-5 flex flex-col items-center text-center hover:bg-slate-900 hover:text-white">
            <ReportIcon sx={{ color: "red", fontSize: "50px" }} />
            <p className="text-xl mt-3 font-semibold font-mono">
              Inactive Members
            </p>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <div className="text-center bg-black text-white py-3 rounded-xl text-sm mt-6">
        Contact Developer for any Technical Error at{" "}
        <span className="text-green-400 font-semibold">+917295086518</span>
      </div>
    </div>
  );
};

export default Dashboard;

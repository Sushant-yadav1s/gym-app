import React, { useState, useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [greeting, setGreeting] = useState("");
  const [adminInfo, setAdminInfo] = useState({ name: "", pic: "" });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Greeting based on time
    const currentHour = new Date().getHours();
    if (currentHour < 12) setGreeting("Good Morning 🌞");
    else if (currentHour < 18) setGreeting("Good Afternoon 🌤️");
    else if (currentHour < 21) setGreeting("Good Evening 🌇");
    else setGreeting("Good Night 🌙");

    // Get info from localStorage
    const gymName = localStorage.getItem("gymName");
    const gymPic = localStorage.getItem("gymPic");

    setAdminInfo({
      name: gymName || "Admin",
      pic: gymPic && gymPic !== "undefined" ? gymPic : "https://via.placeholder.com/100",
    });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-1/4 h-[100vh] border-2 bg-black text-white p-5 font-extralight">
      <div className="text-center font text-3xl">Power Zone</div>
      <div className="flex gap-5 my-5">
        <div className="w-[100px] h-[100px] rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover rounded-full"
            src={adminInfo.pic}
            alt="Admin"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/100";
            }}
          />
        </div>
        <div>
          <div className="text-2xl">{greeting}</div>
          <div className="text-xl mt-1 font-semibold">{adminInfo.name}</div>
        </div>
      </div>

      <div className="mt-10 py-10 border-t-2 border-gray-700">
        <Link
          to="/dashboard"
          className={`flex items-center gap-8 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black ${
            location.pathname === "/dashboard"
              ? "border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              : ""
          }`}
        >
          <HomeIcon />
          <div>Dashboard</div>
        </Link>

        <Link
          to="/member"
          className={`flex items-center mt-5 gap-8 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black ${
            location.pathname === "/member"
              ? "border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              : ""
          }`}
        >
          <GroupIcon />
          <div>Members</div>
        </Link>

        <div
          onClick={handleLogout}
          className="flex items-center mt-5 gap-8 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
        >
          <LogoutIcon />
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

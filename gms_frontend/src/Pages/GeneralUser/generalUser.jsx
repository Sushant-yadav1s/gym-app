import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import MemberCard from "../../Components/Membercard/membercard";
import axios from "axios";
import { toast } from "react-toastify";

const GeneralUser = () => {
  const [header, setHeader] = useState("");
  const [members, setMembers] = useState([]);
const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const func = sessionStorage.getItem("func");
    functionCall(func);
  }, []);

  const functionCall = async (func) => {
    try {
      let endpoint = "";
      let title = "";

      switch (func) {
        case "monthlyJoined":
          endpoint = "/members/monthly-member";
          title = "Monthly Joined Members";
          break;
        case "threeDayExpire":
          endpoint = "/members/within-3-days-expiring";
          title = "Expiring In 3 Days Members";
          break;
        case "fourToSevenDaysExpire":
          endpoint = "/members/within-4-7-expiring";
          title = "Expiring In 4-7 Days Members";
          break;
        case "expired":
          endpoint = "/members/expired-member";
          title = "Expired Members";
          break;
        case "Inactive members":
          endpoint = "/members/inactive-member";
          title = "Inactive Members";
          break;
        default:
          title = "Members";
          break;
      }

      setHeader(title);

      if (endpoint) {
        const res = await axios.get(`${API}${endpoint}`, {
          withCredentials: true,
        });
        setMembers(res.data.members || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data.");
    }
  };

  return (
    <div className="text-black p-5 w-full min-h-screen">
      {/* Top Banner */}
      <div className="border-2 bg-slate-900 flex justify-between text-white rounded-lg p-3">
        <Link
          to={"/dashboard"}
          className="border-2 px-4 py-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
        >
          <ArrowBackIcon /> Back To Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="mt-5 text-xl text-slate-900 font-semibold">{header}</div>

      {/* Members */}
      <div className="bg-slate-100 p-5 mt-5 rounded-lg grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {members.length > 0 ? (
          members.map((member) => (
            <MemberCard key={member._id} member={member} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No members found
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralUser;

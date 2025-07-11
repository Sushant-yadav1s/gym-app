import React from "react";
import { Link } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle"; // 👈 import CircleIcon from MUI

const MemberCard = ({ member }) => {
  const {
    _id,
    name,
    mobileNo,
    profilePic,
    status = "Active",
    nextBillDate = null,
  } = member;

  const formattedDate = nextBillDate
    ? new Date(nextBillDate).toLocaleDateString("en-IN")
    : "N/A";

  return (
    <Link
      to={`/member/${_id}`}
      className="rounded-lg p-4 shadow-md border bg-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="relative w-full flex justify-center">
        <img
          src={profilePic}
          alt={name}
          className="w-24 h-24 rounded-full border-4 border-white object-cover"
        />
        <CircleIcon
          className="absolute top-0 left-1"
          sx={{
            color: status === "Active" ? "greenyellow" : "red",
          }}
        />
      </div>
      <div className="text-center mt-3 font-bold">{name}</div>
      <div className="text-center text-sm">{mobileNo}</div>
      <div className="text-center text-sm">
        Next Bill Date : {formattedDate}
      </div>
    </Link>
  );
};

export default MemberCard;

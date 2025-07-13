import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const MemberDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [status, setStatus] = useState("Active");
  const [renew, setRenew] = useState(false);
  const [membership, setMembership] = useState("");
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [member, setMember] = useState(null);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const fetchMembershipPlans = async () => {
    try {
      const res = await axios.get(`${API}/plans/get-membership`, {
        withCredentials: true,
      });
      setMembershipPlans(res.data.membership);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load membership plans");
    }
  };

  const fetchMember = async () => {
    try {
      const res = await axios.get(`${API}/members/get-member/${id}`, {
        withCredentials: true,
      });
      const mem = res.data.member;
      setMember(mem);
      setStatus(mem.status || "Active");
      setMembership(mem.membership || "");
      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch member");
    }
  };

  useEffect(() => {
    fetchMember();
    fetchMembershipPlans();
  }, [id]);

  const handleSwitchButton = () => {
    setStatus((prev) => (prev === "Active" ? "Pending" : "Active"));
    setRenew(false);
  };

  const handleRenewSave = async () => {
    try {
      await axios.post(
        `${API}/members/change-status/${id}`,
        { status: "Active" },
        { withCredentials: true }
      );

      const res = await axios.post(
        `${API}/members/update-member-plan/${id}`,
        { membership },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      fetchMember();
      setRenew(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to renew membership");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto text-black p-5">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 border-2 font-sans text-black p-2 rounded-xl bg-slate-100 cursor-pointer hover:bg-slate-200 transition w-fit"
      >
        <ArrowBackIcon />
        <span>Go Back</span>
      </div>

      <div className="mt-10 p-2">
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <div className="w-full md:w-1/2">
            <img
              src={
                member?.profilePicture
                  ? `${API}/${member.profilePicture}`
                  : "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg"
              }
              alt="Member"
              className="w-full h-full object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="w-full md:w-1/2 p-5 text-lg bg-white rounded-xl shadow-md">
            <div className="mb-3 font-semibold">Name: {member?.name}</div>
            <div className="mb-3 font-semibold">Mobile: {member?.mobileNo}</div>
            <div className="mb-3 font-semibold">Address: {member?.address}</div>
            <div className="mb-3 font-semibold">
              Joined Date:{" "}
              {member?.createdAt ? formatDate(member.createdAt) : "N/A"}
            </div>
            <div className="mb-3 font-semibold">
              Next Bill Date:{" "}
              {member?.nextBillDate ? formatDate(member.nextBillDate) : "N/A"}
            </div>
           <div className="mb-3 font-semibold">
  Membership Plan: {member?.membership ? `${member.membership.months} Month(s)` : "N/A"}
</div>

            <div className="mb-3 font-semibold flex items-center gap-3">
              Status:{" "}
              <Switch
                onColor="#6366F1"
                checked={status === "Active"}
                onChange={handleSwitchButton}
              />
            </div>

            <div
              onClick={() => {
                if (status === "Active") setRenew((prev) => !prev);
              }}
              className={`mt-4 w-full md:w-2/3 text-white text-center py-2 rounded-md font-semibold transition cursor-pointer ${
                renew && status === "Active"
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  : "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
              } ${
                status === "Active"
                  ? "hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
                  : ""
              }`}
            >
              Renew
            </div>
          </div>
        </div>

        {renew && status === "Active" && (
          <div className="mt-10 bg-white p-5 rounded-xl shadow-md w-full md:w-1/2">
            <label className="block mb-2 font-semibold">
              Select Membership
            </label>
            <select
              value={membership}
              onChange={(e) => setMembership(e.target.value)}
              className="w-full border p-2 rounded-md mb-4"
            >
              <option value="" disabled>
                -- Select a Plan --
              </option>
              {membershipPlans.map((plan) => (
                <option key={plan._id} value={plan._id}>
                  {plan.months} Month{plan.months > 1 ? "s" : ""} - ₹
                  {plan.price}
                </option>
              ))}
            </select>

            <button
              onClick={handleRenewSave}
              className="w-full text-white py-2 rounded-md font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDetail;

import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { toast } from "react-toastify";

const AddMember = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    joinDate: "",
    membership: "",
    profilePic: "",
    imagePreview: "",
  });

  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const res = await axios.get("http://localhost:4000/plans/get-membership", {
          withCredentials: true,
        });
        setMemberships(res.data.membership);
      } catch (err) {
        console.error("Error fetching memberships", err);
        toast.error("Failed to fetch membership plans");
      }
    };
    fetchMemberships();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePic: reader.result,
          imagePreview: reader.result,
        }));
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async () => {
    const { name, mobile, address, joinDate, membership, profilePic } = formData;

    if (!name || !mobile || !address || !joinDate || !membership) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);

    try {
      const body = {
        name: name.trim(),
        mobileNo: mobile.trim(),
        address: address.trim(),
        joiningDate: new Date(joinDate).toISOString(),
        membership,
        profilePic,
      };

      const res = await axios.post("http://localhost:4000/members/register-member", body, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("🎉 Member Registered Successfully", {
        position: "top-center",
        autoClose: 3000,
      });

      setFormData({
        name: "",
        mobile: "",
        address: "",
        joinDate: "",
        membership: "",
        profilePic: "",
        imagePreview: "",
      });

      if (handleClose) handleClose();

    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Failed to register member");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="text-black p-6 w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Member</h2>

      <div className="grid gap-5 grid-cols-2 text-lg">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name of the Joinee"
          className="border-2 w-[90%] p-2 border-slate-400 rounded-md h-12"
        />
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile No"
          className="border-2 w-[90%] p-2 border-slate-400 rounded-md h-12"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="border-2 w-[90%] p-2 border-slate-400 rounded-md h-12"
        />
        <input
          type="date"
          name="joinDate"
          value={formData.joinDate}
          onChange={handleChange}
          className="border-2 w-[90%] p-2 border-slate-400 rounded-md h-12"
        />
        <select
          name="membership"
          value={formData.membership}
          onChange={handleChange}
          className="border-2 w-[90%] h-12 p-2 border-slate-400 rounded-md"
        >
          <option value="" disabled>Select Membership</option>
          {memberships.map((m) => (
            <option key={m._id} value={m._id}>
              {m.months} Month - ₹{m.price}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-[90%] h-12 border-2 border-slate-400 rounded-md p-2 cursor-pointer"
        />
        <div className="w-20 h-20 flex justify-center items-center">
          {loading ? (
            <CircularProgress size={30} />
          ) : (
            <img
              src={formData.imagePreview}
              className="w-full h-full rounded-full object-cover"
              alt="Preview"
            />
          )}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleRegister}
          disabled={submitting}
          className={`${
            submitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          } bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-2 rounded-full shadow-md transition`}
        >
          {submitting ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
};

export default AddMember;

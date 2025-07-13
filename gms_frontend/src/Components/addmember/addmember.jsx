import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

const AddMember = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
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
        const res = await axios.get(`${API}/plans/get-membership`, {
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
    const { name, mobile, address, membership, profilePic } = formData;

    if (!name || !mobile || !address || !membership) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);

    try {
      const body = {
        name: name.trim(),
        mobileNo: mobile.trim(),
        address: address.trim(),
        membership,
        profilePic,
        // ✅ No joiningDate sent, backend will handle it
      };

      const res = await axios.post(`${API}/members/register-member`, body, {
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
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Add New Member</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border px-3 py-2 rounded-md mb-3"
      />

      <input
        type="text"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        placeholder="Mobile Number"
        className="w-full border px-3 py-2 rounded-md mb-3"
      />

      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full border px-3 py-2 rounded-md mb-3"
      />

      {/* No date input field here */}

      <select
        name="membership"
        value={formData.membership}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-md mb-3"
      >
        <option value="">-- Select Membership --</option>
        {memberships.map((plan) => (
          <option key={plan._id} value={plan._id}>
            {plan.months} Month(s) - ₹{plan.price}
          </option>
        ))}
      </select>

      <input
        type="file"
        onChange={handleImageChange}
        className="w-full mb-3 text-sm"
      />

      {loading ? (
        <div className="w-full flex justify-center mb-3">
          <CircularProgress />
        </div>
      ) : formData.imagePreview ? (
        <img
          src={formData.imagePreview}
          alt="Preview"
          className="w-full h-40 object-cover mb-3 rounded-md border"
        />
      ) : null}

      <button
        onClick={handleRegister}
        disabled={submitting}
        className={`w-full py-2 rounded-md font-semibold text-white ${
          submitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-slate-900 hover:bg-indigo-600"
        }`}
      >
        {submitting ? "Registering..." : "Register Member"}
      </button>
    </div>
  );
};

export default AddMember;

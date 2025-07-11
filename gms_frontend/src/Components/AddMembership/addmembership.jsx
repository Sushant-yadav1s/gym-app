import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Add API base URL from .env
const API = import.meta.env.VITE_API_URL;

const Addmembership = ({ handleClose }) => {
  const [memberships, setMemberships] = useState([]);
  const [selected, setSelected] = useState(0);
  const [monthInput, setMonthInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const fetchMembership = async () => {
    try {
      const res = await axios.get(`${API}/plans/get-membership`, {
        withCredentials: true,
      });
      setMemberships(res.data.membership);
      toast.success(`${res.data.membership.length} Memberships Fetched`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch memberships");
    }
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  const handleAdd = async () => {
    if (!monthInput || !priceInput) {
      return toast.error("Enter both fields");
    }

    try {
      const body = {
        months: parseInt(monthInput),
        price: parseInt(priceInput),
      };

      const res = await axios.post(`${API}/plans/add-membership`, body, {
        withCredentials: true,
      });

      toast.success(res.data.message);
      setMonthInput("");
      setPriceInput("");

      if (handleClose) handleClose(); // ✅ Close modal after success
    } catch (err) {
      console.error(err);
      toast.error("Failed to add/update membership");
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {memberships.map((item, index) => (
          <div
            key={item._id || index}
            onClick={() => setSelected(index)}
            className={`px-4 py-2 rounded-md cursor-pointer text-white text-sm font-semibold ${
              selected === index
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                : "bg-slate-900"
            }`}
          >
            {item.months} Month Membership
            <div className="text-sm">Rs {item.price}</div>
          </div>
        ))}
      </div>

      <hr className="my-4 border-gray-300" />

      <div className="flex gap-3 justify-center">
        <input
          type="number"
          value={monthInput}
          onChange={(e) => setMonthInput(e.target.value)}
          placeholder="Add No. of Months"
          className="border px-3 py-1 rounded-md w-40 outline-none"
        />
        <input
          type="number"
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
          placeholder="Price"
          className="border px-3 py-1 rounded-md w-32 outline-none"
        />
        <button
          onClick={handleAdd}
          className="bg-slate-900 text-white px-4 py-1 rounded-md hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          Add +
        </button>
      </div>
    </div>
  );
};

export default Addmembership;

import React from 'react';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [loginfield, setloginfield] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        loginfield,
        { withCredentials: true }
      );

      // ✅ Log full response
      console.log(response.data);

      // ✅ Store required info in localStorage
      localStorage.setItem("gymName", response.data.gym.gymName);
      localStorage.setItem("gymPic", response.data.gym.profilePic);
      localStorage.setItem("isLogin", true);
      localStorage.setItem("token", response.data.token);

      toast.success("Login Successful!", {
        position: "top-center",
        autoClose: 2000,
      });

      // ✅ Navigate after successful login
      navigate("/dashboard");

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);

      toast.error(error.response?.data?.error || "Invalid credentials", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleOnChange = (event, name) => {
    setloginfield({ ...loginfield, [name]: event.target.value });
  };

  return (
    <div className="w-1/2 flex justify-center items-center">
      <div className="w-2/3 p-10 bg-gray-600/50 rounded-lg shadow-lg">
        <div className="font-sans text-white text-center text-3xl mb-6">
          Login
        </div>

        <input
          value={loginfield.userName}
          onChange={(event) => handleOnChange(event, "userName")}
          type="text"
          placeholder="Enter username"
          className="w-full mb-4 border border-black p-2 rounded-lg bg-white text-black"
        />

        <input
          value={loginfield.password}
          onChange={(event) => handleOnChange(event, "password")}
          type="password"
          placeholder="Enter password"
          className="w-full mb-6 border border-black p-2 rounded-lg bg-white text-black"
        />

        <button
          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-semibold"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>

      {/* ✅ Toast pop-up container */}
      <ToastContainer />
    </div>
  );
};

export default Login;

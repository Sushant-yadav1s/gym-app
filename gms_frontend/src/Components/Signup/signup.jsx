import React, { useState } from "react";
import "./Signup.css"; // Optional: for any extra styling
import Modal from "../Modal/modal";
import ForgotPassword from "../forgotPassword/forgotPassword";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from 'react-toastify';
const Signup = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false); // For image upload

  const [inputField, setinputField] = useState({
    gymName: "",
    email: "",
    userName: "",
    password: "",
    profilePic:
      "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
  });

  const handleClose = () => {
    setForgotPassword(false);
  };

  const handleOnchange = (event, name) => {
    setinputField({ ...inputField, [name]: event.target.value });
  };

  const uploadImage = async (event) => {
    setLoading(true); // Start loading
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gymmanagement");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/deshzqe49/image/upload",
        data
      );
      const imageUrl = response.data.url;
      setinputField({ ...inputField, profilePic: imageUrl });
    } catch (err) {
      console.log("Image Upload Error:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleRegister = async () => {
  await axios
    .post("http://localhost:4000/auth/register", inputField)
    .then((resp) => {
      const successMsg = resp.data.message;
      toast.success(successMsg);
    })
    .catch((err) => {
      const errorMessage = err.response?.data?.error || "Registration failed";
      // console.log(errorMessage); // Optional debugging
      toast.error(errorMessage);
    });
};

  
  return (
    <div className="w-1/2 flex justify-center items-center">
      <div className="signup-scroll w-[80%] p-8 bg-gray-600/50 rounded-lg shadow-lg overflow-y-auto max-h-[85vh]">
        <div className="font-sans text-white text-center text-3xl mb-5">
          Register Your Gym
        </div>

        <input
          value={inputField.email}
          onChange={(event) => handleOnchange(event, "email")}
          type="email"
          placeholder="Enter Email"
          className="w-full mb-3 border border-black p-2 rounded-lg bg-white text-black"
        />

        <input
          type="text"
          value={inputField.gymName}
          onChange={(event) => handleOnchange(event, "gymName")}
          placeholder="Enter Gym Name"
          className="w-full mb-3 border border-black p-2 rounded-lg bg-white text-black"
        />

        <input
          type="text"
          value={inputField.userName}
          onChange={(event) => handleOnchange(event, "userName")}
          placeholder="Enter Username"
          className="w-full mb-3 border border-black p-2 rounded-lg bg-white text-black"
        />

        <input
          type="password"
          value={inputField.password}
          onChange={(event) => handleOnchange(event, "password")}
          placeholder="Enter Password"
          className="w-full mb-3 border border-black p-2 rounded-lg bg-white text-black"
        />

        <input
          type="file"
          onChange={(e) => uploadImage(e)}
          className="w-full mb-2 p-2 text-white rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-800 transition"
        />

        {/* Image Preview or Loader */}
        {loading ? (
          <div className="w-full flex justify-center items-center mb-4">
            <CircularProgress style={{ color: "white" }} />
          </div>
        ) : (
          <img
            src={inputField.profilePic}
            alt="Gym Preview"
            className="w-full max-h-40 object-cover mb-4 border border-white rounded-md"
          />
        )}

        <button
          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-semibold mb-3 cursor-pointer"
       onClick={()=>handleRegister()} >
          Register
        </button>

        <button
          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-medium cursor-pointer"
          onClick={() => setForgotPassword(true)}
        >
          Forgot Password
        </button>

        {forgotPassword && (
          <Modal
            handleClose={handleClose}
            content={<ForgotPassword />}
            header="Forgot Password"
          />
        )}
      </div>
    </div>
  );
};

export default Signup;

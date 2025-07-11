import React, { useState } from 'react';
import Loader from '../loader/Loader';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Add API base from env
const API = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1 = email, 2 = OTP, 3 = new password
  const [loading, setLoading] = useState(false);
  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: ""
  });

  const handleOnChange = (e, name) => {
    setInputField({ ...inputField, [name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (step === 1 && inputField.email !== "") {
      try {
        setLoading(true);
        const res = await axios.post(`${API}/auth/reset-password/sendOtp`, {
          email: inputField.email
        });
        toast.success(res.data.message);
        setStep(2);
      } catch (err) {
        toast.error(err.response?.data?.error || "Failed to send OTP");
      } finally {
        setLoading(false);
      }
    }

    else if (step === 2 && inputField.otp !== "") {
      try {
        setLoading(true);
        const res = await axios.post(`${API}/auth/reset-password/checkOtp`, {
          email: inputField.email,
          otp: inputField.otp
        });
        toast.success(res.data.message);
        setStep(3);
      } catch (err) {
        toast.error(err.response?.data?.error || "Invalid OTP");
      } finally {
        setLoading(false);
      }
    }

    else if (step === 3 && inputField.newPassword !== "") {
      try {
        setLoading(true);
        const res = await axios.post(`${API}/auth/reset-password`, {
          email: inputField.email,
          newPassword: inputField.newPassword
        });
        toast.success(res.data.message);
        setStep(1);
        setInputField({ email: "", otp: "", newPassword: "" });
      } catch (err) {
        toast.error(err.response?.data?.error || "Password reset failed");
      } finally {
        setLoading(false);
      }
    }
  };

  const getButtonLabel = () => {
    if (step === 1) return "Submit Your Email";
    if (step === 2) return "Submit Your OTP";
    return "Change Password";
  };

  return (
    <div className='w-full relative'>
      {step >= 1 && (
        <div className='mb-4'>
          <label className='block font-medium mb-1'>Enter Your Email</label>
          <input
            type='email'
            value={inputField.email}
            onChange={(e) => handleOnChange(e, "email")}
            className='w-full p-2 rounded-lg border-2 border-slate-400'
            placeholder='Enter Email'
          />
        </div>
      )}

      {step >= 2 && (
        <div className='mb-4'>
          <label className='block font-medium mb-1'>Enter Your OTP</label>
          <input
            type='text'
            value={inputField.otp}
            onChange={(e) => handleOnChange(e, "otp")}
            className='w-full p-2 rounded-lg border-2 border-slate-400'
            placeholder='Enter OTP'
          />
        </div>
      )}

      {step === 3 && (
        <div className='mb-4'>
          <label className='block font-medium mb-1'>Enter Your New Password</label>
          <input
            type='password'
            value={inputField.newPassword}
            onChange={(e) => handleOnChange(e, "newPassword")}
            className='w-full p-2 rounded-lg border-2 border-slate-400'
            placeholder='Enter new password'
          />
        </div>
      )}

      <div
        className='bg-slate-800 text-white mx-auto w-2/3 p-3 rounded-lg text-center font-semibold cursor-pointer border-2 hover:bg-white hover:text-black'
        onClick={handleSubmit}
      >
        {getButtonLabel()}
      </div>

      {loading && <Loader />}
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;

import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/home";
import Dashboard from "./Pages/Dashboard/dashboard";
import Sidebar from "./Components/Sidebar/sidebar";
import Member from "./Pages/Member/member";
import GeneralUser from "./Pages/GeneralUser/generalUser";
import MemberDetail from "./Pages/Memberdetail/memberDetail";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLogin");

    if (isLoggedIn) {
      setIsLogin(true);
      if (location.pathname === "/") {
        navigate("/dashboard");
      }
    } else {
      setIsLogin(false);
      const publicPaths = ["/"];
      if (!publicPaths.includes(location.pathname)) {
        navigate("/");
      }
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <div className="flex">
        {/* ✅ Show sidebar only if logged in and not on login page */}
        {isLogin && location.pathname !== "/" && <Sidebar />}

        <div className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/member" element={<Member />} />
            <Route path="/specific/:page" element={<GeneralUser />} />
            <Route path="/member/:id" element={<MemberDetail />} />
          </Routes>
        </div>
      </div>

      {/* ✅ Toast container globally available for all toasts */}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;

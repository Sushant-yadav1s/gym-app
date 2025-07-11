import Login from "../../Components/Login/login";
import Signup from "../../Components/Signup/signup";

const Home = () => {
  return (
    <div className="w-full h-[100vh]">
      <div className="border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl">
        Welcome To Gym Management System
      </div>

      <div className='w-full h-full flex bg-cover bg-[url("https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg")]'>
        
        <Login></Login>

       <Signup></Signup>


      </div>
    </div>
  );
};

export default Home;

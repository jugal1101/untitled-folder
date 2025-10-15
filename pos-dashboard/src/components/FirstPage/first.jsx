import React from "react";
import { FaUserTie, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function First() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.6)), url('https://melrosecollective.net/wp-content/uploads/2014/12/restaurant2.jpg')",
      }}
    >
      {/* Overlay Container */}
      <div className="flex flex-col items-center justify-center text-white gap-12 text-center px-4">
        
        {/* Restaurant Name */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-500 drop-shadow-lg">
          Desi Tadaka{" "}
          <span className="block md:inline text-white text-2xl font-medium">
            - Dil Se Desi
          </span>
        </h1>

        {/* Cards Container */}
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
          {/* Owner Card */}
          <div
            onClick={() => navigate("/manager-login")}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-xl w-72 h-60 p-8 flex flex-col items-center justify-center text-white cursor-pointer transition-transform transform hover:-translate-y-2"
          >
            <div className="text-5xl text-yellow-500 mb-3">
              <FaUserTie />
            </div>
            <h3 className="text-xl font-semibold mb-2">Restaurant Owner</h3>
            <p className="text-sm text-gray-100">Log in or sign up as a restaurant owner</p>
          </div>

          {/* Employee Card */}
          <div
            onClick={() => navigate("/employee-login")}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-xl w-72 h-60 p-8 flex flex-col items-center justify-center text-white cursor-pointer transition-transform transform hover:-translate-y-2"
          >
            <div className="text-5xl text-yellow-500 mb-3">
              <FaUsers />
            </div>
            <h3 className="text-xl font-semibold mb-2">Employee</h3>
            <p className="text-sm text-gray-100">Log in as an employee</p>
          </div>
        </div>
      </div>
    </div>
  );
}

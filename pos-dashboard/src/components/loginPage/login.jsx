import { motion } from "framer-motion";
import { FaUserAlt, FaLock } from "react-icons/fa";
import png from "../../assets/images/chef-Photoroom.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";

export default function Login({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("⚠️ Please fill all fields");

    try {
      const res = await fetch("http://localhost:3000/users");
      const users = await res.json();
      const user = users.find(
        (u) => u.email === email && u.password === password && u.role === role
      );

      if (!user) return alert(`❌ Invalid credentials for ${role} login`);

      alert(`✅ Welcome, ${user.name}!`);
      localStorage.setItem("loggedUser", JSON.stringify(user));

      if (user.role === "Manager") navigate("/manager-login");
      else if (user.role === "Employee") navigate("/employee-login");
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong!");
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center bg-cover bg-center font-[Poppins] overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.6)), url('https://melrosecollective.net/wp-content/uploads/2014/12/restaurant2.jpg')",
      }}
    >
      <motion.div
        className="bg-white/90 w-[470px] rounded-3xl p-10 text-center shadow-2xl relative"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Top Menu */}
        <div className="flex justify-end mb-2">
          <div className="text-1xl cursor-pointer text-gray-700">☰</div>
        </div>

        {/* Chef Image */}
        <motion.img
          src={png}
          alt="Chef"
          className="w-40 mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
        />

        {/* Title */}
        <motion.h1
          className="text-2xl font-bold text-gray-900 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {role} Login
        </motion.h1>

        <motion.p
          className="text-gray-700 text-sm mt-2 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Welcome back! Please enter your {role.toLowerCase()} credentials.
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleLogin}
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3">
            <FaUserAlt className="text-gray-500 text-lg" />
            <input
              type="email"
              placeholder="Email"
              className="ml-3 bg-transparent outline-none w-full text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3">
            <FaLock className="text-gray-500 text-lg" />
            <input
              type="password"
              placeholder="Password"
              className="ml-3 bg-transparent outline-none w-full text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:-translate-y-1 transition-transform"
          >
            Login
          </button>
        </motion.form>

        {/* Swipe Animation */}
        <motion.div
          className="mt-6 text-gray-700 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="block text-xl">⬆</span>
          <p className="text-sm mt-1 tracking-wide">Click Here</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

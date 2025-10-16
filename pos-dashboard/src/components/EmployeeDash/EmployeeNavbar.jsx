// src/components/EmployeeNavbar.jsx
import React from "react";
import {
  FaHome,
  FaUtensils,
  FaHistory,
  FaChartBar,
  FaUserTie,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function EmployeeNavbar() {
  const navigate = useNavigate();

  const navLinks = [
    { name: "Dashboard", icon: <FaHome />, path: "/employee-dashboard" },
    { name: "OrderPage", icon: <FaUtensils />, path: "/order-page" },
    { name: "History", icon: <FaHistory />, path: "/history" },
    { name: "Reports", icon: <FaChartBar />, path: "/reports" },
    { name: "Profile", icon: <FaUserTie />, path: "/profile" },
  ];

  return (
    <aside className="w-24 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-r-3xl flex flex-col justify-center items-center py-8 px-3 shadow-2xl border-r border-gray-700/40 h-screen sticky top-0">
  <div className="flex flex-col items-center gap-8">
    {navLinks.map((link, i) => (
      <button
        key={i}
        onClick={() => navigate(link.path)}
        className={`flex flex-col items-center justify-center w-20 h-20 rounded-2xl transition-all duration-200 hover:bg-[#c7a86e]/10 text-gray-400`}
      >
        <div className="text-2xl mb-1">{link.icon}</div>
        <span className="text-xs text-center">{link.name}</span>
      </button>
    ))}
  </div>
</aside>

  );
}

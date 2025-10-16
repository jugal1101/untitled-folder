import React, { useState } from "react";
import { FaHome, FaUsers, FaUserTie, FaUtensils, FaHistory, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Order History");
  const [search, setSearch] = useState("");

  const navLinks = [
    { name: "Dashboard", icon: <FaHome />, path: "/manager-dash" },
    { name: "Customer Details", icon: <FaUsers />, path: "/manager-custdetails" },
    { name: "Employee Details", icon: <FaUserTie />, path: "/manager-employeedetails" },
    { name: "Menu", icon: <FaUtensils />, path: "/manager-menu" },
    { name: "Order History", icon: <FaHistory />, path: "/manager-orderhistory" },
  ];

  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "John Doe",
      table: 5,
      items: ["American Favorite", "Chicken Mushroom"],
      total: 10.74,
      date: "2025-10-15",
      status: "Completed",
    },
    {
      id: "ORD002",
      customer: "Alice Smith",
      table: 3,
      items: ["Favorite Cheese"],
      total: 6.57,
      date: "2025-10-15",
      status: "Pending",
    },
    {
      id: "ORD003",
      customer: "Bob Johnson",
      table: 1,
      items: ["Chicken Mushroom", "Favorite Cheese"],
      total: 12.44,
      date: "2025-10-14",
      status: "Cancelled",
    },
  ]);

  const statusColor = {
    Completed: "bg-green-500 text-white",
    Pending: "bg-yellow-500 text-black",
    Cancelled: "bg-red-600 text-white",
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="flex min-h-screen text-gray-100 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,10,10,0.85), rgba(20,20,20,0.95)), url('https://melrosecollective.net/wp-content/uploads/2014/12/restaurant2.jpg')",
      }}
    >
      {/* Sidebar */}
      <aside className="w-28 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-r-3xl flex flex-col justify-between py-8 px-3 shadow-2xl border-r border-gray-700/40">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-3xl font-extrabold text-[#c7a86e] tracking-wide drop-shadow">🍴</h1>
          {navLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => {
                navigate(link.path);
                setActiveLink(link.name);
              }}
              className={`flex flex-col items-center justify-center w-24 h-20 rounded-2xl transition-all duration-200 ${
                activeLink === link.name
                  ? "bg-[#c7a86e]/20 text-[#c7a86e] shadow-md"
                  : "hover:bg-[#c7a86e]/10 text-gray-400"
              }`}
            >
              <div className="text-2xl mb-1">{link.icon}</div>
              <span className="text-xs text-center">{link.name}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col gap-8 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-[#c7a86e]">Order History</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID or Customer"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.05)] text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#c7a86e]"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-[#1f1f1f]/80 border border-[#c7a86e]/30 rounded-3xl p-5 flex flex-col gap-3 shadow-lg"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#c7a86e]">{order.customer}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${statusColor[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-gray-300 text-sm">Order ID: {order.id}</p>
              <p className="text-gray-300 text-sm">Table: {order.table}</p>
              <p className="text-gray-300 text-sm">
                Items: {order.items.join(", ")}
              </p>
              <p className="text-gray-300 font-semibold text-lg">
                Total: ${order.total.toFixed(2)}
              </p>
              <p className="text-gray-400 text-xs text-right">{order.date}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

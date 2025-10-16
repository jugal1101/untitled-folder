import React, { useState } from "react";
import { FaHome, FaUsers, FaUserTie, FaChartBar, FaUtensils, FaHistory, FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CustomerDetails() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Customer Details");
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    {
      id: "CUST001",
      name: "Alice Johnson",
      phone: "9876543210",
      email: "alice@gmail.com",
      totalOrders: 12,
      totalSpent: 1200,
      orders: [
        { orderId: "ORD001", items: "Pizza, Burger", total: 450, date: "12-10-2025" },
        { orderId: "ORD002", items: "Juice", total: 50, date: "13-10-2025" },
      ],
    },
    {
      id: "CUST002",
      name: "Bob Smith",
      phone: "9876541230",
      email: "bob@gmail.com",
      totalOrders: 8,
      totalSpent: 850,
      orders: [
        { orderId: "ORD003", items: "Cheese Pizza", total: 300, date: "11-10-2025" },
      ],
    },
  ];

  const navLinks = [
    { name: "Dashboard", icon: <FaHome />, path: "/manager-dash" },
    { name: "Customer Details", icon: <FaUsers />, path: "/manager-custdetails" },
    { name: "Employee Details", icon: <FaUserTie />, path: "/manager-employeedetails" },
    // { name: "Reports", icon: <FaChartBar />, path: "/manager-reports" },
    { name: "Menu", icon: <FaUtensils />, path: "/manager-menu" },
    { name: "Order History", icon: <FaHistory />, path: "/manager-orderhistory" },
  ];

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
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
        <h1 className="text-3xl font-semibold text-[#c7a86e]">{activeLink}</h1>

        {/* Search Bar */}
        <div className="flex items-center gap-3 w-full max-w-md bg-[rgba(255,255,255,0.05)] px-4 py-3 rounded-xl shadow-sm border border-[rgba(255,255,255,0.1)]">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, ID, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full focus:outline-none text-gray-200 bg-transparent placeholder-gray-400"
          />
        </div>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard title="Total Customers" value={customers.length} color="#c7a86e" />
          <SummaryCard
            title="Total Orders"
            value={customers.reduce((acc, c) => acc + c.totalOrders, 0)}
            color="#c7a86e"
          />
          <SummaryCard
            title="Total Spent"
            value={`₹${customers.reduce((acc, c) => acc + c.totalSpent, 0)}`}
            color="#c7a86e"
          />
          <SummaryCard
            title="Top Customer"
            value={
              customers.reduce((prev, curr) =>
                curr.totalSpent > prev.totalSpent ? curr : prev
              ).name
            }
            color="#c7a86e"
          />
        </section>

        {/* Customer List */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((cust) => (
            <div
              key={cust.id}
              className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-3xl p-6 hover:shadow-[#c7a86e]/20 transition flex flex-col gap-3"
            >
              <h2 className="text-lg font-semibold text-gray-200">{cust.name}</h2>
              <p className="text-gray-400 text-sm">ID: {cust.id}</p>
              <p className="text-gray-400 text-sm">📞 {cust.phone}</p>
              <p className="text-gray-400 text-sm">✉️ {cust.email}</p>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-300">Orders: {cust.totalOrders}</span>
                <span className="text-[#c7a86e] font-semibold">₹{cust.totalSpent}</span>
              </div>
              <button
                className="mt-4 bg-[#c7a86e] text-black py-2 rounded-xl font-medium hover:bg-[#bfa374] transition"
                onClick={() => setSelectedCustomer(cust)}
              >
                View Orders
              </button>
            </div>
          ))}
        </section>
      </main>

      {/* Orders Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#1a1a1a]/90 border border-[#c7a86e]/40 rounded-3xl w-11/12 md:w-2/3 lg:w-1/2 p-6 shadow-2xl relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-[#c7a86e]"
              onClick={() => setSelectedCustomer(null)}
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold text-[#c7a86e] mb-4">
              {selectedCustomer.name}'s Orders
            </h2>
            <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-2">
              {selectedCustomer.orders.map((order) => (
                <div
                  key={order.orderId}
                  className="flex justify-between items-center p-4 bg-[rgba(199,168,110,0.1)] rounded-xl shadow-sm hover:shadow-[#c7a86e]/30 transition"
                >
                  <div>
                    <p className="font-medium text-gray-200">Order ID: {order.orderId}</p>
                    <p className="text-gray-300 text-sm">{order.items}</p>
                    <p className="text-gray-400 text-xs">{order.date}</p>
                  </div>
                  <div className="text-[#c7a86e] font-semibold">₹{order.total}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ✅ Reusable Summary Card Component */
function SummaryCard({ title, value, color }) {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-3xl p-6 shadow-md hover:shadow-[#c7a86e]/20 transition text-center">
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-2" style={{ color }}>
        {value}
      </h3>
    </div>
  );
}

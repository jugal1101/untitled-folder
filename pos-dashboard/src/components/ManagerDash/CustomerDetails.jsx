import React, { useState } from "react";
import { FaHome, FaUsers, FaUserTie, FaChartBar, FaUtensils, FaHistory, FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CustomerDetails() {
    const navigate=useNavigate();
     const [activeLink, setActiveLink] = useState("Dashboard");
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
    // Add more customers similarly...
  ];

  const navLinks = [
      { name: "Dashboard", icon: <FaHome />, path: "/manager-dash" },
      { name: "Customer Details", icon: <FaUsers />, path: "/manager-custdetails" },
      { name: "Employee Details", icon: <FaUserTie />, path: "/manager-employeedetails" },
      { name: "Reports", icon: <FaChartBar />, path: "/manager-reports" },
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
    <div className="flex min-h-screen bg-orange-50">
      {/* Sidebar */}
      <div className="w-28 bg-white rounded-3xl flex flex-col justify-between py-8 shadow-md px-2">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-3xl font-extrabold text-orange-500 tracking-wide">🍴</h1>
           {navLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => {
                navigate(link.path);
                setActiveLink(link.name);
              }}
              className={`flex flex-col items-center justify-center w-24 h-20 rounded-2xl transition ${
                activeLink === link.name ? "bg-orange-100 shadow" : "hover:bg-orange-100"
              }`}
            >
              <div className="text-2xl mb-1 text-orange-500">{link.icon}</div>
              <span className="text-xs text-gray-700 text-center">{link.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-gray-800">Customer Details</h1>

        {/* Search Bar */}
        <div className="flex items-center gap-3 w-full max-w-md">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, ID, or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-400 shadow-sm"
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col items-center hover:shadow-lg transition">
            <span className="text-gray-500 text-sm">Total Customers</span>
            <span className="text-2xl font-bold text-orange-500">{customers.length}</span>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col items-center hover:shadow-lg transition">
            <span className="text-gray-500 text-sm">Total Orders</span>
            <span className="text-2xl font-bold text-orange-500">{customers.reduce((acc, c) => acc + c.totalOrders, 0)}</span>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col items-center hover:shadow-lg transition">
            <span className="text-gray-500 text-sm">Total Spent</span>
            <span className="text-2xl font-bold text-orange-500">₹{customers.reduce((acc, c) => acc + c.totalSpent, 0)}</span>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col items-center hover:shadow-lg transition">
            <span className="text-gray-500 text-sm">Top Customer</span>
            <span className="text-2xl font-bold text-orange-500">
              {customers.reduce((prev, curr) => (curr.totalSpent > prev.totalSpent ? curr : prev), customers[0]).name}
            </span>
          </div>
        </div>

        {/* Customer List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((cust) => (
            <div
              key={cust.id}
              className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition flex flex-col gap-3"
            >
              <h2 className="text-lg font-bold text-gray-800">{cust.name}</h2>
              <p className="text-gray-500 text-sm">ID: {cust.id}</p>
              <p className="text-gray-500 text-sm">Phone: {cust.phone}</p>
              <p className="text-gray-500 text-sm">Email: {cust.email}</p>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600 text-sm">Orders: {cust.totalOrders}</span>
                <span className="text-orange-500 font-semibold">₹{cust.totalSpent}</span>
              </div>
              <button
                className="mt-3 bg-orange-500 text-white py-2 rounded-xl font-medium hover:bg-orange-600 transition"
                onClick={() => setSelectedCustomer(cust)}
              >
                View Orders
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Orders Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl w-11/12 md:w-2/3 lg:w-1/2 p-6 shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedCustomer(null)}
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedCustomer.name}'s Orders</h2>
            <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
              {selectedCustomer.orders.map((order) => (
                <div
                  key={order.orderId}
                  className="flex justify-between p-4 bg-orange-50 rounded-xl shadow hover:shadow-md transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">Order ID: {order.orderId}</p>
                    <p className="text-gray-500 text-sm">{order.items}</p>
                    <p className="text-gray-400 text-xs">{order.date}</p>
                  </div>
                  <div className="text-orange-500 font-semibold">₹{order.total}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

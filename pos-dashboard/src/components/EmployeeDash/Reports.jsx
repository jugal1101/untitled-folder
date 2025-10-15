import React from "react";
import {
  FaShoppingCart,
  FaHome,
  FaClock,
  FaChartBar,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

export default function EmployeeReportPage() {
  const navigate = useNavigate();

  // Static logged-in employee
  const employeeName = "John Doe";

  // Static sales data
  const salesData = [
    { date: "2025-10-10", sales: 200 },
    { date: "2025-10-11", sales: 300 },
    { date: "2025-10-12", sales: 250 },
    { date: "2025-10-13", sales: 400 },
    { date: "2025-10-14", sales: 350 },
  ];

  // Static top-selling dishes
  const topDishes = [
    { name: "American Favorite", qty: 12 },
    { name: "Super Supreme", qty: 9 },
    { name: "Favorite Cheese", qty: 7 },
  ];

  // Static summary
  const summary = {
    totalSales: 1500,
    totalOrders: 45,
    avgOrder: 33.3,
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-orange-50 to-orange-100">
      {/* Sidebar */}
      <div className="w-20 bg-white rounded-3xl flex flex-col items-center py-10 gap-8 shadow-md">
        <FaHome className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" onClick={() => navigate("/")} />
        <FaShoppingCart className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" onClick={() => navigate("/order")} />
        <FaClock className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" />
        <FaChartBar className="text-orange-400 text-2xl" />
        <FaCog className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" onClick={() => navigate("/profile")} />
        <FaUserCircle className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer mt-auto" />
        <FaSignOutAlt className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col py-10 px-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 Your Performance</h1>
          <p className="text-gray-500">Sales and top-selling dishes for {employeeName}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-3xl shadow-md text-center">
            <p className="text-gray-500">Total Sales</p>
            <p className="text-orange-500 text-2xl font-bold">${summary.totalSales}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-md text-center">
            <p className="text-gray-500">Total Orders</p>
            <p className="text-orange-500 text-2xl font-bold">{summary.totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-md text-center">
            <p className="text-gray-500">Avg Order Value</p>
            <p className="text-orange-500 text-2xl font-bold">${summary.avgOrder}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Line Chart */}
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h2 className="text-xl font-semibold text-orange-500 mb-4">Sales Over Time</h2>
            <LineChart width={500} height={300} data={salesData}>
              <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={3} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>

          {/* Top Selling Dishes Bar Chart */}
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h2 className="text-xl font-semibold text-orange-500 mb-4">Top Selling Dishes</h2>
            <BarChart width={500} height={300} data={topDishes}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="qty" fill="#f97316" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
}

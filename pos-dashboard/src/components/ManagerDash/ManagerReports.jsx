import React, { useState } from "react";
import {
  FaShoppingCart,
  FaHome,
  FaClock,
  FaChartBar,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from "recharts";

export default function ReportPage() {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState("John Doe");

  // Sample employees
  const employees = ["John Doe", "Jane Smith", "Mike Johnson"];

  // Sample sales data per day
  const salesData = {
    "John Doe": [
      { date: "2025-10-10", sales: 200 },
      { date: "2025-10-11", sales: 300 },
      { date: "2025-10-12", sales: 250 },
      { date: "2025-10-13", sales: 400 },
      { date: "2025-10-14", sales: 350 },
    ],
    "Jane Smith": [
      { date: "2025-10-10", sales: 150 },
      { date: "2025-10-11", sales: 200 },
      { date: "2025-10-12", sales: 180 },
      { date: "2025-10-13", sales: 220 },
      { date: "2025-10-14", sales: 300 },
    ],
    "Mike Johnson": [
      { date: "2025-10-10", sales: 100 },
      { date: "2025-10-11", sales: 120 },
      { date: "2025-10-12", sales: 150 },
      { date: "2025-10-13", sales: 180 },
      { date: "2025-10-14", sales: 210 },
    ],
  };

  // Sample top-selling dishes per employee
  const topDishes = {
    "John Doe": [
      { name: "American Favorite", qty: 12 },
      { name: "Super Supreme", qty: 9 },
      { name: "Favorite Cheese", qty: 7 },
    ],
    "Jane Smith": [
      { name: "Chicken Mushroom", qty: 10 },
      { name: "Ultimate Cheese", qty: 8 },
      { name: "Super Supreme", qty: 5 },
    ],
    "Mike Johnson": [
      { name: "Meat Lovers", qty: 8 },
      { name: "Favorite Cheese", qty: 6 },
      { name: "Ultimate Cheese", qty: 4 },
    ],
  };

  // Sample summary data per employee
  const summaries = {
    "John Doe": { totalSales: 1500, totalOrders: 45, avgOrder: 33.3 },
    "Jane Smith": { totalSales: 1200, totalOrders: 38, avgOrder: 31.6 },
    "Mike Johnson": { totalSales: 900, totalOrders: 28, avgOrder: 32.1 },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-orange-50 to-orange-100">
      {/* Sidebar */}
      <div className="w-20 bg-white rounded-3xl flex flex-col items-center py-10 gap-8 shadow-md">
        <FaHome className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" onClick={() => navigate("/")} />
        <FaShoppingCart className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" onClick={() => navigate("/order")} />
        <FaClock className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" onClick={() => navigate("/history")} />
        <FaChartBar className="text-orange-400 text-2xl" />
        <FaCog className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" onClick={() => navigate("/profile")} />
        <FaUserCircle className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer mt-auto" />
        <FaSignOutAlt className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col py-10 px-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 Employee Reports</h1>
          <p className="text-gray-500">View performance metrics per employee</p>
        </div>

        {/* Employee Selector */}
        <div className="mb-6">
          <label className="text-gray-600 font-medium mr-2">Select Employee:</label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-orange-400"
          >
            {employees.map((emp, idx) => (
              <option key={idx} value={emp}>{emp}</option>
            ))}
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-3xl shadow-md text-center">
            <p className="text-gray-500">Total Sales</p>
            <p className="text-orange-500 text-2xl font-bold">${summaries[selectedEmployee].totalSales}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-md text-center">
            <p className="text-gray-500">Total Orders</p>
            <p className="text-orange-500 text-2xl font-bold">{summaries[selectedEmployee].totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-md text-center">
            <p className="text-gray-500">Avg Order Value</p>
            <p className="text-orange-500 text-2xl font-bold">${summaries[selectedEmployee].avgOrder}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Line Chart */}
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h2 className="text-xl font-semibold text-orange-500 mb-4">Sales Over Time</h2>
            <LineChart width={500} height={300} data={salesData[selectedEmployee]}>
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
            <BarChart width={500} height={300} data={topDishes[selectedEmployee]}>
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

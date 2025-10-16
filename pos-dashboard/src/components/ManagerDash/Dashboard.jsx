import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaUserTie,
  FaChartBar,
  FaUtensils,
  FaHistory,
} from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Dashboard");

  const navLinks = [
    { name: "Dashboard", icon: <FaHome />, path: "/manager-dash" },
    { name: "Customer Details", icon: <FaUsers />, path: "/manager-custdetails" },
    { name: "Employee Details", icon: <FaUserTie />, path: "/manager-employeedetails" },
    // { name: "Reports", icon: <FaChartBar />, path: "/manager-reports" },
    { name: "Menu", icon: <FaUtensils />, path: "/manager-menu" },
    { name: "Order History", icon: <FaHistory />, path: "/manager-orderhistory" },
  ];

  const summaryData = {
    totalEmployees: 12,
    totalCollections: 45230,
    totalOrders: 320,
    totalCustomers: 145,
    revenueToday: 1520,
    topDish: "Classic Chicken Burger",
  };

  const employeePerformance = {
    labels: ["John", "Alice", "Bob", "Emma", "David"],
    datasets: [
      {
        label: "Sales in ₹",
        data: [12000, 15000, 10000, 8000, 9000],
        backgroundColor: "#c7a86e",
        borderRadius: 8,
      },
    ],
  };

  const orderByCategory = {
    labels: ["Burger", "Pizza", "Ice Cream", "Juice"],
    datasets: [
      {
        label: "# of Orders",
        data: [120, 90, 60, 50],
        backgroundColor: ["#c7a86e", "#bfa374", "#d1bfa7", "#e0d8c3"],
      },
    ],
  };

  const topDishes = [
    { name: "Classic Chicken Burger", sold: 120 },
    { name: "Chicken Pizza", sold: 90 },
    { name: "Double Cheese Burger", sold: 80 },
    { name: "Triple Scoop Ice Cream", sold: 60 },
  ];

  return (
    <div
      className="flex min-h-screen bg-cover bg-center text-gray-100"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,10,10,0.8), rgba(20,20,20,0.95)), url('https://melrosecollective.net/wp-content/uploads/2014/12/restaurant2.jpg')",
      }}
    >
      {/* Sidebar */}
      <div className="w-28 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-r-3xl flex flex-col justify-between py-8 px-3 shadow-2xl border-r border-gray-700/40">
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
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 flex flex-col gap-10 overflow-y-auto">
        <h1 className="text-3xl font-semibold text-[#c7a86e]">{activeLink}</h1>

        {activeLink === "Dashboard" && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-6">
              {[
                { label: "Total Employees", value: summaryData.totalEmployees },
                { label: "Total Collections", value: `₹${summaryData.totalCollections}` },
                { label: "Total Orders", value: summaryData.totalOrders },
                { label: "Total Customers", value: summaryData.totalCustomers },
                { label: "Revenue Today", value: `₹${summaryData.revenueToday}` },
                { label: "Top Dish", value: summaryData.topDish },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-3xl p-6 shadow-md hover:shadow-[#c7a86e]/20 transition flex flex-col justify-center items-center text-center"
                >
                  <span className="text-gray-400 text-sm mb-1">{item.label}</span>
                  <span className="text-2xl font-bold text-[#c7a86e] leading-snug">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Charts & Top Dishes Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Bar Chart */}
              <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-3xl p-8 shadow-md col-span-2">
                <h2 className="text-xl font-semibold mb-6 text-[#c7a86e] text-center">
                  Employee Sales Performance
                </h2>
                <div className="h-[400px]">
                  <Bar
                    data={employeePerformance}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: { color: "#ccc", font: { size: 13 } },
                        },
                        x: { ticks: { color: "#ccc", font: { size: 13 } } },
                      },
                    }}
                  />
                </div>
              </div>

              {/* Pie Chart */}
              <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-3xl p-8 shadow-md">
                <h2 className="text-xl font-semibold mb-6 text-[#c7a86e] text-center">
                  Orders by Category
                </h2>
                <div className="flex justify-center items-center h-[400px]">
                  <Pie data={orderByCategory} />
                </div>
              </div>
            </div>

            {/* Top Dishes Section */}
            <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-3xl p-8 shadow-md mt-8">
              <h2 className="text-xl font-semibold mb-6 text-[#c7a86e] text-center">
                Top Dishes
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {topDishes.map((dish, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-center items-center bg-[rgba(255,255,255,0.08)] rounded-2xl p-5 hover:bg-[rgba(255,255,255,0.12)] transition"
                  >
                    <span className="text-gray-200 font-medium text-center">
                      {dish.name}
                    </span>
                    <span className="text-[#c7a86e] font-semibold mt-2">
                      {dish.sold} sold
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeLink !== "Dashboard" && (
          <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-3xl p-10 text-center text-gray-300">
            <h2 className="text-2xl font-semibold text-[#c7a86e]">
              {activeLink} Page Under Development
            </h2>
            <p className="mt-4 text-gray-400">You can add more content here soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}

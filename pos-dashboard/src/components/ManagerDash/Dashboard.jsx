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
  const [activeLink, setActiveLink] = useState("Dashboard"); // Track active page

  const navLinks = [
    { name: "Dashboard", icon: <FaHome />, path: "/manager-dash" },
    { name: "Customer Details", icon: <FaUsers />, path: "/manager-custdetails" },
    { name: "Employee Details", icon: <FaUserTie />, path: "/manager-employeedetails" },
    { name: "Reports", icon: <FaChartBar />, path: "/manager-reports" },
    { name: "Menu", icon: <FaUtensils />, path: "/manager-menu" },
    { name: "Order History", icon: <FaHistory />, path: "/manager-orderhistory" },
  ];

  // Sample dashboard data
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
        backgroundColor: "#FFA94D",
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
        backgroundColor: ["#FFB347", "#FF8C42", "#FFD166", "#FFA94D"],
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
    <div className="flex min-h-screen bg-orange-50"
     style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.6)), url('https://melrosecollective.net/wp-content/uploads/2014/12/restaurant2.jpg')",
      }}>
      {/* Sidebar */}
      <div className="w-28 bg-white rounded-r-3xl flex flex-col justify-between py-8 shadow-md px-2">
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
              <span className="text-xs text-yellow-700 text-center">{link.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 flex flex-col gap-10">
        <h1 className="text-3xl font-bold text-yellow-800">{activeLink}</h1>

        {activeLink === "Dashboard" && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
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
                  className="bg-white rounded-3xl p-6 shadow-md flex flex-col items-center hover:shadow-lg transition"
                >
                  <span className="text-gray-500 text-sm">{item.label}</span>
                  <span className="text-2xl font-bold text-orange-500">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Charts & Top Dishes */}
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="bg-white rounded-3xl shadow-md p-6 flex-1">
                <h2 className="text-xl font-semibold mb-4 text-orange-500">Employee Sales Performance</h2>
                <Bar
                  data={employeePerformance}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } },
                  }}
                />
              </div>

              <div className="bg-white rounded-3xl shadow-md p-6 flex-1">
                <h2 className="text-xl font-semibold mb-4 text-orange-500">Orders by Category</h2>
                <Pie data={orderByCategory} />
              </div>

              <div className="bg-white rounded-3xl shadow-md p-6 w-full lg:w-1/3">
                <h2 className="text-xl font-semibold mb-4 text-orange-500">Top Dishes</h2>
                <div className="flex flex-col gap-4">
                  {topDishes.map((dish, i) => (
                    <div
                      key={i}
                      className="flex justify-between bg-orange-50 p-4 rounded-xl shadow hover:shadow-lg transition"
                    >
                      <span className="text-gray-800 font-medium">{dish.name}</span>
                      <span className="text-orange-500 font-semibold">{dish.sold} sold</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeLink !== "Dashboard" && (
          <div className="bg-white rounded-3xl shadow-md p-10 text-gray-700 text-center">
            <h2 className="text-2xl font-semibold">This is the {activeLink} page</h2>
            <p className="mt-4">You can add your content here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCoins, FaShoppingCart, FaEye, FaEyeSlash } from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import EmployeeNavbar from "./EmployeeNavbar";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "John Doe",
    id: "EMP001",
    role: "Waiter",
    salary: "₹1200",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a0?auto=format&fit=crop&w=400&q=80",
    login: "johndoe",
    password: "********",
    sales: {
      dailyOrders: 15,
      dailyIncome: 4500,
      dailyGoalOrders: 20,
      dailyGoalIncome: 6000,
      last7DaysOrders: [
        { day: "Mon", orders: 12 },
        { day: "Tue", orders: 18 },
        { day: "Wed", orders: 14 },
        { day: "Thu", orders: 16 },
        { day: "Fri", orders: 20 },
        { day: "Sat", orders: 22 },
        { day: "Sun", orders: 15 },
      ],
      last7DaysIncome: [
        { day: "Mon", income: 3200 },
        { day: "Tue", income: 4000 },
        { day: "Wed", income: 3500 },
        { day: "Thu", income: 4200 },
        { day: "Fri", income: 5000 },
        { day: "Sat", income: 5500 },
        { day: "Sun", income: 4500 },
      ],
    },
  });

  const [formData, setFormData] = useState({ ...employee });
  const [activeSection, setActiveSection] = useState("sales"); // Sales by default
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setEmployee({ ...formData });
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    alert("Logged out!");
    navigate("/");
  };

  const orderProgress = Math.min(
    (employee.sales.dailyOrders / employee.sales.dailyGoalOrders) * 100,
    100
  );
  const incomeProgress = Math.min(
    (employee.sales.dailyIncome / employee.sales.dailyGoalIncome) * 100,
    100
  );

  return (
    <div
      className="flex min-h-screen text-gray-100"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,10,10,0.75), rgba(20,20,20,0.80)), url('https://melrosecollective.net/wp-content/uploads/2014/12/restaurant2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <EmployeeNavbar />

      <main className="flex-1 flex flex-col py-10 px-12 gap-10 overflow-y-auto">
        <h1 className="text-4xl font-serif text-[#c7a86e] drop-shadow-lg tracking-wide">
          👤 Profile
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Profile Card */}
          <div className="lg:w-1/3 flex flex-col items-center gap-6">
            <div className="bg-[#1f1f1f]/90 border border-[#c7a86e]/40 rounded-3xl shadow-lg p-6 flex flex-col items-center w-full hover:shadow-[#c7a86e]/50 transition">
              <img
                src={employee.image}
                alt={employee.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-[#c7a86e] shadow-md mb-4"
              />
              <h2 className="text-xl font-bold text-[#c7a86e]">{employee.name}</h2>
              <p className="text-gray-400">{employee.role}</p>
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
              <div className="bg-[#1f1f1f]/80 p-4 rounded-2xl shadow hover:shadow-[#c7a86e]/40 transition flex flex-col items-center">
                <span className="text-gray-400 text-sm">Employee ID</span>
                <span className="font-semibold text-[#c7a86e]">{employee.id}</span>
              </div>
              <div className="bg-[#1f1f1f]/80 p-4 rounded-2xl shadow hover:shadow-[#c7a86e]/40 transition flex flex-col items-center">
                <span className="text-gray-400 text-sm">Salary</span>
                <span className="font-semibold text-[#c7a86e]">{employee.salary}</span>
              </div>
            </div>
          </div>

          {/* Right Form / Tabs */}
          <div className="lg:flex-1 bg-[#1f1f1f]/90 border border-[#c7a86e]/40 rounded-3xl shadow-lg p-8 h-fit overflow-y-auto">
            <div className="flex justify-start gap-4 mb-6">
              <button
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  activeSection === "personal"
                    ? "bg-[#c7a86e] text-black"
                    : "bg-[#1a1a1a] text-gray-300"
                }`}
                onClick={() => setActiveSection("personal")}
              >
                Personal Info
              </button>
              <button
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  activeSection === "login"
                    ? "bg-[#c7a86e] text-black"
                    : "bg-[#1a1a1a] text-gray-300"
                }`}
                onClick={() => setActiveSection("login")}
              >
                Login & Password
              </button>
              <button
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  activeSection === "sales"
                    ? "bg-[#c7a86e] text-black"
                    : "bg-[#1a1a1a] text-gray-300"
                }`}
                onClick={() => setActiveSection("sales")}
              >
                Sales
              </button>
            </div>

            {/* Personal Info Form */}
            {activeSection === "personal" && (
              <form className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-gray-400 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-[#c7a86e]/40 rounded-xl p-3 bg-[#1a1a1a] text-gray-200 focus:outline-none focus:border-[#c7a86e]"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-2">ID</label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    disabled
                    className="w-full border border-[#c7a86e]/40 rounded-xl p-3 bg-[#1a1a1a] text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-2">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border border-[#c7a86e]/40 rounded-xl p-3 bg-[#1a1a1a] text-gray-200 focus:outline-none focus:border-[#c7a86e]"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-2">Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full border border-[#c7a86e]/40 rounded-xl p-3 bg-[#1a1a1a] text-gray-200 focus:outline-none focus:border-[#c7a86e]"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 bg-[#c7a86e] text-black py-3 rounded-xl font-medium hover:bg-[#bfa374] transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              </form>
            )}

            {/* Login & Password Form */}
            {activeSection === "login" && (
              <form className="grid grid-cols-1 gap-6 relative">
                <div>
                  <label className="block text-gray-400 font-medium mb-2">Login</label>
                  <input
                    type="text"
                    name="login"
                    value={formData.login}
                    onChange={handleChange}
                    className="w-full border border-[#c7a86e]/40 rounded-xl p-3 bg-[#1a1a1a] text-gray-200 focus:outline-none focus:border-[#c7a86e]"
                  />
                </div>
                <div className="relative">
                  <label className="block text-gray-400 font-medium mb-2">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-[#c7a86e]/40 rounded-xl p-3 pr-12 bg-[#1a1a1a] text-gray-200 focus:outline-none focus:border-[#c7a86e]"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 bg-[#c7a86e] text-black py-3 rounded-xl font-medium hover:bg-[#bfa374] transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              </form>
            )}

            {/* Sales Section */}
            {activeSection === "sales" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1f1f1f]/80 p-6 rounded-2xl shadow hover:shadow-[#c7a86e]/40 transition flex flex-col items-center">
                  <FaShoppingCart className="text-[#c7a86e] text-3xl mb-2" />
                  <span className="text-gray-400 text-sm">Today's Orders</span>
                  <span className="font-semibold text-[#c7a86e] text-2xl mb-2">
                    {employee.sales.dailyOrders}
                  </span>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-2 bg-[#c7a86e] rounded-full"
                      style={{ width: `${orderProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-400 text-sm mb-3">
                    Goal: {employee.sales.dailyGoalOrders}
                  </span>
                  <div className="w-full h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={employee.sales.last7DaysOrders}>
                        <defs>
                          <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#c7a86e" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#c7a86e" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" tick={{ fill: "#c7a86e" }} />
                        <YAxis tick={{ fill: "#c7a86e" }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1a1a1a", border: "none", color: "#fff" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="orders"
                          stroke="#c7a86e"
                          fill="url(#ordersGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-[#1f1f1f]/80 p-6 rounded-2xl shadow hover:shadow-[#c7a86e]/40 transition flex flex-col items-center">
                  <FaCoins className="text-[#c7a86e] text-3xl mb-2" />
                  <span className="text-gray-400 text-sm">Today's Income</span>
                  <span className="font-semibold text-[#c7a86e] text-2xl mb-2">
                    ₹{employee.sales.dailyIncome}
                  </span>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-2 bg-[#c7a86e] rounded-full"
                      style={{ width: `${incomeProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-400 text-sm mb-3">
                    Goal: ₹{employee.sales.dailyGoalIncome}
                  </span>
                  <div className="w-full h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={employee.sales.last7DaysIncome}>
                        <defs>
                          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#c7a86e" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#c7a86e" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" tick={{ fill: "#c7a86e" }} />
                        <YAxis tick={{ fill: "#c7a86e" }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1a1a1a", border: "none", color: "#fff" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="income"
                          stroke="#c7a86e"
                          fill="url(#incomeGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

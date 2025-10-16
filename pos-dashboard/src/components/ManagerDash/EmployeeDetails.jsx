import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUsers,
  FaUserTie,
  FaUtensils,
  FaHistory,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaUtensils as FaChef,
  FaConciergeBell as FaWaiter,
  FaUserTie as FaManager,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function EmployeeDetails() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Employee Details");
  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "John Doe",
      role: "Chef",
      salary: 40000,
      phone: "9876543210",
      totalOrders: 120,
      totalRevenue: 250000,
    },
    {
      id: "EMP002",
      name: "Alice Smith",
      role: "Waiter",
      salary: 25000,
      phone: "9876541230",
      totalOrders: 90,
      totalRevenue: 150000,
    },
    {
      id: "EMP003",
      name: "Bob Johnson",
      role: "Manager",
      salary: 50000,
      phone: "9876512340",
      totalOrders: 50,
      totalRevenue: 100000,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({ id: "", name: "", role: "", salary: "", phone: "" });

  const navLinks = [
    { name: "Dashboard", icon: <FaHome />, path: "/manager-dash" },
    { name: "Customer Details", icon: <FaUsers />, path: "/manager-custdetails" },
    { name: "Employee Details", icon: <FaUserTie />, path: "/manager-employeedetails" },
    { name: "Menu", icon: <FaUtensils />, path: "/manager-menu" },
    { name: "Order History", icon: <FaHistory />, path: "/manager-orderhistory" },
  ];

  const openAddModal = () => {
    setFormData({ id: "", name: "", role: "", salary: "", phone: "" });
    setModalType("add");
    setShowModal(true);
  };

  const openEditModal = (emp) => {
    setFormData(emp);
    setSelectedEmployee(emp);
    setModalType("edit");
    setShowModal(true);
  };

  const handleDelete = (empId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((e) => e.id !== empId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "add") setEmployees([...employees, formData]);
    else if (modalType === "edit")
      setEmployees(employees.map((e) => (e.id === selectedEmployee.id ? formData : e)));
    setShowModal(false);
  };

  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case "chef":
        return <FaChef className="text-[#c7a86e] text-4xl animate-pulse" />;
      case "waiter":
        return <FaWaiter className="text-[#c7a86e] text-4xl animate-pulse" />;
      case "manager":
        return <FaManager className="text-[#c7a86e] text-4xl animate-pulse" />;
      default:
        return <FaUserTie className="text-[#c7a86e] text-4xl animate-pulse" />;
    }
  };

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
          <h1 className="text-3xl font-semibold text-[#c7a86e]">Employee Details</h1>
          <button
            className="flex items-center gap-2 bg-[#c7a86e] text-black px-4 py-2 rounded-xl shadow hover:bg-[#bfa374] transition"
            onClick={openAddModal}
          >
            <FaPlus /> Add Employee
          </button>
        </div>

      {/* Employee Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {employees.map((emp) => (
    <div
      key={emp.id}
      className="relative bg-[#1f1f1f]/80 backdrop-blur-md border border-[#c7a86e]/20 
                 rounded-3xl p-6 flex flex-col items-center text-center transition 
                 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-[#c7a86e]/50"
    >
      {/* Role Icon */}
      <div className="mb-4 animate-pulse">{getRoleIcon(emp.role)}</div>

      {/* Name & Role */}
      <h2 className="text-xl font-bold text-gray-200">{emp.name}</h2>
      <p className="text-gray-400 text-sm mb-4">{emp.role}</p>

      {/* Sales & Revenue Section */}
      <div className="w-full bg-[#2a2a2a]/70 rounded-2xl p-4 flex flex-col gap-3 shadow-inner">
        <div className="flex justify-between text-gray-300">
          <span>Total Orders:</span>
          <span className="font-semibold text-cyan-400">{emp.totalOrders}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Total Revenue:</span>
          <span className="font-semibold text-yellow-400">₹{emp.totalRevenue}</span>
        </div>
        {/* Progress Bars */}
        <div className="mt-2 w-full flex flex-col gap-2">
          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((emp.totalRevenue / 500000) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((emp.totalOrders / 200) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Hover Info */}
      <div className="mt-4 w-full opacity-0 hover:opacity-100 transition-opacity duration-300 text-gray-300 text-sm">
        <p>ID: {emp.id}</p>
        <p>Salary: ₹{emp.salary}</p>
        <p>Phone: {emp.phone}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4 w-full">
        <button
          className="flex-1 flex items-center justify-center gap-2 bg-[#c7a86e] text-black py-2 rounded-2xl 
                     hover:bg-[#bfa374] hover:shadow-lg hover:shadow-[#c7a86e]/50 transition-all"
          onClick={() => openEditModal(emp)}
        >
          <FaEdit /> Edit
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-2xl 
                     hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/50 transition-all"
          onClick={() => handleDelete(emp.id)}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  ))}
</div>

      </main>
{/* Modal */}
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div className="relative w-11/12 md:w-1/2 p-8 rounded-3xl 
                    bg-[#1f1f1f]/90 backdrop-blur-md border border-[#c7a86e]/30
                    shadow-2xl transform transition-all scale-90 animate-[modalAppear_0.3s_ease-out]">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-[#c7a86e] text-xl transition-transform hover:scale-125"
        onClick={() => setShowModal(false)}
      >
        <FaTimes />
      </button>

      <h2 className="text-2xl font-bold text-[#c7a86e] mb-6 text-center">
        {modalType === "add" ? "Add Employee" : "Edit Employee"}
      </h2>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {["id", "name", "role", "salary", "phone"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-gray-400 mb-1 capitalize">{field}</label>
            <input
              type={field === "salary" ? "number" : "text"}
              placeholder={`Enter ${field}`}
              value={formData[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
              className="w-full p-4 rounded-2xl border border-gray-600 
                         bg-[#1a1a1a]/70 text-gray-200 placeholder-gray-400
                         focus:outline-none focus:border-[#c7a86e] focus:ring-1 focus:ring-[#c7a86e]
                         transition-all shadow-md hover:shadow-[#c7a86e]/50"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 bg-[#c7a86e] text-black py-3 rounded-2xl font-semibold
                     hover:bg-[#bfa374] hover:shadow-lg hover:shadow-[#c7a86e]/50
                     transition-all text-lg"
        >
          {modalType === "add" ? "Add Employee" : "Update Employee"}
        </button>
      </form>
    </div>

    <style>
      {`
        @keyframes modalAppear {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-[modalAppear_0\\.3s_ease-out] {
          animation: modalAppear 0.3s ease-out forwards;
        }
      `}
    </style>
  </div>
)}

    </div>
  );
}

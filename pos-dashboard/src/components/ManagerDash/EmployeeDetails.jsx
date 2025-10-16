import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaUserTie,
  FaChartBar,
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
    { id: "EMP001", name: "John Doe", role: "Chef", salary: 40000, phone: "9876543210" },
    { id: "EMP002", name: "Alice Smith", role: "Waiter", salary: 25000, phone: "9876541230" },
    { id: "EMP003", name: "Bob Johnson", role: "Manager", salary: 50000, phone: "9876512340" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" or "edit"
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({ id: "", name: "", role: "", salary: "", phone: "" });

  const navLinks = [
    { name: "Dashboard", icon: <FaHome />, path: "/manager-dash" },
    { name: "Customer Details", icon: <FaUsers />, path: "/manager-custdetails" },
    { name: "Employee Details", icon: <FaUserTie />, path: "/manager-employeedetails" },
    // { name: "Reports", icon: <FaChartBar />, path: "/manager-reports" },
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
    if (modalType === "add") {
      setEmployees([...employees, formData]);
    } else if (modalType === "edit") {
      setEmployees(
        employees.map((e) => (e.id === selectedEmployee.id ? formData : e))
      );
    }
    setShowModal(false);
  };

  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case "chef":
        return <FaChef className="text-[#c7a86e] text-3xl" />;
      case "waiter":
        return <FaWaiter className="text-[#c7a86e] text-3xl" />;
      case "manager":
        return <FaManager className="text-[#c7a86e] text-3xl" />;
      default:
        return <FaUserTie className="text-[#c7a86e] text-3xl" />;
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
              className="relative bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-3xl p-6 flex flex-col items-center text-center transition transform hover:-translate-y-2 hover:shadow-[#c7a86e]/40"
            >
              <div className="mb-4">{getRoleIcon(emp.role)}</div>
              <h2 className="text-xl font-bold text-gray-200">{emp.name}</h2>
              <p className="text-gray-400 text-sm">{emp.role}</p>

              {/* Hover Info */}
              <div className="mt-4 w-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-gray-300 text-sm">ID: {emp.id}</p>
                <p className="text-gray-300 text-sm">Salary: ₹{emp.salary}</p>
                <p className="text-gray-300 text-sm">Phone: {emp.phone}</p>
              </div>

              <div className="flex gap-2 mt-4 w-full">
                <button
                  className="flex-1 flex items-center justify-center gap-2 bg-[#c7a86e] text-black py-2 rounded-xl hover:bg-[#bfa374] transition"
                  onClick={() => openEditModal(emp)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition"
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
          <div className="bg-[#1a1a1a]/95 border border-[#c7a86e]/40 rounded-3xl w-11/12 md:w-1/2 p-6 shadow-2xl relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-[#c7a86e]"
              onClick={() => setShowModal(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold text-[#c7a86e] mb-4">
              {modalType === "add" ? "Add Employee" : "Edit Employee"}
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {["id", "name", "role", "salary", "phone"].map((field) => (
                <input
                  key={field}
                  type={field === "salary" ? "number" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.05)] text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#c7a86e]"
                  required
                />
              ))}
              <button
                type="submit"
                className="bg-[#c7a86e] text-black py-3 rounded-xl font-medium hover:bg-[#bfa374] transition"
              >
                {modalType === "add" ? "Add Employee" : "Update Employee"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

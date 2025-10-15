import React, { useState } from "react";
import { FaHome, FaUsers, FaUserTie, FaChartBar, FaUtensils, FaHistory, FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function EmployeeDetails() {
    const navigate=useNavigate();
     const [activeLink, setActiveLink] = useState("Dashboard");
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
      { name: "Reports", icon: <FaChartBar />, path: "/manager-reports" },
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Employee Details</h1>
          <button
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl shadow hover:bg-orange-600 transition"
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
              className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition flex flex-col gap-2"
            >
              <h2 className="text-lg font-bold text-gray-800">{emp.name}</h2>
              <p className="text-gray-500 text-sm">ID: {emp.id}</p>
              <p className="text-gray-500 text-sm">Role: {emp.role}</p>
              <p className="text-gray-500 text-sm">Salary: ₹{emp.salary}</p>
              <p className="text-gray-500 text-sm">Phone: {emp.phone}</p>
              <div className="flex gap-2 mt-3">
                <button
                  className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 text-white py-2 rounded-xl hover:bg-yellow-500 transition"
                  onClick={() => openEditModal(emp)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
                  onClick={() => handleDelete(emp.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl w-11/12 md:w-1/2 p-6 shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {modalType === "add" ? "Add Employee" : "Edit Employee"}
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Employee ID"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-400"
                required
              />
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-400"
                required
              />
              <input
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-400"
                required
              />
              <input
                type="number"
                placeholder="Salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-400"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-400"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition"
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

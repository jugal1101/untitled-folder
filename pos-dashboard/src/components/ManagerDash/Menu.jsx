import React, { useState } from "react";
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
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Menu");
  const [menuItems, setMenuItems] = useState([
    {
      id: "P001",
      title: "American Favorite",
      description: "Classic cheesy pan pizza delight.",
      price: 4.87,
      img: "https://images.unsplash.com/photo-1601924582971-d2e1a4a3e4be?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "P002",
      title: "Chicken Mushroom",
      description: "Creamy mushroom & grilled chicken.",
      price: 5.87,
      img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "P003",
      title: "Favorite Cheese",
      description: "Loaded with 3 types of cheese.",
      price: 6.57,
      img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4b?auto=format&fit=crop&w=400&q=80",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    img: "",
  });

  const navLinks = [
    { name: "Dashboard", icon: <FaHome />, path: "/manager-dash" },
    { name: "Customer Details", icon: <FaUsers />, path: "/manager-custdetails" },
    { name: "Employee Details", icon: <FaUserTie />, path: "/manager-employeedetails" },
    { name: "Menu", icon: <FaUtensils />, path: "/manager-menu" },
    { name: "Order History", icon: <FaHistory />, path: "/manager-orderhistory" },
  ];

  const openAddModal = () => {
    setFormData({ id: "", title: "", description: "", price: "", img: "" });
    setModalType("add");
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setFormData(item);
    setSelectedItem(item);
    setModalType("edit");
    setShowModal(true);
  };

  const handleDelete = (itemId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setMenuItems(menuItems.filter((item) => item.id !== itemId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "add") {
      setMenuItems([...menuItems, formData]);
    } else if (modalType === "edit") {
      setMenuItems(
        menuItems.map((item) => (item.id === selectedItem.id ? formData : item))
      );
    }
    setShowModal(false);
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
          <h1 className="text-3xl font-semibold text-[#c7a86e]">Restaurant Menu</h1>
          <button
            className="flex items-center gap-2 bg-[#c7a86e] text-black px-4 py-2 rounded-xl shadow hover:bg-[#bfa374] transition"
            onClick={openAddModal}
          >
            <FaPlus /> Add Product
          </button>
        </div>

        {/* Simple Vertical Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#1f1f1f]/80 border border-[#c7a86e]/30 rounded-3xl p-5 flex flex-col items-center gap-4 shadow-lg"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-32 h-32 object-cover rounded-full border-2 border-[#c7a86e] shadow-md"
              />
              <h3 className="text-xl font-bold text-[#c7a86e] text-center">{item.title}</h3>
              <p className="text-gray-300 text-center text-sm">{item.description}</p>
              <span className="text-lg font-semibold text-[#c7a86e]">${item.price}</span>
              <div className="flex gap-2 w-full mt-2">
                <button
                  className="flex-1 flex items-center justify-center gap-2 bg-[#c7a86e] text-black py-2 rounded-xl hover:bg-[#bfa374] transition"
                  onClick={() => openEditModal(item)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition"
                  onClick={() => handleDelete(item.id)}
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
              {modalType === "add" ? "Add Product" : "Edit Product"}
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {["id", "title", "description", "price", "img"].map((field) => (
                <input
                  key={field}
                  type={field === "price" ? "number" : "text"}
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
                {modalType === "add" ? "Add Product" : "Update Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

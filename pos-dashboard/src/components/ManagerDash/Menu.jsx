import React, { useState } from "react";
import { FaHome, FaUsers, FaUserTie, FaChartBar, FaUtensils, FaHistory, FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
    const navigate=useNavigate();
     const [activeLink, setActiveLink] = useState("Dashboard");
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
  const [modalType, setModalType] = useState("add"); // "add" or "edit"
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
    { name: "Reports", icon: <FaChartBar />, path: "/manager-reports" },
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
          <h1 className="text-3xl font-bold text-gray-800">Restaurant Menu</h1>
          <button
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl shadow hover:bg-orange-600 transition"
            onClick={openAddModal}
          >
            <FaPlus /> Add Product
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-md p-5 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="flex justify-center -mt-10">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{item.description}</p>
              </div>
              <div className="flex items-center justify-between mt-5">
                <span className="text-lg font-bold text-orange-500">${item.price}</span>
                <div className="flex gap-2">
                  <button
                    className="text-yellow-400 hover:text-yellow-500 transition"
                    onClick={() => openEditModal(item)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600 transition"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
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
              {modalType === "add" ? "Add Product" : "Edit Product"}
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Product ID"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-400"
                required
              />
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-400"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-400"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-400"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.img}
                onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-400"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition"
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

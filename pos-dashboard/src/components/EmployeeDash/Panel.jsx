import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaTable,
  FaUtensils,
  FaClipboardList,
  FaChartBar,
  FaBell,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
  FaShoppingCart,
  FaClock,
} from "react-icons/fa";
import {useNavigate} from "react-router-dom"

export default function RestaurantUI() {
  const [currentDate, setCurrentDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-IN", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const menu = [
    {
      title: "American Favorite",
      desc: "Classic cheesy pan pizza delight.",
      price: 4.87,
      img: "https://images.unsplash.com/photo-1601924582971-d2e1a4a3e4be?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Chicken Mushroom",
      desc: "Creamy mushroom & grilled chicken.",
      price: 5.87,
      img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Favorite Cheese",
      desc: "Loaded with 3 types of cheese.",
      price: 6.57,
      img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4b?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Meat Lovers",
      desc: "Juicy meat and cheese overload.",
      price: 6.37,
      img: "https://images.unsplash.com/photo-1601924928357-4b7c593f0a5d?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Super Supreme",
      desc: "Loaded with toppings and cheese.",
      price: 5.75,
      img: "https://images.unsplash.com/photo-1603079843145-4a4d1b8a9a25?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Ultimate Cheese",
      desc: "Cheese burst with crisp crust.",
      price: 4.27,
      img: "https://images.unsplash.com/photo-1617196034796-73b56c48f1e9?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="flex h-screen bg-[#f8f5f2] p-6 rounded-3xl shadow-xl">
      {/* Sidebar */}
      <div className="w-20 bg-white rounded-3xl flex flex-col items-center py-10 gap-8 shadow-md">
        <FaHome className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" onClick={()=>{navigate("/")}}/>
        <FaShoppingCart className="text-orange-400 text-2xl" onClick={()=>{navigate("/order")}}/>
        <FaClock className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" onClick={()=>{navigate("/history")}}/>
        <FaChartBar className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" onClick={()=>{navigate("/reports")}}/>
        <FaCog className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" onClick={()=>{navigate("/profile")}}/>
        <FaUserCircle className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer mt-auto" />
        <FaSignOutAlt className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            🍕 Golden Bite Restaurant
          </h1>
          <div className="text-gray-500 font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            {currentDate}
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search category or menu"
            className="w-1/2 p-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none"
          />
          <span className="text-sm text-gray-500">5 items out of stocks</span>
        </div>

        {/* Categories */}
        <div className="flex gap-4 mb-6">
          {["Pizza", "Burger", "Rice", "Snacks", "Drinks"].map((cat, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
                cat === "Pizza"
                  ? "bg-orange-100 text-orange-500"
                  : "bg-white text-gray-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🍕 Items Grid (Inserted card UI with orange theme) */}
        <h2 className="text-lg font-semibold mb-4">Choose Pizza</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {menu.map((item, idx) => (
            <div
              key={idx}
              className="border rounded-2xl p-5 flex flex-col justify-between bg-white shadow-sm hover:shadow-[0_0_15px_rgba(255,165,0,0.4)] transition-transform hover:scale-[1.03]"
              style={{ borderColor: "#FDBA74" }}
            >
              {/* Image */}
              <div className="flex justify-center -mt-10">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md"
                />
              </div>

              {/* Info */}
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2">{item.desc}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-5">
                <div className="text-lg font-bold text-orange-500">
                  ${item.price.toFixed(2)}
                </div>

                <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-orange-500 text-white font-medium text-sm shadow-md hover:bg-orange-600 hover:shadow-[0_0_8px_rgba(255,165,0,0.6)] transition">
                  <FaShoppingCart className="text-sm" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-96 bg-white rounded-3xl p-6 shadow-md ml-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Current Orders</h3>
            <span className="text-sm text-gray-400">#907653</span>
          </div>

          <div className="flex gap-3 mb-4">
            <button className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-sm font-medium">
              Dine In
            </button>
            <button className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm font-medium">
              Take Away
            </button>
          </div>

          <div className="space-y-4 overflow-y-auto h-[60vh] pr-2">
            <div className="flex justify-between items-center text-sm">
              <span>Orange Juice</span>
              <span>$2.87</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>American Favorite</span>
              <span>$4.87</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Super Supreme</span>
              <span>$5.75</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Favorite Cheese</span>
              <span>$6.57</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Items(7)</span>
            <span>$28.67</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Tax (10%)</span>
            <span>$2.86</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mb-3">
            <span>Total</span>
            <span>$31.53</span>
          </div>
          <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600">
            Print Bills
          </button>
        </div>
      </div>
    </div>
  );
}

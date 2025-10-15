import React, { useState } from "react";
import { FaShoppingCart, FaHome, FaClock, FaChartBar, FaCog, FaUserCircle, FaSignOutAlt, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "tailwindcss";
export default function OrderPage() {
  const navigate = useNavigate();

  const [order, setOrder] = useState([
    { name: "American Favorite", qty: 1, price: 4.87 },
    { name: "Super Supreme", qty: 2, price: 5.75 },
    { name: "Favorite Cheese", qty: 1, price: 6.57 },
  ]);

  const total = order.reduce((sum, item) => sum + item.qty * item.price, 0);

  const incrementQty = (index) => {
    const updated = [...order];
    updated[index].qty += 1;
    setOrder(updated);
  };

  const decrementQty = (index) => {
    const updated = [...order];
    if (updated[index].qty > 1) updated[index].qty -= 1;
    setOrder(updated);
  };

  const removeItem = (index) => {
    const updated = [...order];
    updated.splice(index, 1);
    setOrder(updated);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-orange-50 to-orange-100">
      {/* Sidebar */}
      <div className="w-20 bg-white rounded-3xl flex flex-col items-center py-10 gap-8 shadow-md">
        <FaHome className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" onClick={() => navigate("/")} />
        <FaShoppingCart className="text-orange-400 text-2xl" />
        <FaClock className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" onClick={() => navigate("/history")} />
        <FaChartBar className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" onClick={() => navigate("/reports")} />
        <FaCog className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" onClick={() => navigate("/profile")} />
        <FaUserCircle className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer mt-auto" />
        <FaSignOutAlt className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col py-10 px-6 space-y-10">
        {/* Breadcrumb / Header */}
        <div>
          <p className="text-sm text-gray-400 mb-1">Home &gt; Orders &gt; Confirm Order</p>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🧾 Confirm Your Order</h1>
          <p className="text-gray-500">Fill in the customer details below</p>
        </div>

        {/* Form & Order Summary: side-by-side on large screens */}
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Form Section */}
          <div className="flex-1 bg-white rounded-3xl shadow-md p-8 space-y-6">
            <h2 className="text-xl font-semibold text-orange-500">Customer Details</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Customer ID</label>
                <input type="text" placeholder="Enter ID" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Name</label>
                <input type="text" placeholder="Enter Name" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Table Number</label>
                <input type="number" placeholder="Table No." className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
                <input type="text" placeholder="Enter Phone Number" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-orange-400" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                <textarea rows="3" placeholder="Enter Address" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-orange-400"></textarea>
              </div>
            </form>

            {/* Order Type Badges */}
            <div className="flex gap-4 mt-4">
              <button className="bg-orange-100 text-orange-500 px-4 py-1 rounded-full text-sm font-medium">Dine In</button>
              <button className="bg-gray-100 text-gray-500 px-4 py-1 rounded-full text-sm font-medium">Take Away</button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 bg-white rounded-3xl shadow-md p-6 flex flex-col justify-between relative">
            <h2 className="text-xl font-semibold text-orange-500 mb-4 flex items-center gap-2">
              <FaShoppingCart /> Order Summary
            </h2>

            <div className="divide-y divide-gray-200 mb-4 max-h-[60vh] overflow-y-auto">
              {order.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 text-gray-700 hover:bg-orange-50 rounded-lg px-2 transition">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      Qty: {item.qty}
                      <button onClick={() => incrementQty(index)} className="bg-orange-200 p-1 rounded hover:bg-orange-300">
                        <FaPlus className="text-xs" />
                      </button>
                      <button onClick={() => decrementQty(index)} className="bg-orange-200 p-1 rounded hover:bg-orange-300">
                        <FaMinus className="text-xs" />
                      </button>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-orange-500">${(item.qty * item.price).toFixed(2)}</span>
                    <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-semibold text-gray-800 mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Sticky Confirm Button */}
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium shadow-md transition sticky bottom-0">
              Confirm Order ✅
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

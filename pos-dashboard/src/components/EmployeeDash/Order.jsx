import React, { useState } from "react";
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import EmployeeNavbar from "../EmployeeDash/EmployeeNavbar";

export default function OrderPage() {
  const [order, setOrder] = useState([
    { name: "American Favorite", qty: 1, price: 487 },
    { name: "Super Supreme", qty: 2, price: 575 },
    { name: "Favorite Cheese", qty: 1, price: 657 },
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
    <div
      className="flex min-h-screen text-gray-100 relative"
      style={{
        backgroundImage: `
          radial-gradient(circle at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 100%),
          url('https://melrosecollective.net/wp-content/uploads/2014/12/restaurant2.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background 0.5s ease-in-out",
      }}
    >
      {/* 🧭 Navbar */}
      <EmployeeNavbar />

      {/* 💫 Centered Main Container */}
      <div className="flex-1 flex justify-center items-center relative z-10 ml-24 p-6">
        <div className="bg-[#1a1a1a]/90 border border-[#c7a86e]/40 rounded-3xl shadow-2xl backdrop-blur-xl p-10 flex flex-col lg:flex-row gap-10 max-w-6xl w-full">
          
          {/* 🧾 Left Side — Form */}
          <div className="flex-1 space-y-6">
            <h2
              className="text-3xl font-semibold text-[#c7a86e] border-b border-[#c7a86e]/30 pb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Customer Details
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#c7a86e]/80 mb-2">
                  Customer ID
                </label>
                <input
                  type="text"
                  placeholder="Enter ID"
                  className="w-full bg-transparent border border-[#c7a86e]/30 text-gray-300 rounded-xl p-3 focus:border-[#c7a86e] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#c7a86e]/80 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="w-full bg-transparent border border-[#c7a86e]/30 text-gray-300 rounded-xl p-3 focus:border-[#c7a86e] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#c7a86e]/80 mb-2">
                  Table Number
                </label>
                <input
                  type="number"
                  placeholder="Table No."
                  className="w-full bg-transparent border border-[#c7a86e]/30 text-gray-300 rounded-xl p-3 focus:border-[#c7a86e] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#c7a86e]/80 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  className="w-full bg-transparent border border-[#c7a86e]/30 text-gray-300 rounded-xl p-3 focus:border-[#c7a86e] outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#c7a86e]/80 mb-2">
                  Address
                </label>
                <textarea
                  rows="3"
                  placeholder="Enter Address"
                  className="w-full bg-transparent border border-[#c7a86e]/30 text-gray-300 rounded-xl p-3 focus:border-[#c7a86e] outline-none"
                ></textarea>
              </div>
            </form>

            {/* 🍽️ Dine / Takeaway Options */}
            <div className="flex gap-4 mt-2">
              <button className="bg-[#c7a86e]/20 border border-[#c7a86e]/50 text-[#c7a86e] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#c7a86e]/40 hover:text-black transition">
                Dine In
              </button>
              <button className="bg-transparent border border-[#c7a86e]/50 text-[#c7a86e]/80 px-5 py-2 rounded-full text-sm font-medium hover:bg-[#c7a86e]/30 hover:text-black transition">
                Take Away
              </button>
            </div>
          </div>

          {/* 🛒 Right Side — Order Summary */}
          <div className="w-full lg:w-96 bg-[#1f1f1f]/80 border border-[#c7a86e]/40 rounded-3xl p-6 shadow-lg flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-[#c7a86e] mb-4 flex items-center gap-2 border-b border-[#c7a86e]/30 pb-2">
              <FaShoppingCart /> Order Summary
            </h2>

            <div className="divide-y divide-[#c7a86e]/20 mb-4 max-h-[45vh] overflow-y-auto">
              {order.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 text-gray-300 hover:bg-[#2a2a2a]/70 rounded-lg px-2 transition"
                >
                  <div>
                    <p className="font-medium text-[#c7a86e]">{item.name}</p>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      Qty: {item.qty}
                      <button
                        onClick={() => incrementQty(index)}
                        className="bg-[#c7a86e]/20 p-1 rounded hover:bg-[#c7a86e]/40"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                      <button
                        onClick={() => decrementQty(index)}
                        className="bg-[#c7a86e]/20 p-1 rounded hover:bg-[#c7a86e]/40"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#c7a86e]">
                      ₹{(item.qty * item.price).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 💰 Total */}
            <div className="border-t border-[#c7a86e]/30 pt-4 flex justify-between text-lg font-semibold text-[#c7a86e] mb-4">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            {/* ✅ Confirm Button */}
            <button className="w-full bg-[#c7a86e] hover:bg-[#bfa374] text-black py-3 rounded-xl font-semibold shadow-md transition">
              Confirm Order ✅
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

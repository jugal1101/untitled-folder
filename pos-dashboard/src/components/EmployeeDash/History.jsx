import React from "react";
import {
  FaShoppingCart,
  FaHome,
  FaClock,
  FaChartBar,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const navigate = useNavigate();

  // Example bills
  const bills = [
    {
      id: "#1001",
      customerId: "C001",
      customer: "John Doe",
      table: 5,
      payment: "Cash",
      orderType: "Dine In",
      date: "2025-10-14 12:45 PM",
      items: [
        { name: "American Favorite", qty: 1, price: 4.87 },
        { name: "Super Supreme", qty: 2, price: 5.75 },
        { name: "Favorite Cheese", qty: 1, price: 6.57 },
      ],
    },
    {
      id: "#1002",
      customerId: "C002",
      customer: "Jane Smith",
      table: 2,
      payment: "Card",
      orderType: "Take Away",
      date: "2025-10-14 01:15 PM",
      items: [
        { name: "Chicken Mushroom", qty: 1, price: 5.87 },
        { name: "Ultimate Cheese", qty: 2, price: 4.27 },
      ],
    },
    {
      id: "#1003",
      customerId: "C003",
      customer: "Mike Johnson",
      table: 7,
      payment: "UPI",
      orderType: "Dine In",
      date: "2025-10-13 08:30 PM",
      items: [
        { name: "Super Supreme", qty: 3, price: 5.75 },
        { name: "Meat Lovers", qty: 2, price: 6.37 },
      ],
    },
    {
      id: "#1001",
      customerId: "C001",
      customer: "John Doe",
      table: 5,
      payment: "Cash",
      orderType: "Dine In",
      date: "2025-10-14 12:45 PM",
      items: [
        { name: "American Favorite", qty: 1, price: 4.87 },
        { name: "Super Supreme", qty: 2, price: 5.75 },
        { name: "Favorite Cheese", qty: 1, price: 6.57 },
      ],
    },
    {
      id: "#1002",
      customerId: "C002",
      customer: "Jane Smith",
      table: 2,
      payment: "Card",
      orderType: "Take Away",
      date: "2025-10-14 01:15 PM",
      items: [
        { name: "Chicken Mushroom", qty: 1, price: 5.87 },
        { name: "Ultimate Cheese", qty: 2, price: 4.27 },
      ],
    },
    {
      id: "#1003",
      customerId: "C003",
      customer: "Mike Johnson",
      table: 7,
      payment: "UPI",
      orderType: "Dine In",
      date: "2025-10-13 08:30 PM",
      items: [
        { name: "Super Supreme", qty: 3, price: 5.75 },
        { name: "Meat Lovers", qty: 2, price: 6.37 },
      ],
    },
  ];

  const calculateTotal = (items) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );
    const tax = subtotal * 0.1; // 10% tax
    return { subtotal, tax, grandTotal: subtotal + tax };
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-orange-50 to-orange-100">
      {/* Sidebar */}
      <div className="w-20 bg-white rounded-3xl flex flex-col items-center py-10 gap-8 shadow-md">
        <FaHome
          className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <FaShoppingCart
          className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer"
          onClick={() => navigate("/order")}
        />
        <FaClock className="text-orange-400 text-2xl" />
        <FaChartBar
          className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer"
          onClick={() => navigate("/reports")}
        />
        <FaCog
          className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <FaUserCircle className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer mt-auto" />
        <FaSignOutAlt className="text-gray-500 text-2xl hover:text-orange-400 cursor-pointer" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col py-10 px-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📜 Bill History
          </h1>
          <p className="text-gray-500">
            View all bills in receipt-style layout
          </p>
        </div>

        {/* Bills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {bills.map((bill, index) => {
            const { subtotal, tax, grandTotal } = calculateTotal(bill.items);
            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer w-72 h-[500px] flex flex-col justify-between"
              >
                {/* Header */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">
                      {bill.id}
                    </span>
                    <span className="text-sm text-gray-400">{bill.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Customer ID: {bill.customerId}
                  </p>
                  <p className="text-gray-800 font-medium">{bill.customer}</p>
                  <p className="text-gray-600 text-sm">
                    Table: {bill.table} | {bill.orderType} | Payment:{" "}
                    {bill.payment}
                  </p>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto divide-y divide-gray-200 mb-4">
                  {bill.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2">
                      <span>
                        {item.name} x{item.qty}
                      </span>
                      <span>${(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg text-orange-500">
                    <span>Grand Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

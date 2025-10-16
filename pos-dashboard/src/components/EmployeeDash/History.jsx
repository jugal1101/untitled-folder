import React from "react";
import {
  FaShoppingCart,
  FaHome,
  FaClock,
  FaChartBar,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
  FaFilePdf,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import EmployeeNavbar from "./EmployeeNavbar";

export default function HistoryPage() {
  const navigate = useNavigate();

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
        { name: "American Favorite", qty: 1, price: 487 },
        { name: "Super Supreme", qty: 2, price: 575 },
        { name: "Favorite Cheese", qty: 1, price: 657 },
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
        { name: "Chicken Mushroom", qty: 1, price: 587 },
        { name: "Ultimate Cheese", qty: 2, price: 427 },
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
        { name: "Chicken Mushroom", qty: 1, price: 587 },
        { name: "Ultimate Cheese", qty: 2, price: 427 },
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
        { name: "Chicken Mushroom", qty: 1, price: 587 },
        { name: "Ultimate Cheese", qty: 2, price: 427 },
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
        { name: "Chicken Mushroom", qty: 1, price: 587 },
        { name: "Ultimate Cheese", qty: 2, price: 427 },
      ],
    },    {
      id: "#1002",
      customerId: "C002",
      customer: "Jane Smith",
      table: 2,
      payment: "Card",
      orderType: "Take Away",
      date: "2025-10-14 01:15 PM",
      items: [
        { name: "Chicken Mushroom", qty: 1, price: 587 },
        { name: "Ultimate Cheese", qty: 2, price: 427 },
      ],
    },
  ];

  const calculateTotal = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
    const tax = subtotal * 0.1;
    return { subtotal, tax, grandTotal: subtotal + tax };
  };

  const handleDownloadPDF = (bill) => {
    const { subtotal, tax, grandTotal } = calculateTotal(bill.items);
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(199, 168, 110);
    doc.text("🍲 Desi Tadaka - Dil Se Desi", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(12);

    doc.text(`Bill ID: ${bill.id}`, 20, 35);
    doc.text(`Customer: ${bill.customer}`, 20, 42);
    doc.text(`Customer ID: ${bill.customerId}`, 20, 49);
    doc.text(`Table: ${bill.table} | ${bill.orderType}`, 20, 56);
    doc.text(`Payment: ${bill.payment}`, 20, 63);
    doc.text(`Date: ${bill.date}`, 20, 70);

    doc.line(20, 75, 190, 75);

    let y = 85;
    doc.setFont("helvetica", "bold");
    doc.text("Item", 20, y);
    doc.text("Qty", 100, y);
    doc.text("Price", 160, y);
    doc.setFont("helvetica", "normal");

    y += 8;
    bill.items.forEach((item) => {
      doc.text(item.name, 20, y);
      doc.text(item.qty.toString(), 105, y);
      doc.text(`₹${(item.qty * item.price).toFixed(2)}`, 160, y);
      y += 7;
    });

    doc.line(20, y + 2, 190, y + 2);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 130, y);
    y += 7;
    doc.text(`Tax (10%): ₹${tax.toFixed(2)}`, 130, y);
    y += 7;
    doc.text(`Grand Total: ₹${grandTotal.toFixed(2)}`, 130, y);
    y += 20;

    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for visiting Desi Tadaka!", 60, y);
    doc.text("~ Dil Se Desi ❤️", 80, y + 7);

    doc.save(`${bill.customer}_Bill_${bill.id}.pdf`);
  };

  return (
    <div
      className="flex min-h-screen text-gray-100"
      style={{
        backgroundImage: `
          radial-gradient(circle at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.70) 100%),
          url('https://melrosecollective.net/wp-content/uploads/2014/12/restaurant2.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background 0.5s ease-in-out",
      }}
    >
      {/* Sidebar */}
     <EmployeeNavbar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center py-10 px-8 text-center">
        <div className="mb-10">
          <h1
            className="text-5xl font-serif text-[#c7a86e] drop-shadow-lg tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            🍲 Desi Tadaka
          </h1>
          <p
            className="text-gray-400 italic text-sm"
            style={{ fontFamily: "Dancing Script" }}
          >
            ~ Dil Se Desi
          </p>
          <p className="text-gray-500 text-xs mt-2">📜 Bill History</p>
        </div>

        {/* Centered Bills */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
          {bills.map((bill, index) => {
            const { subtotal, tax, grandTotal } = calculateTotal(bill.items);
            return (
              <div
                key={index}
                className="bg-[#1f1f1f]/90 border border-[#c7a86e]/40 rounded-3xl shadow-md hover:shadow-[#c7a86e]/40 p-6 w-72 h-[520px] flex flex-col justify-between transition-transform hover:scale-[1.03] duration-300"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-[#c7a86e]">
                      {bill.id}
                    </span>
                    <span className="text-xs text-gray-400">{bill.date}</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Customer ID: {bill.customerId}
                  </p>
                  <p className="text-[#c7a86e] font-medium">{bill.customer}</p>
                  <p className="text-gray-500 text-xs">
                    Table {bill.table} | {bill.orderType} |{" "}
                    <span className="text-[#c7a86e]">{bill.payment}</span>
                  </p>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto divide-y divide-[#c7a86e]/20 mt-3 mb-3">
                  {bill.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between py-1 text-sm text-gray-300"
                    >
                      <span>
                        {item.name} x{item.qty}
                      </span>
                      <span>₹{(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals + PDF */}
                <div className="border-t border-[#c7a86e]/30 pt-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Tax (10%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-[#c7a86e] text-lg mb-3">
                    <span>Total</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => handleDownloadPDF(bill)}
                    className="w-full bg-[#c7a86e] text-black py-2 rounded-xl font-semibold flex justify-center items-center gap-2 hover:bg-[#d4b76f] transition"
                  >
                    <FaFilePdf /> Download PDF
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

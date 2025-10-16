import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import EmployeeNavbar from "./EmployeeNavbar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function EmployeeReportPage() {
  const employeeName = "John Doe";

  const salesData = [
    { date: "Oct 10", sales: 200 },
    { date: "Oct 11", sales: 300 },
    { date: "Oct 12", sales: 250 },
    { date: "Oct 13", sales: 400 },
    { date: "Oct 14", sales: 350 },
  ];

  const topDishes = [
    { name: "American Favorite", qty: 12 },
    { name: "Super Supreme", qty: 9 },
    { name: "Favorite Cheese", qty: 7 },
  ];

  const summary = {
    totalSales: 1500,
    totalOrders: 45,
    avgOrder: 33.3,
  };

  const handleDownloadPDF = async () => {
    const reportElement = document.getElementById("report-section");
    if (!reportElement) return;

    const originalOverflow = reportElement.style.overflow;
    reportElement.style.overflow = "visible";

    const canvas = await html2canvas(reportElement, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
    });

    reportElement.style.overflow = originalOverflow;

    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Employee_Report.pdf");
  };

  // ✅ Darken background on scroll and hover
  const [isDark, setIsDark] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsDark(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseOpacity = isDark ? 0.55 : 0.35;
  const hoverOpacity = isHover ? 0.7 : baseOpacity;

  return (
    <div
      className="flex min-h-screen text-gray-100 transition-all duration-700"
      style={{
        backgroundImage: `
          radial-gradient(circle at center, rgba(0,0,0,${hoverOpacity}) 40%, rgba(0,0,0,${hoverOpacity + 0.25}) 100%),
          url('https://melrosecollective.net/wp-content/uploads/2014/12/restaurant2.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <EmployeeNavbar />

      <main
        className="flex-1 flex flex-col px-10 py-8 overflow-y-auto"
        id="report-section"
      >
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-[#c7a86e] drop-shadow-lg">
              Employee Performance
            </h1>
            <p className="text-gray-300 mt-1 text-lg">
              Reports & insights for <span className="font-semibold">{employeeName}</span>
            </p>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-[#c7a86e] hover:bg-[#bfa374] text-black font-semibold px-6 py-2 rounded-full shadow-md transition-all"
          >
            <FaDownload /> Download PDF
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { title: "Total Sales", value: `₹${summary.totalSales}` },
            { title: "Total Orders", value: summary.totalOrders },
            { title: "Avg Order Value", value: `₹${summary.avgOrder}` },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1f1f1f]/90 rounded-3xl p-8 text-center shadow-md hover:shadow-[#c7a86e]/30 border-t-4 border-[#c7a86e]"
            >
              <p className="text-gray-400 text-lg">{item.title}</p>
              <p className="text-3xl font-bold text-[#c7a86e] mt-2">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#1f1f1f]/90 rounded-3xl p-6 shadow-md hover:shadow-[#c7a86e]/30 border-l-4 border-[#c7a86e]">
            <h2 className="text-xl font-semibold text-[#c7a86e] mb-4">Sales Over Time</h2>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" stroke="#c7a86e" />
                  <YAxis stroke="#c7a86e" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#2a2a2a", border: "none" }}
                    itemStyle={{ color: "#c7a86e" }}
                  />
                  <Line type="monotone" dataKey="sales" stroke="#c7a86e" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#1f1f1f]/90 rounded-3xl p-6 shadow-md hover:shadow-[#c7a86e]/30 border-l-4 border-[#c7a86e]">
            <h2 className="text-xl font-semibold text-[#c7a86e] mb-4">Top Selling Dishes</h2>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topDishes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#c7a86e" />
                  <YAxis stroke="#c7a86e" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#2a2a2a", border: "none" }}
                    itemStyle={{ color: "#c7a86e" }}
                  />
                  <Legend wrapperStyle={{ color: "#c7a86e" }} />
                  <Bar dataKey="qty" fill="#c7a86e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10">
          <div className="bg-[#1a1a1a]/80 py-4 rounded-lg shadow-inner">
                <p className="text-center text-[#f5e6c8] font-medium text-sm">
      © 2025 Restaurant Employee Dashboard. All rights reserved.
    </p>
          </div>
        </div>
      </main>
    </div>
  );
}

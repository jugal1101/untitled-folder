import React, { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaSearch,
  FaFilter,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import EmployeeNavbar from "../EmployeeDash/EmployeeNavbar";

export default function OrderPage() {
  const [currentDate, setCurrentDate] = useState("");
  const [filterDirection, setFilterDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);

  const [menuItems] = useState([
    {
      id: "P001",
      title: "American Favorite",
      category: "Pizza",
      description: "Classic cheesy pan pizza delight.",
      price: 487,
      img: "https://images.unsplash.com/photo-1601924582971-d2e1a4a3e4be?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "P002",
      title: "Chicken Mushroom",
      category: "Pizza",
      description: "Creamy mushroom & grilled chicken.",
      price: 587,
      img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "P003",
      title: "Favorite Cheese",
      category: "Pizza",
      description: "Loaded with 3 types of cheese.",
      price: 657,
      img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4b?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "P004",
      title: "Paneer Tikka",
      category: "Indian",
      description: "Smoky paneer cubes marinated with spices.",
      price: 420,
      img: "https://images.unsplash.com/photo-1600628422011-1286d3a3dd2d?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "P005",
      title: "Butter Chicken",
      category: "Indian",
      description: "Creamy tomato-based gravy with tender chicken.",
      price: 560,
      img: "https://images.unsplash.com/photo-1633436370567-bdfd2c9e812f?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "P006",
      title: "Gulab Jamun",
      category: "Dessert",
      description: "Soft syrupy milk-solid dumplings served warm.",
      price: 180,
      img: "https://images.unsplash.com/photo-1604908812110-a8b41a4b56f8?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "P007",
      title: "Mango Lassi",
      category: "Drinks",
      description: "Refreshing yogurt-based mango drink.",
      price: 150,
      img: "https://images.unsplash.com/photo-1590080875834-68d84cfb2a3a?auto=format&fit=crop&w=400&q=80",
    },
  ]);

  const categories = ["All", "Indian", "Pizza", "Dessert", "Drinks"];

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

const addToCart = (item) => {
  const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

  if (existingItemIndex !== -1) {
    // 🔹 If item already exists, increase quantity
    const updatedCart = [...cartItems];
    updatedCart[existingItemIndex].quantity += 1;
    setCartItems(updatedCart);
  } else {
    // 🔹 Otherwise, add as a new item with quantity 1
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  }
};



  const handleFilter = () => {
    if (filterDirection === "asc") setFilterDirection("desc");
    else setFilterDirection("asc");
  };

  // ✅ Apply category, search, and price sort
  const filteredItems = menuItems
    .filter(
      (item) =>
        (selectedCategory === "All" ||
          item.category.toLowerCase() === selectedCategory.toLowerCase()) &&
        (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) =>
      filterDirection === "asc" ? a.price - b.price : b.price - a.price
    );

  return (
    <div
      className="flex min-h-screen text-gray-100"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,10,10,0.85), rgba(20,20,20,0.95)), url('https://melrosecollective.net/wp-content/uploads/2014/12/restaurant2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <EmployeeNavbar />

      {/* MAIN */}
      <main className="flex-1 flex flex-col p-10 gap-8 overflow-y-auto">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-[#c7a86e]/40 pb-4">
          <div className="text-center sm:text-left">
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
            <span className="text-xs text-gray-500">{currentDate}</span>
          </div>

          {/* 🔍 Search + Filter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#1f1f1f]/80 border border-[#c7a86e]/40 rounded-full px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-[#c7a86e]/60 transition">
              <FaSearch className="text-[#c7a86e]/80 mr-2" />
              <input
                type="text"
                placeholder="Search by name or category..."
                className="bg-transparent outline-none text-sm w-full text-gray-300 placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={handleFilter}
              className="flex items-center justify-center gap-2 bg-[#1f1f1f]/80 border border-[#c7a86e]/40 px-4 py-2 rounded-full text-[#c7a86e] hover:bg-[#c7a86e]/10 transition"
            >
              <FaFilter />
              {filterDirection === "asc" ? <FaArrowUp /> : <FaArrowDown />}
            </button>
          </div>
        </div>

        {/* ================= CATEGORY FILTER ================= */}
        <div className="flex flex-wrap gap-3 mt-2 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[#c7a86e] text-black shadow-lg"
                  : "bg-[#1f1f1f]/70 border border-[#c7a86e]/40 text-[#c7a86e] hover:bg-[#c7a86e]/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= MENU GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="group relative bg-[#1f1f1f]/90 border border-[#c7a86e]/40 rounded-3xl overflow-hidden shadow-lg hover:shadow-[#c7a86e]/30 hover:scale-[1.02] transition-all duration-300"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:opacity-90 transition"
              />
              <div className="p-5 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-[#c7a86e]">
                    {item.title}
                  </h3>
                  <span className="text-sm text-gray-400">{item.category}</span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {item.description}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-semibold text-[#c7a86e]">
                    ₹{item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center gap-2 text-xs bg-[#c7a86e]/20 text-[#c7a86e] px-3 py-1.5 rounded-full hover:bg-[#c7a86e] hover:text-black transition-all duration-300"
                  >
                    <FaShoppingCart /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= CART SUMMARY ================= */}
      <div className="w-96 bg-[#1f1f1f]/90 rounded-3xl p-6 shadow-md ml-2 mr-3 flex flex-col mt-20 h-screen sticky top-0">
  <h3 className="text-[#c7a86e] font-semibold mb-5 text-lg text-center tracking-wide">
    🛒 Current Orders
  </h3>

  <div className="space-y-4 overflow-y-auto max-h-[75vh] pr-2">
    {cartItems.length === 0 ? (
      <p className="text-gray-400 text-sm text-center">No items in cart.</p>
    ) : (
      cartItems.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between bg-[#2a2a2a]/60 rounded-xl p-3 shadow-sm hover:bg-[#2f2f2f]/80 transition"
        >
          {/* 🖼️ Image */}
          <img
            src={item.img}
            alt={item.title}
            className="w-12 h-12 rounded-lg object-cover border border-[#c7a86e]/30"
          />

          {/* 🧾 Details */}
          <div className="flex-1 px-3">
            <h4 className="text-[#c7a86e] text-sm font-semibold leading-tight">
              {item.title}
            </h4>
            <p className="text-gray-400 text-xs">{item.category || "Pizza"}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-gray-300">
                ₹{(item.price * (item.quantity || 1)).toFixed(2)}
              </span>

              {/* ➕➖ Quantity Controls */}
              <div className="flex items-center bg-[#1a1a1a] rounded-lg">
                <button
                  onClick={() => {
                    if (item.quantity > 1) {
                      const updated = [...cartItems];
                      updated[idx].quantity -= 1;
                      setCartItems(updated);
                    }
                  }}
                  className="px-2 text-[#c7a86e] hover:text-white transition"
                >
                  −
                </button>
                <span className="px-2 text-gray-300 text-sm">
                  {item.quantity || 1}
                </span>
                <button
                  onClick={() => {
                    const updated = [...cartItems];
                    updated[idx].quantity = (updated[idx].quantity || 1) + 1;
                    setCartItems(updated);
                  }}
                  className="px-2 text-[#c7a86e] hover:text-white transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 🗑️ Delete */}
          <button
            onClick={() => setCartItems(cartItems.filter((_, i) => i !== idx))}
            className="text-red-400 hover:text-red-500 text-lg transition"
            title="Remove item"
          >
            ✕
          </button>
        </div>
      ))
    )}
  </div>

  {/* 🧮 Summary */}
  {cartItems.length > 0 && (
    <div className="border-t border-[#c7a86e]/30 pt-4 mt-5">
      <div className="flex justify-between text-gray-300 text-sm mb-1">
        <span>Items ({cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0)})</span>
        <span>
          ₹
          {cartItems
            .reduce((sum, i) => sum + i.price * (i.quantity || 1), 0)
            .toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between text-gray-300 text-sm mb-1">
        <span>Tax (10%)</span>
        <span>
          ₹
          {(
            cartItems.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0) *
            0.1
          ).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between font-semibold text-lg mb-3 text-[#c7a86e]">
        <span>Total</span>
        <span>
          ₹
          {(
            cartItems.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0) *
            1.1
          ).toFixed(2)}
        </span>
      </div>

      <button className="w-full bg-[#c7a86e] text-black py-3 rounded-xl font-semibold hover:bg-[#bfa374] transition">
        Print Bill
      </button>
    </div>
  )}
</div>

    </div>
  );
}

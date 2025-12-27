// src/components/Navbar.jsx
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FiShoppingCart, FiSearch, FiChevronDown } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

import logo from "../assets/FeshloLogo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mensDropdownDesktop, setMensDropdownDesktop] = useState(false);
  const [mensDropdownMobile, setMensDropdownMobile] = useState(false);

  const { cart } = useCart();
  const navigate = useNavigate();

  const linkBase = "block py-2 px-4 text-gray-700 hover:text-black transition";
  const linkActive = "block py-2 px-4 text-black font-semibold";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    {
      label: "Mens",
      dropdown: true,
      subCategories: [
        { label: "Casual Shirts", category: "casual-shirt" },
        { label: "Formal Shirts", category: "formal-shirt" },
      ]
    },
    // { to: "/shop?category=womens", label: "Womens" },
    { to: "/shop?category=watches", label: "Watches" },
    { to: "/contact", label: "Contact" },
  ];

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const results = searchTerm
    ? products.filter(
        (p) =>
          String(p.code).toLowerCase() === searchTerm.toLowerCase() ||
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex items-center justify-between h-16">

          {/* ---------- Mobile Layout ---------- */}
          <div className="flex w-full items-center justify-between md:hidden">
            {/* Left: Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-700 hover:text-black"
            >
              {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>

            {/* Center: Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <img src={logo} alt="Feshlo Logo" className="h-10 w-auto" />
            </Link>

            {/* Right: Search + Cart */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-700 hover:text-black"
              >
                <FiSearch size={22} />
              </button>

              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-black"
              >
                <FiShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* ---------- Desktop Layout ---------- */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Left: Logo */}
            <Link to="/">
              <img src={logo} alt="Feshlo Logo" className="h-10 w-auto" />
            </Link>

            {/* Center: Menu */}
            <div className="flex items-center gap-4 relative">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() => setMensDropdownDesktop(!mensDropdownDesktop)}
                      className="py-2 px-4 text-gray-600 hover:text-black flex items-center gap-1"
                    >
                      {link.label}{" "}
                      <FiChevronDown
                        className={`transition-transform duration-200 ${mensDropdownDesktop ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mensDropdownDesktop && (
                      <div className="absolute top-full left-0 mt-1 w-40 bg-white border shadow-md z-50">
                        {link.subCategories.map((sub) => (
                          <button
                            key={sub.category}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                            onClick={() => {
                              navigate(`/shop?category=${sub.category}`);
                              setMensDropdownDesktop(false);
                            }}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) => (isActive ? linkActive : linkBase)}
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </div>

            {/* Right: Search + Cart */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-700 hover:text-black"
              >
                <FiSearch size={22} />
              </button>

              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-black"
              >
                <FiShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>

        {/* ---------- Search Input ---------- */}
        {searchOpen && (
          <div className="absolute top-16 left-0 w-full bg-white border-b shadow-md p-3 z-40">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                autoFocus
              />
            </form>
            {searchTerm && (
              <div className="mt-2 bg-white rounded shadow max-h-60 overflow-y-auto">
                {results.length > 0 ? (
                  results.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        navigate(`/shop?search=${encodeURIComponent(p.name)}`);
                        setSearchOpen(false);
                        setSearchTerm("");
                      }}
                      className="w-full text-left block p-2 border-b last:border-none hover:bg-gray-100"
                    >
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-gray-500">Code: {p.code}</p>
                    </button>
                  ))
                ) : (
                  <p className="p-2 text-gray-500">No product found</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* ---------- Mobile Menu ---------- */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="flex flex-col border-t border-gray-200">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="border-t border-gray-200">
                  <button
                    onClick={() => setMensDropdownMobile(!mensDropdownMobile)}
                    className="w-full text-left px-4 py-2 flex items-center justify-between"
                  >
                    {link.label}{" "}
                    <FiChevronDown
                      className={`transition-transform duration-200 ${mensDropdownMobile ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mensDropdownMobile && (
                    <div className="pl-4">
                      {link.subCategories.map((sub) => (
                        <button
                          key={sub.category}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            navigate(`/shop?category=${sub.category}`);
                            setMensDropdownMobile(false);
                            setMenuOpen(false);
                          }}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => (isActive ? linkActive : linkBase)}
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}




// // src/components/Navbar.jsx
// import { useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { HiMenu, HiX } from "react-icons/hi";
// import { FiShoppingCart, FiSearch, FiChevronDown } from "react-icons/fi";
// import { useCart } from "../context/CartContext";
// import { products } from "../data/products";

// import logo from "../assets/FeshloLogo.png";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [mensDropdownDesktop, setMensDropdownDesktop] = useState(false);
//   const [mensDropdownMobile, setMensDropdownMobile] = useState(false);

//   const { cart } = useCart();
//   const navigate = useNavigate();

//   const linkBase = "block py-2 px-4 text-gray-700 hover:text-black transition";
//   const linkActive = "block py-2 px-4 text-black font-semibold";

//   const navLinks = [
//     { to: "/", label: "Home" },
//     { to: "/shop", label: "Shop" },
//     { label: "Mens", dropdown: true, subCategories: [
//       { label: "Shirts", category: "shirts" },
//       { label: "stitched", category: "mens-stitched" },
//       { label: "Unstitched", category: "mens-unstitched" }
//     ]
//   },
//   { to: "/shop?category=womens", label: "Womens" },
//   { to: "/shop?category=watches", label: "Watches" },
//   { to: "/contact", label: "Contact" },
//   ];

//   const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

//   const results = searchTerm
//     ? products.filter(
//         (p) =>
//           String(p.code).toLowerCase() === searchTerm.toLowerCase() ||
//           p.name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : [];

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
//       setSearchOpen(false);
//       setSearchTerm("");
//     }
//   };

//   return (
//     <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
//       <div className="max-w-6xl mx-auto px-4">
//         <nav className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/">
//             <img src={logo} alt="Feshlo Logo" className="h-10 w-auto" />
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-4 relative">
//             {navLinks.map((link) =>
//               link.dropdown ? (
//                 <div key={link.label} className="relative">
//                   <button
//                     onClick={() => setMensDropdownDesktop(!mensDropdownDesktop)}
//                     className="py-2 px-4 text-gray-700 hover:text-black font-medium flex items-center gap-1"
//                   >
//                     {link.label}{" "}
//                     <FiChevronDown
//                       className={`transition-transform duration-200 ${mensDropdownDesktop ? "rotate-180" : ""}`}
//                     />
//                   </button>
//                   {mensDropdownDesktop && (
//                     <div className="absolute top-full left-0 mt-1 w-40 bg-white border shadow-md z-50">
//                       {link.subCategories.map((sub) => (
//                         <button
//                           key={sub.category}
//                           className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                           onClick={() => {
//                             navigate(`/shop?category=${sub.category}`);
//                             setMensDropdownDesktop(false);
//                           }}
//                         >
//                           {sub.label}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <NavLink
//                   key={link.label}
//                   to={link.to}
//                   className={({ isActive }) => (isActive ? linkActive : linkBase)}
//                 >
//                   {link.label}
//                 </NavLink>
//               )
//             )}
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center gap-4">
//             {/* Search */}
//             <button
//               onClick={() => setSearchOpen(!searchOpen)}
//               className="p-2 text-gray-700 hover:text-black"
//             >
//               <FiSearch size={22} />
//             </button>

//             {/* Cart */}
//             <Link
//               to="/cart"
//               className="relative p-2 text-gray-700 hover:text-black"
//             >
//               <FiShoppingCart size={22} />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* Mobile Menu Toggle */}
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="md:hidden p-2 text-gray-700 hover:text-black"
//             >
//               {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
//             </button>
//           </div>
//         </nav>

//         {/* Search Input */}
//         {searchOpen && (
//           <div className="absolute top-16 left-0 w-full bg-white border-b shadow-md p-3 z-40">
//             <form onSubmit={handleSearchSubmit}>
//               <input
//                 type="text"
//                 placeholder="Search by name or code..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full border px-3 py-2 rounded-md"
//                 autoFocus
//               />
//             </form>
//             {searchTerm && (
//               <div className="mt-2 bg-white rounded shadow max-h-60 overflow-y-auto">
//                 {results.length > 0 ? (
//                   results.map((p) => (
//                     <button
//                       key={p.id}
//                       onClick={() => {
//                         navigate(`/shop?search=${encodeURIComponent(p.name)}`);
//                         setSearchOpen(false);
//                         setSearchTerm("");
//                       }}
//                       className="w-full text-left block p-2 border-b last:border-none hover:bg-gray-100"
//                     >
//                       <p className="font-medium">{p.name}</p>
//                       <p className="text-sm text-gray-500">Code: {p.code}</p>
//                     </button>
//                   ))
//                 ) : (
//                   <p className="p-2 text-gray-500">No product found</p>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Mobile Menu */}
//         <div
//           className={`md:hidden overflow-hidden transition-all duration-300 ${
//             menuOpen ? "max-h-96" : "max-h-0"
//           }`}
//         >
//           <div className="flex flex-col border-t border-gray-200">
//             {navLinks.map((link) =>
//               link.dropdown ? (
//                 <div key={link.label} className="border-t border-gray-200">
//                   <button
//                     onClick={() => setMensDropdownMobile(!mensDropdownMobile)}
//                     className="w-full text-left px-4 py-2 flex items-center justify-between"
//                   >
//                     {link.label}{" "}
//                     <FiChevronDown
//                       className={`transition-transform duration-200 ${mensDropdownMobile ? "rotate-180" : ""}`}
//                     />
//                   </button>
//                   {mensDropdownMobile && (
//                     <div className="pl-4">
//                       {link.subCategories.map((sub) => (
//                         <button
//                           key={sub.category}
//                           className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                           onClick={() => {
//                             navigate(`/shop?category=${sub.category}`);
//                             setMensDropdownMobile(false);
//                             setMenuOpen(false);
//                           }}
//                         >
//                           {sub.label}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <NavLink
//                   key={link.label}
//                   to={link.to}
//                   onClick={() => setMenuOpen(false)}
//                   className={({ isActive }) => (isActive ? linkActive : linkBase)}
//                 >
//                   {link.label}
//                 </NavLink>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


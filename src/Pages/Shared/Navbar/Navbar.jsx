import React, { useState } from "react";
import { NavLink } from "react-router";
import { BiBookAlt } from "react-icons/bi";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 group"
            aria-label="CourseMaster home"
          >
            <BiBookAlt
              size={28}
              className="text-green-600 group-hover:text-green-700 transition-colors"
            />
            <span className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
              CourseMaster
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(({ to, label }) => (
              <li key={to} className="list-none">
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 px-2 py-1 rounded
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2
                    ${
                      isActive
                        ? "text-green-600"
                        : "text-gray-700 hover:text-green-600"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-green-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 rounded p-2"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-gray-100 bg-white animate-in slide-in-from-top-2 duration-200"
          >
            <div className="px-2 pt-3 pb-4 space-y-1">
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={handleCloseMenu}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-base font-medium transition-colors
                    ${
                      isActive
                        ? "bg-green-50 text-green-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

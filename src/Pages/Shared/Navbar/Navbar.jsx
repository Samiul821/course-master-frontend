import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { BiBookAlt } from "react-icons/bi";
import { FiMenu, FiX } from "react-icons/fi";
import useUserRole from "../../../Hooks/useUserRole";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { role } = useUserRole();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        toast.error("Failed to log out. Please try again.");
        console.error("Logout error:", error);
      });
  };

  // Navigation items
  let navItems = [];

  if (!user) {
    navItems = [
      { to: "/", label: "Home" },
      { to: "/courses", label: "Courses" },
      { to: "/login", label: "Login" },
      { to: "/register", label: "Register" },
    ];
  } else if (role === "student") {
    navItems = [
      { to: "/", label: "Home" },
      { to: "/courses", label: "Courses" },
      { to: "/my-courses", label: "My Courses" },
    ];
  } else if (role === "admin") {
    navItems = [
      { to: "/", label: "Home" },
      { to: "/manage-courses", label: "Manage Courses" },
      { to: "/enrollments", label: "Enrollments" },
      { to: "/assignments", label: "Assignments" },
      { to: "/admin-dashboard", label: "Admin Dashboard" },
    ];
  }

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP BAR */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <BiBookAlt size={28} className="text-green-600" />
            <span className="text-xl font-bold text-gray-900">
              CourseMaster
            </span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {/* Navigation links */}
            {navItems.map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors px-2 py-1 rounded ${
                    isActive
                      ? "text-green-600"
                      : "text-gray-700 hover:text-green-600"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Profile image dropdown */}
            {user && (
              <div className="relative">
                <img
                  onClick={() => setProfileOpen(!profileOpen)}
                  src={user?.photoURL || user?.profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border shadow-sm cursor-pointer object-cover"
                />

                {/* BACKDROP */}
                {profileOpen && (
                  <div
                    onClick={() => setProfileOpen(false)}
                    className="fixed inset-0 bg-black/10 backdrop-blur-sm z-10"
                  ></div>
                )}

                {/* Dropdown */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{
                    opacity: profileOpen ? 1 : 0,
                    scale: profileOpen ? 1 : 0.95,
                    y: profileOpen ? 0 : -5,
                  }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className={`${
                    profileOpen ? "block" : "hidden"
                  } absolute right-0 mt-3 w-56 z-20 bg-white/95 backdrop-blur-lg 
                shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 rounded-xl overflow-hidden`}
                >
                  <div className="px-4 py-3 border-b bg-white/80">
                    <p className="font-semibold text-gray-800">
                      {user?.fullname}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  <ul className="py-2">
                    <li>
                      <NavLink
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                      >
                        Profile
                      </NavLink>
                    </li>

                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </motion.div>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-green-600 p-2"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t py-3">
            {/* Nav items */}
            {navItems.map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                {label}
              </NavLink>
            ))}

            {/* Mobile profile (ONLY IMAGE) */}
            {user && (
              <div className="mt-4 border-t pt-3">
                <div className="px-3 py-2 flex items-center gap-3">
                  <img
                    src={user?.photoURL || user?.profileImage}
                    className="w-10 h-10 rounded-full border shadow-sm object-cover"
                  />
                </div>

                <NavLink
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { BiBookAlt, BiClipboard } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import { Link } from "react-router";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: MdDashboard,
    href: "/dashboard",
    role: "all",
  },
  {
    id: "courses",
    label: "Courses",
    icon: BiBookAlt,
    href: "/courses",
    role: "all",
  },
  {
    id: "my-courses",
    label: "My Courses",
    icon: BiClipboard,
    href: "/my-courses",
    role: "student",
  },
  {
    id: "manage-courses",
    label: "Manage Courses",
    icon: BiBookAlt,
    href: "/manage-courses",
    role: "admin",
  },
  {
    id: "settings",
    label: "Settings",
    icon: AiOutlineSetting,
    href: "/settings",
    role: "all",
  },
];

export default function DashboardLayout({
  children,
  userRole = "student",
  currentPath = "/dashboard",
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredNavItems = navItems.filter(
    (item) => item.role === "all" || item.role === userRole
  );

  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <Link to="/">
        <div className="fixed top-0 left-0 right-0 z-40 lg:hidden bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GiGraduateCap className="w-6 h-6 text-green-600" />
            <span className="font-bold text-gray-900">CourseMaster</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <AiOutlineClose className="w-6 h-6" />
            ) : (
              <AiOutlineMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </Link>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-100 flex-col"
      >
        {/* Logo */}
        <Link to="/">
          <div className="px-6 py-10 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <GiGraduateCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">
                  CourseMaster
                </h1>
                <p className="text-xs text-gray-500">Learn & Master</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {filteredNavItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;

            return (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={handleNavClick}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-green-50 text-green-600 shadow-md"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? "text-green-600" : "text-gray-400"
                  }`}
                />
                <span className="font-medium text-sm">{item.label}</span>
                {item.role !== "all" && (
                  <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {item.role}
                  </span>
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 py-6 border-t border-gray-100">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 bg-gray-50 hover:bg-green-50 hover:text-green-600 transition-all font-medium text-sm"
          >
            <AiOutlineLogout className="w-5 h-5" />
            Logout
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 lg:hidden backdrop-blur-xs bg-black/5"
        />
      )}

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: mobileMenuOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 bg-white border-r border-gray-100 z-40 lg:hidden flex flex-col overflow-y-auto"
      >
        <nav className="px-4 py-6 space-y-2">
          {filteredNavItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            return (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={handleNavClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-green-50 text-green-600 shadow-md"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? "text-green-600" : "text-gray-400"
                  }`}
                />
                <span className="font-medium text-sm">{item.label}</span>
              </motion.a>
            );
          })}
        </nav>

        {/* Logout Mobile */}
        <div className="px-4 py-4 border-t border-gray-100 mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 bg-gray-50 hover:bg-green-50 hover:text-green-600 transition-all font-medium text-sm"
          >
            <AiOutlineLogout className="w-5 h-5" />
            Logout
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="lg:ml-72 pt-20 lg:pt-0 min-h-screen bg-white">
        <div className="px-6 py-10 lg:py-10 max-w-7xl mx-auto">
          {children || (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Welcome to CourseMaster
                </h1>
                <p className="text-gray-600">
                  Your learning journey starts here. Explore courses and build
                  your skills.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="bg-white border border-gray-100 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <BiBookAlt className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Course {i}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Master essential skills with our comprehensive course
                      material.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-green-600 font-medium text-sm hover:text-green-700 transition-colors"
                    >
                      View Course →
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

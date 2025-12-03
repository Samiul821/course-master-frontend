import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { GiGraduateCap } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import toast from "react-hot-toast";

import {
  MdDashboard,
  MdSchool,
  MdLibraryBooks,
  MdAssignment,
  MdManageAccounts,
  MdPostAdd,
  MdReviews,
} from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";

// Nav items with unique icons
const navItems = [
  // COMMON NAV
  { id: "home", label: "Home", icon: MdDashboard, href: "/", role: "all" },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: MdDashboard,
    href: "/dashboard",
    role: "all",
  },

  // STUDENT NAV
  {
    id: "courses",
    label: "Courses",
    icon: MdSchool,
    href: "/dashboard/courses",
    role: "student",
  },
  {
    id: "my-courses",
    label: "My Courses",
    icon: MdLibraryBooks,
    href: "/dashboard/my-courses",
    role: "student",
  },
  {
    id: "assignments",
    label: "Assignments",
    icon: MdAssignment,
    href: "/dashboard/assignments",
    role: "student",
  },
  {
    id: "profile-student",
    label: "Profile",
    icon: AiOutlineSetting,
    href: "/dashboard/profile",
    role: "student",
  },

  // ADMIN NAV
  {
    id: "manage-courses",
    label: "Manage Courses",
    icon: MdManageAccounts,
    href: "/dashboard/manage-courses",
    role: "admin",
  },
  {
    id: "add-course",
    label: "Add Course",
    icon: MdPostAdd,
    href: "/dashboard/add-course",
    role: "admin",
  },
  {
    id: "enrollments",
    label: "Enrollments",
    icon: FaUserGraduate,
    href: "/dashboard/enrollments",
    role: "admin",
  },
  {
    id: "assignment-review",
    label: "Assignments Review",
    icon: MdReviews,
    href: "/dashboard/assignments-review",
    role: "admin",
  },
  {
    id: "students",
    label: "Students",
    icon: MdLibraryBooks,
    href: "/dashboard/students",
    role: "admin",
  },
  {
    id: "profile-admin",
    label: "Profile",
    icon: FaUserTie,
    href: "/dashboard/adimn-profile",
    role: "admin",
  },
];

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logOut } = useAuth();
  const { role, roleLoading } = useUserRole();
  const navigate = useNavigate();

  if (roleLoading) return <p className="text-center mt-20">Loading...</p>;

  const filteredNavItems = navItems.filter(
    (item) => item.role === "all" || item.role === role
  );

  const handleLogout = async () => {
    await logOut();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 lg:hidden bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <GiGraduateCap className="w-6 h-6 text-green-600" />
          <span className="font-bold text-gray-900">CourseMaster</span>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? (
            <AiOutlineClose className="w-6 h-6" />
          ) : (
            <AiOutlineMenu className="w-6 h-6" />
          )}
        </button>
      </div>

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
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.href}
                onClick={handleNavClick}
                end={item.href === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-green-50 text-green-600 shadow-md"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <Icon className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-sm">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Desktop */}
        <div className="px-4 py-6 border-t border-gray-100">
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 bg-gray-50 hover:bg-green-50 hover:text-green-600 transition-all font-medium text-sm"
          >
            <AiOutlineLogout className="w-5 h-5" />
            Logout
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 lg:hidden backdrop-blur-sm bg-black/10"
        />
      )}

      <motion.div
        initial={{ x: -280 }}
        animate={{ x: mobileMenuOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 bg-white border-r border-gray-100 z-40 lg:hidden flex flex-col overflow-y-auto"
      >
        <nav className="px-4 py-6 space-y-2">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.href}
                onClick={handleNavClick}
                end={item.href === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-green-50 text-green-600 shadow-md"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <Icon className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-sm">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Logout */}
        <div className="px-4 py-4 border-t border-gray-100 mt-auto">
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 bg-gray-50 hover:bg-green-50 hover:text-green-600 transition-all font-medium text-sm"
          >
            <AiOutlineLogout className="w-5 h-5" />
            Logout
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="lg:ml-72 pt-20 lg:pt-0 min-h-screen bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

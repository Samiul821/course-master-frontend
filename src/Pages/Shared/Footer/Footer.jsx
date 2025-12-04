"use client";

import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { GiBookAura } from "react-icons/gi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="py-12 xl:px-[15%] lg:px-[6%] md:px-[4%] px-[2%]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <GiBookAura className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">CourseMaster</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Empower your learning journey with industry-leading courses and
              expert instructors.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/courses"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Student Links (with role logic comment) */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Learning</h4>
            {/* Role Logic: Show these links only for authenticated students/users */}
            <ul className="space-y-3">
              <li>
                <a
                  href="/my-courses"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  My Courses
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="/help"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Help & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-700">
                <span className="font-medium">Email:</span>
                <br />
                <a
                  href="mailto:support@coursemaster.com"
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  support@coursemaster.com
                </a>
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Phone:</span>
                <br />
                <a
                  href="tel:+1234567890"
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Location:</span>
                <br />
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8 mb-6" />

        {/* Social Icons Row */}
        <div className="flex justify-center gap-4 mb-8">
          <a
            href="#facebook"
            aria-label="Follow us on Facebook"
            className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-colors"
          >
            <FaFacebook className="w-5 h-5" />
          </a>
          <a
            href="#instagram"
            aria-label="Follow us on Instagram"
            className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-colors"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a
            href="#youtube"
            aria-label="Subscribe to our YouTube channel"
            className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-colors"
          >
            <FaYoutube className="w-5 h-5" />
          </a>
        </div>

        {/* Bottom Bar - Copyright */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-600">
            © {currentYear} CourseMaster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

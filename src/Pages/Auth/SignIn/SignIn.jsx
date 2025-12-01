import { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiBookAlt } from "react-icons/bi";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const inputVariants = {
    initial: { scale: 1, borderColor: "#e5e7eb" },
    focus: { scale: 1.01, transition: { duration: 0.2 } },
  };

  const labelVariants = {
    initial: { y: 0, opacity: 1 },
    focus: { y: -2, opacity: 1, transition: { duration: 0.2 } },
  };

  const buttonHoverVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <BiBookAlt
              size={28}
              className="text-green-600 group-hover:text-green-700 transition-colors"
            />
            CourseMaster
          </h1>
          <p className="text-gray-600 text-sm">
            Create your account and start learning today
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.form variants={itemVariants} className="space-y-4">
          {/* Email */}
          <motion.div variants={itemVariants}>
            <motion.label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
              variants={labelVariants}
            >
              Email Address
            </motion.label>
            <motion.input
              id="email"
              type="email"
              placeholder="you@example.com"
              variants={inputVariants}
              whileFocus="focus"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariants}>
            <motion.label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
              variants={labelVariants}
            >
              Password
            </motion.label>
            <div className="relative">
              <motion.input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                variants={inputVariants}
                whileFocus="focus"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors rounded p-1"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={18} />
                ) : (
                  <AiOutlineEye size={18} />
                )}
              </button>
            </div>
          </motion.div>

          {/* Forgot Password Link */}
          <motion.div variants={itemVariants} className="text-right text-sm">
            <a
              href="/forgot-password"
              className="text-green-600 hover:text-green-700 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
            >
              Forgot Password?
            </a>
          </motion.div>

          {/* Sign In Button */}
          <motion.button
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            type="button"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Sign In
          </motion.button>

          {/* Divider */}
          <motion.div variants={itemVariants} className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </motion.div>

          {/* Google Sign-In Button */}
          <motion.button
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            type="button"
            className="w-full bg-white border-2 border-green-600 text-gray-900 font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg hover:bg-green-50 transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <FaGoogle className="text-green-600" size={18} />
            <span>Sign in with Google</span>
          </motion.button>
        </motion.form>

        {/* Register Link */}
        <motion.div
          variants={itemVariants}
          className="mt-6 text-center text-sm"
        >
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-green-600 hover:text-green-700 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
            >
              Register
            </a>
          </p>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          variants={itemVariants}
          className="mt-6 text-center text-xs text-gray-400"
        >
          <p>By signing in, you agree to our Terms and Privacy Policy</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignIn;

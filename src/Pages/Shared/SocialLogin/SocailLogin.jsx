import React from "react";
import { FaGoogle } from "react-icons/fa";

const SocailLogin = () => {
    
  return (
    <div>
      {/* Google Sign-In Button */}
      <motion.button
        variants={buttonHoverVariants}
        whileHover="hover"
        whileTap="tap"
        type="button"
        className="w-full bg-white border-2 border-green-600 text-gray-900 font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg hover:bg-green-50 transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <FaGoogle className="text-green-600" size={18} /> Sign in with Google
      </motion.button>
    </div>
  );
};

export default SocailLogin;

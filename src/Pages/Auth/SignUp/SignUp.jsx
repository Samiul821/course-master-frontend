import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";
import { BiBookAlt } from "react-icons/bi";
import Lottie from "lottie-react";
import SignUpLottie from "../../../../public/signup.json";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <motion.div
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Lottie Animation */}
        <motion.div
          variants={itemVariants}
          className="hidden lg:flex justify-center"
        >
          <Lottie
            animationData={SignUpLottie}
            loop={true}
            className="w-96 h-96"
          />
          
        </motion.div>

        {/* Registration Form */}
<motion.div variants={itemVariants} className="w-full max-w-4xl mx-auto">
  <motion.div variants={itemVariants} className="text-center mb-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
      <BiBookAlt size={28} className="text-green-600 transition-colors" /> CourseMaster
    </h1>
    <p className="text-gray-600 text-sm">
      Create your account and start learning today
    </p>
  </motion.div>

  <motion.form
    variants={itemVariants}
    className="grid grid-cols-1 md:grid-cols-2 gap-6"
    onSubmit={handleSubmit(onSubmit)}
  >
    {/* Profile Image Upload (full width) */}
    <motion.div
      variants={itemVariants}
      className="flex justify-center mb-6 md:col-span-2"
    >
      <label htmlFor="profileImage" className="relative cursor-pointer group">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-50 to-green-100 border-2 border-dashed border-green-300 flex items-center justify-center group-hover:border-green-500 transition-colors overflow-hidden">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile preview"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <MdCloudUpload className="text-green-600 text-3xl transition-colors" />
          )}
        </div>
        <input
          id="profileImage"
          type="file"
          accept="image/*"
          className="hidden"
          {...register("profileImage")}
          onChange={handleImageChange}
        />
        <span className="absolute -bottom-2 right-0 text-xs bg-green-600 text-white px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Click to upload
        </span>
      </label>
    </motion.div>

    {/* Full Name */}
    <motion.div variants={itemVariants}>
      <motion.label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1" variants={labelVariants}>
        Full Name
      </motion.label>
      <motion.input
        id="fullName"
        type="text"
        placeholder="John Doe"
        variants={inputVariants}
        whileFocus="focus"
        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-900 placeholder-gray-400 ${errors.fullName ? "border-red-500" : "border-gray-200"}`}
        {...register("fullName", { required: "Full Name is required" })}
      />
      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
    </motion.div>

    {/* Phone Number */}
    <motion.div variants={itemVariants}>
      <motion.label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1" variants={labelVariants}>
        Phone Number
      </motion.label>
      <motion.input
        id="phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
        variants={inputVariants}
        whileFocus="focus"
        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-900 placeholder-gray-400 ${errors.phone ? "border-red-500" : "border-gray-200"}`}
        {...register("phone", { required: "Phone number is required" })}
      />
      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
    </motion.div>

    {/* Email */}
    <motion.div variants={itemVariants}>
      <motion.label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1" variants={labelVariants}>
        Email Address
      </motion.label>
      <motion.input
        id="email"
        type="email"
        placeholder="you@example.com"
        variants={inputVariants}
        whileFocus="focus"
        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-900 placeholder-gray-400 ${errors.email ? "border-red-500" : "border-gray-200"}`}
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
    </motion.div>

    {/* Date of Birth */}
    <motion.div variants={itemVariants}>
      <motion.label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1" variants={labelVariants}>
        Date of Birth
      </motion.label>
      <motion.input
        id="dob"
        type="date"
        variants={inputVariants}
        whileFocus="focus"
        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-900 placeholder-gray-400 ${errors.dob ? "border-red-500" : "border-gray-200"}`}
        {...register("dob", { required: "Date of Birth is required" })}
      />
      {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
    </motion.div>

    {/* Gender */}
    <motion.div variants={itemVariants}>
      <motion.label className="block text-sm font-medium text-gray-700 mb-1" variants={labelVariants}>
        Gender
      </motion.label>
      <div className="flex gap-4">
        {["Male", "Female", "Other"].map((g) => (
          <label key={g} className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              value={g}
              {...register("gender", { required: "Gender is required" })}
              className="accent-green-600"
            />
            {g}
          </label>
        ))}
      </div>
      {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
    </motion.div>

    {/* Password */}
    <motion.div variants={itemVariants}>
      <motion.label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1" variants={labelVariants}>
        Password
      </motion.label>
      <div className="relative">
        <motion.input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          variants={inputVariants}
          whileFocus="focus"
          className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-900 placeholder-gray-400 pr-10 ${errors.password ? "border-red-500" : "border-gray-200"}`}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors rounded p-1"
        >
          {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
        </button>
      </div>
      {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
    </motion.div>

    {/* Confirm Password */}
    <motion.div variants={itemVariants}>
      <motion.label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1" variants={labelVariants}>
        Confirm Password
      </motion.label>
      <div className="relative">
        <motion.input
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="••••••••"
          variants={inputVariants}
          whileFocus="focus"
          className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-900 placeholder-gray-400 pr-10 ${errors.confirmPassword ? "border-red-500" : "border-gray-200"}`}
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors rounded p-1"
        >
          {showConfirmPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
        </button>
      </div>
      {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
    </motion.div>

    {/* Terms (full width) */}
    <motion.div variants={itemVariants} className="md:col-span-2 flex items-center gap-2">
      <input type="checkbox" {...register("terms", { required: "You must accept the terms" })} className="accent-green-600" />
      <label className="text-gray-700 text-sm">
        I agree to the{" "}
        <a href="/terms" className="text-green-600 hover:text-green-700">
          Terms & Conditions
        </a>
      </label>
    </motion.div>

    {/* Register Button (full width) */}
    <motion.button
      variants={buttonHoverVariants}
      whileHover="hover"
      whileTap="tap"
      type="submit"
      className="md:col-span-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      Register
    </motion.button>

    {/* Google Sign-In (full width) */}
    <motion.button
      variants={buttonHoverVariants}
      whileHover="hover"
      whileTap="tap"
      type="button"
      className="md:col-span-2 w-full bg-white border-2 border-green-600 text-gray-900 font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg hover:bg-green-50 transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      <FaGoogle className="text-green-600" size={18} /> Sign in with Google
    </motion.button>
  </motion.form>
</motion.div>

      </motion.div>
    </div>
  );
};

export default SignUp;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";
import { BiBookAlt } from "react-icons/bi";
import Lottie from "lottie-react";
import SignUpLottie from "../../../../public/signup.json";

import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { createUser, updateUser, googleSignIn, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Image Preview
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setImagePreview(URL.createObjectURL(file)); // preview

    try {
      const formData = new FormData();
      formData.append("image", file);

      const url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGEBB_KEY
      }`;

      const res = await axios.post(url, formData);

      const hostedURL = res.data.data.url;
      setImageFile(hostedURL); // final hosted url (correct)

      console.log("Uploaded Image URL:", hostedURL);
    } catch (error) {
      console.error("Image upload failed:", error);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!imageFile) {
      Swal.fire({
        icon: "warning",
        title: "Upload your profile image!",
        confirmButtonColor: "#22c55e",
      });
      return;
    }
    createUser(data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        const userInfo = {
          fullname: data.fullName,
          email: data.email,
          password: data.password,
          phone: data.phone,
          dob: data.dob,
          gender: data.gender,
          profileImage: imageFile,
          role: "student",
        };
        const response = await axiosInstance.post("/users", userInfo);
        console.log(response.data);
        updateUser({ displayName: data.fullName, photoURL: imageFile }).then(
          () => {
            setUser({
              ...user,
              displayName: data.fullName,
              photoURL: imageFile,
            });
          }
        );
        Swal.fire({
          icon: "success",
          title: `Welcome, ${data.fullName}!`,
          text: `Your account has been created on Course Master. Let's start learning!`,
          confirmButtonColor: "#22c55e",
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };

  // Motion Variants
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
    initial: { scale: 1 },
    focus: { scale: 1.01, transition: { duration: 0.2 } },
  };

  const labelVariants = {
    initial: { y: 0 },
    focus: { y: -2, transition: { duration: 0.2 } },
  };

  const buttonHoverVariants = {
    hover: { scale: 1.02 },
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
        <motion.div
          variants={itemVariants}
          className="w-full max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <BiBookAlt size={28} className="text-green-600" />
              CourseMaster
            </h1>
            <p className="text-gray-600 text-sm">
              Create your account and start learning today
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Profile Image */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-6 md:col-span-2"
            >
              <motion.label
                variants={labelVariants}
                htmlFor="profileImage"
                className="relative cursor-pointer group"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-50 to-green-100 border-2 border-dashed border-green-300 flex items-center justify-center group-hover:border-green-500 transition-colors overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      className="w-full h-full object-cover"
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
                  onChange={handleImageChange}
                />

                <span className="absolute -bottom-2 right-0 text-xs bg-green-600 text-white px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Click to upload
                </span>
              </motion.label>
            </motion.div>

            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <motion.label
                variants={labelVariants}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </motion.label>
              <motion.input
                type="text"
                placeholder="John Doe"
                variants={inputVariants}
                whileFocus="focus"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-900 placeholder-gray-400 pr-10 ${
                  errors.fullName ? "border-red-500" : "border-gray-200"
                }`}
                {...register("fullName", { required: "Full Name is required" })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs">
                  {errors.fullName.message}
                </p>
              )}
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants}>
              <motion.label
                variants={labelVariants}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </motion.label>
              <motion.input
                type="tel"
                placeholder="+8801XXXXXXXXX"
                variants={inputVariants}
                whileFocus="focus"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-900 placeholder-gray-400 pr-10 ${
                  errors.phone ? "border-red-500" : "border-gray-200"
                }`}
                {...register("phone", { required: "Phone number is required" })}
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <motion.label
                variants={labelVariants}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </motion.label>
              <motion.input
                type="email"
                placeholder="example@mail.com"
                variants={inputVariants}
                whileFocus="focus"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-900 placeholder-gray-400 pr-10 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                {...register("email", { required: "Email is required" })}
              />
            </motion.div>

            {/* Date of Birth */}
            <motion.div variants={itemVariants}>
              <motion.label
                variants={labelVariants}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth
              </motion.label>
              <motion.input
                type="date"
                variants={inputVariants}
                whileFocus="focus"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-900 placeholder-gray-400 pr-10 ${
                  errors.dob ? "border-red-500" : "border-gray-200"
                }`}
                {...register("dob", { required: "Date of Birth is required" })}
              />
            </motion.div>

            {/* Gender */}
            <motion.div variants={itemVariants}>
              <motion.label
                variants={labelVariants}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </motion.label>
              <div className="flex gap-4">
                {["Male", "Female", "Other"].map((g) => (
                  <motion.label
                    variants={labelVariants}
                    key={g}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      value={g}
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                    />
                    {g}
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <motion.label
                variants={labelVariants}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </motion.label>
              <div className="relative">
                <motion.input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  variants={inputVariants}
                  whileFocus="focus"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-900 placeholder-gray-400 pr-10 ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={itemVariants}>
              <motion.label
                variants={labelVariants}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </motion.label>
              <div className="relative">
                <motion.input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  variants={inputVariants}
                  whileFocus="focus"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-900 placeholder-gray-400 pr-10 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Terms */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 flex items-center gap-2"
            >
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must accept the terms",
                })}
              />
              <label className="text-sm text-gray-700">
                I agree to the{" "}
                <a href="/terms" className="text-green-600">
                  Terms & Conditions
                </a>
              </label>
            </motion.div>

            {/* Register Button */}
            <motion.button
              type="submit"
              className="md:col-span-2 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg"
            >
              {uploading ? "Uploading Image..." : "Register"}
            </motion.button>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 flex items-center my-4"
            >
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="mx-3 text-gray-400 text-sm font-semibold">
                or
              </span>
              <div className="flex-1 border-t border-gray-300"></div>
            </motion.div>

            {/* Google SignIn */}
            <motion.button
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
              type="button"
              className="md:col-span-2 w-full border-2 border-green-600 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-green-50 transition"
              onClick={googleSignIn}
            >
              <FaGoogle className="text-green-600" />
              Continue with Google
            </motion.button>

            {/* Already have account */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 mt-5 text-center text-sm text-gray-600"
            >
              Already have an account?{" "}
              <a
                href="/login"
                className="text-green-600 font-semibold hover:underline"
              >
                Login
              </a>
            </motion.div>

            {/* Footer Note */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 mt-3 text-center text-xs text-gray-400"
            >
              By signing up, you agree to our{" "}
              <a href="/terms" className="hover:underline text-gray-500">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="hover:underline text-gray-500">
                Privacy Policy
              </a>
              .
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;

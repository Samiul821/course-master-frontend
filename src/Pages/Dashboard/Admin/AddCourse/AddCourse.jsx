import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdChevronRight,
  MdChevronLeft,
  MdCheckCircle,
  MdCloudUpload,
  MdClose,
} from "react-icons/md";
import useAuth from "../../../../Hooks/useAuth";
import useAxios from "../../../../Hooks/useAxios";
import axios from "axios";
import toast from "react-hot-toast";

const steps = [
  { id: 1, title: "Basic Info", description: "Course fundamentals" },
  { id: 2, title: "Instructor", description: "Course instructor" },
  { id: 3, title: "Details", description: "Course specifications" },
  { id: 4, title: "Schedule & Price", description: "Timeline and pricing" },
  { id: 5, title: "Content", description: "Learning outcomes" },
];

const categories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "UI/UX Design",
  "Business",
  "Mathematics",
  "Science",
  "Languages",
];

const levels = ["Beginner", "Intermediate", "Advanced"];
const languages = ["English", "Spanish", "French", "German", "Chinese"];
const courseTypes = ["Online", "Offline", "Hybrid"];
const accessTypes = ["Free", "Paid"];

const AddCourse = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const axiosIstance = useAxios();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      accessType: "Paid",
      courseLevel: "Beginner",
      durationUnit: "weeks",
      courseType: "Online",
      language: "English",
    },
  });

  const accessType = watch("accessType");

  const isStep1Valid =
    watch("courseTitle") &&
    watch("shortDescription") &&
    watch("detailedDescription") &&
    watch("category");
  const isStep2Valid = watch("instructorName");
  const isStep3Valid =
    watch("courseDuration") &&
    watch("courseLevel") &&
    watch("language") &&
    watch("courseType");
  const isStep4Valid =
    watch("startDate") && watch("price") && watch("accessType");
  const isStep5Valid = watch("learningOutcomes");

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return isStep1Valid;
      case 2:
        return isStep2Valid;
      case 3:
        return isStep3Valid;
      case 4:
        return isStep4Valid;
      case 5:
        return isStep5Valid;
      default:
        return false;
    }
  };

  // const handleThumbnailChange = async (e) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setUploading(true);
  //     try {
  //       const result = await uploadImageToImgbb(file);

  //       if (result.success) {
  //         setThumbnailPreview(result.url);
  //         setValue("courseThumbnail", result.url);
  //       } else {
  //         console.error("[v0] Upload failed:", result.error);
  //         alert("Failed to upload image. Please try again.");
  //       }
  //     } catch (error) {
  //       console.error("[v0] Upload error:", error);
  //       alert("Error uploading image");
  //     } finally {
  //       setUploading(false);
  //     }
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      let imageUrl = "";
      if (data.image?.[0]) {
        setUploading(true);
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const imageUploadRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGEBB_KEY
          }`,
          formData
        );
        imageUrl = imageUploadRes?.data?.data?.url;
        setUploading(false);

        if (!imageUrl) return toast.error("Image upload failed!");
      }

      const courseData = {
        courseTitle: data.courseTitle || "",
        shortDescription: data.shortDescription || "",
        detailedDescription: data.detailedDescription || "",
        category: data.category || "",
        instructorName: data.instructorName || "",
        instructorBio: data.instructorBio || "",
        courseDuration: Number(data.courseDuration) || 0,
        durationUnit: data.durationUnit || "weeks",
        courseLevel: data.courseLevel || "Beginner",
        language: data.language || "English",
        courseType: data.courseType || "Online",
        startDate: data.startDate ? new Date(data.startDate) : new Date(),
        price: Number(data.price) || 0,
        accessType: data.accessType || "Paid",
        learningOutcomes: data.learningOutcomes || "",
        courseThumbnail: imageUrl || "",
        prerequisites: data.prerequisites || "",
        syllabus: data.syllabus || "",
        distributor_name: user.displayName || "Admin",
        distributor_email: user.email || "admin@example.com",
      };

      const res = await axiosIstance.post("/courses", courseData);
      if (res.data?.course?._id) {
        toast.success("Course Created Successfully!");
        reset();
        setThumbnailPreview(null);
        setCurrentStep(1);
      } else {
        toast.error("Failed to create course!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      setUploading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="flex items-center justify-center min-h-screen bg-gray-50"
      >
        <div className="w-full max-w-md p-8 text-center bg-white border border-gray-100 rounded-lg shadow-lg">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <MdCheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Course Created Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your course has been added to CourseMaster.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            Create Another Course
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Add New Course
          </h1>
          <p className="text-gray-600">
            Create and configure your new course for CourseMaster
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => index < currentStep && setCurrentStep(step.id)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <motion.div
                    animate={{
                      backgroundColor:
                        step.id <= currentStep
                          ? "#16A34A"
                          : index < currentStep
                          ? "#16A34A"
                          : "#E5E7EB",
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all"
                  >
                    <span
                      className={
                        step.id <= currentStep ? "text-white" : "text-gray-600"
                      }
                    >
                      {step.id}
                    </span>
                  </motion.div>
                  <span className="text-xs font-medium text-gray-600 mt-2 group-hover:text-green-600">
                    {step.title}
                  </span>
                </motion.div>

                {index < steps.length - 1 && (
                  <motion.div
                    animate={{
                      backgroundColor:
                        step.id < currentStep ? "#16A34A" : "#E5E7EB",
                    }}
                    className="flex-1 h-1 mx-2 rounded-full transition-all"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Form Card */}
        <div className="p-8 bg-white border border-gray-100 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Basic Course Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Course Title *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Advanced React Patterns"
                        {...register("courseTitle", {
                          required: "Course title is required",
                        })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                      />
                      {errors.courseTitle && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.courseTitle.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Short Description *
                      </label>
                      <input
                        type="text"
                        placeholder="Brief summary in one line"
                        {...register("shortDescription", {
                          required: "Short description is required",
                        })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                      />
                      {errors.shortDescription && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.shortDescription.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Detailed Description *
                      </label>
                      <textarea
                        placeholder="Comprehensive course description..."
                        rows={4}
                        {...register("detailedDescription", {
                          required: "Detailed description is required",
                        })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 resize-none"
                      />
                      {errors.detailedDescription && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.detailedDescription.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Category *
                      </label>
                      <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white"
                          >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.category && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.category.message}
                        </p>
                      )}
                    </div>

                    {/* Course Thumbnail with ImgBB */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Course Thumbnail (Optional)
                      </label>
                      <div>
                        {thumbnailPreview ? (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-green-600">
                            <img
                              src={thumbnailPreview}
                              alt="Course thumbnail"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setThumbnailPreview(null);
                                setValue("image", null); // reset image field
                              }}
                              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                            >
                              <MdClose size={20} />
                            </button>
                          </div>
                        ) : (
                          <label className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-600 transition-colors bg-gray-50">
                            <div className="text-center">
                              <MdCloudUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">
                                {uploading
                                  ? "Uploading..."
                                  : "Upload course image"}
                              </p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              {...register("image")}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setThumbnailPreview(
                                    URL.createObjectURL(file)
                                  );
                                  setValue("image", [file]); // save for submission
                                }
                              }}
                              disabled={uploading}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Instructor Information
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Role-based access: This section can be configured for both
                      student and admin users
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Instructor Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Dr. Jane Smith"
                        {...register("instructorName", {
                          required: "Instructor name is required",
                        })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                      />
                      {errors.instructorName && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.instructorName.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Instructor Bio (Optional)
                      </label>
                      <textarea
                        placeholder="Tell us about the instructor..."
                        rows={4}
                        {...register("instructorBio")}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 resize-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Course Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Course Duration *
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="number"
                          placeholder="e.g., 12"
                          {...register("courseDuration", {
                            required: "Duration is required",
                          })}
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                        <Controller
                          name="durationUnit"
                          control={control}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="w-28 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white"
                            >
                              <option value="hours">Hours</option>
                              <option value="days">Days</option>
                              <option value="weeks">Weeks</option>
                              <option value="months">Months</option>
                            </select>
                          )}
                        />
                      </div>
                      {errors.courseDuration && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.courseDuration.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Course Level *
                      </label>
                      <Controller
                        name="courseLevel"
                        control={control}
                        rules={{ required: "Course level is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white"
                          >
                            {levels.map((level) => (
                              <option key={level} value={level}>
                                {level}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.courseLevel && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.courseLevel.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Language *
                      </label>
                      <Controller
                        name="language"
                        control={control}
                        rules={{ required: "Language is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white"
                          >
                            {languages.map((lang) => (
                              <option key={lang} value={lang}>
                                {lang}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.language && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.language.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Course Type *
                      </label>
                      <Controller
                        name="courseType"
                        control={control}
                        rules={{ required: "Course type is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white"
                          >
                            {courseTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.courseType && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.courseType.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Schedule & Pricing
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        {...register("startDate", {
                          required: "Start date is required",
                        })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                      />
                      {errors.startDate && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.startDate.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Access Type *
                      </label>
                      <Controller
                        name="accessType"
                        control={control}
                        rules={{ required: "Access type is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white"
                          >
                            {accessTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.accessType && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.accessType.message}
                        </p>
                      )}
                    </div>

                    {accessType === "Paid" && (
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Price (USD) *
                        </label>
                        <input
                          type="number"
                          placeholder="99.99"
                          step="0.01"
                          {...register("price", {
                            required:
                              accessType === "Paid"
                                ? "Price is required for paid courses"
                                : false,
                          })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                        {errors.price && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.price.message}
                          </p>
                        )}
                      </div>
                    )}

                    {accessType === "Free" && (
                      <div>
                        <input type="hidden" {...register("price")} value="0" />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Course Content & Outcomes
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Learning Outcomes *
                      </label>
                      <textarea
                        placeholder="What will students learn? (e.g., Learn React hooks, Master state management, Build production apps...)"
                        rows={6}
                        {...register("learningOutcomes", {
                          required: "Learning outcomes are required",
                        })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 resize-none"
                      />
                      {errors.learningOutcomes && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.learningOutcomes.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Syllabus / Modules (Optional)
                      </label>
                      <textarea
                        placeholder="Outline the course modules and topics..."
                        rows={4}
                        {...register("syllabus")}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Requirements / Prerequisites (Optional)
                      </label>
                      <textarea
                        placeholder="List any prerequisites or requirements..."
                        rows={3}
                        {...register("prerequisites")}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 resize-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between gap-4 mt-10 pt-6 border-t border-gray-200"
            >
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                <MdChevronLeft size={20} />
                Previous
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Next
                  <MdChevronRight size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  <MdCheckCircle size={20} />
                  Create Course
                </button>
              )}
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;

import { useState } from "react";
import { motion } from "framer-motion";
import { MdAdd, MdEdit, MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PAGE_SIZE = 10;

const ManageCourses = () => {
  const axiosInstance = useAxios();
  // const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["courses", page],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/courses?page=${page}&limit=${PAGE_SIZE}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const courses = data?.courses || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Delete course mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/courses/${id}`),
    onSuccess: (response, id) => {
      toast.success("Course has been deleted successfully!");
      queryClient.invalidateQueries(["courses"]);
    },
    onError: () => {
      toast.error("Failed to delete course.");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Course will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pt-8 ">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Manage Courses
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            View, edit, and manage all courses
          </p>
        </div>

        <Link to="/dashboard/add-course">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            <MdAdd className="w-5 h-5" />
            Add New Course
          </motion.button>
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <p className="text-center text-gray-600 py-10">Loading courses...</p>
      )}

      {/* Error */}
      {isError && (
        <p className="text-center text-red-500 py-10">
          Failed to load courses.
        </p>
      )}

      {/* Desktop Table View with Horizontal Scroll */}
      {!isLoading && !isError && (
        <div className="hidden lg:block py-8 overflow-x-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full table-auto">
              <thead className="bg-gradient-to-r from-green-50 to-white border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-green-700">
                    Thumbnail
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-green-700">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-green-700">
                    Instructor
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-green-700">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-green-700">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-green-700">
                    Created Date
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-green-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {courses.map((course, index) => (
                  <motion.tr
                    key={course._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: "#f0fdf4" }}
                    className="transition-colors"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={course.courseThumbnail}
                        alt={course.courseTitle}
                        className="w-16 h-16 rounded-lg object-cover border border-gray-100"
                      />
                    </td>
                    <td className="px-4 py-3">{course.courseTitle}</td>
                    <td className="px-4 py-3">{course.instructorName}</td>
                    <td className="px-4 py-3">{course.category}</td>
                    <td className="px-4 py-3 font-semibold">${course.price}</td>
                    <td className="px-4 py-3">
                      {new Date(course.createdAt).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link to={`/dashboard//edit-courses/${course._id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                          >
                            <MdEdit className="w-5 h-5" />
                          </motion.button>
                        </Link>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(course._id)}
                          className="p-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <MdDeleteOutline className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {courses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  No courses found. Create your first course!
                </p>
              </div>
            )}
          </div>

          {/* Pagination Desktop */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg border ${
                  page === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white text-green-600 border-green-600 hover:bg-green-50"
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded-lg border ${
                    page === p
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-green-600 border-green-600 hover:bg-green-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-lg border ${
                  page === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white text-green-600 border-green-600 hover:bg-green-50"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile & Tablet Grid */}
      {!isLoading && !isError && (
        <div className="lg:hidden md:grid md:grid-cols-2 gap-4 sm:grid-cols-2 grid-cols-1 ">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-shadow my-3"
            >
              <div className="flex gap-4 mb-4">
                <img
                  src={course.courseThumbnail}
                  alt={course.courseTitle}
                  className="w-20 h-20 rounded-lg object-cover border border-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {course.courseTitle}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {course.instructorName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(course.createdAt).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                  {course.category}
                </span>
                <p className="text-sm font-semibold text-gray-900">
                  ${course.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/dashboard//edit-courses/${course._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 text-sm font-medium"
                  >
                    <MdEdit className="w-4 h-4" />
                    Edit
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(course._id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 text-sm font-medium"
                >
                  <MdDeleteOutline className="w-4 h-4" />
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ManageCourses;

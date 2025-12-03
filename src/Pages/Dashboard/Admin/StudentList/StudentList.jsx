import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MdSearch, MdDelete, MdVisibility } from "react-icons/md";

// Dummy student data
const dummyStudents = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    enrolledCourses: 3,
    joinedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    enrolledCourses: 5,
    joinedDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol.davis@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    enrolledCourses: 2,
    joinedDate: "2024-03-10",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@example.com",
    avatar: "https://i.pravatar.cc/150?img=4",
    enrolledCourses: 4,
    joinedDate: "2024-04-05",
  },
  {
    id: "5",
    name: "Emma Brown",
    email: "emma.brown@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    enrolledCourses: 6,
    joinedDate: "2024-05-12",
  },
  {
    id: "6",
    name: "Frank Miller",
    email: "frank.miller@example.com",
    avatar: "https://i.pravatar.cc/150?img=6",
    enrolledCourses: 1,
    joinedDate: "2024-06-18",
  },
];

const StudentList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState(dummyStudents);

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, students]);

  // View profile
  const handleViewProfile = (studentId) => {
    console.log("View profile:", studentId);
  };

  // Delete student
  const handleDeleteStudent = (studentId) => {
    console.log("Delete:", studentId);
    setStudents(students.filter((s) => s.id !== studentId));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Students</h1>
        <p className="text-gray-600">Manage and view all registered students</p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 text-gray-900"
          />
        </div>
      </motion.div>

      {/* Desktop Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:block"
      >
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm border border-gray-100">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-green-600">
                  Avatar
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-green-600">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-green-600">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-green-600">
                  Enrolled
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-green-600">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-green-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: "#f0fdf4" }}
                    className="border-b border-gray-100"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm">{student.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs">
                        {student.enrolledCourses}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {formatDate(student.joinedDate)}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleViewProfile(student.id)}
                        className="px-3 py-1.5 border rounded-lg border-green-600 text-green-600 hover:bg-green-50"
                      >
                        <MdVisibility className="inline mr-1" /> View
                      </button>

                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="px-3 py-1.5 border rounded-lg border-red-600 text-red-600 hover:bg-red-50"
                      >
                        <MdDelete className="inline mr-1" /> Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Mobile Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="md:hidden space-y-4"
      >
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg border p-4 shadow"
            >
              <div className="flex gap-4 mb-4">
                <img
                  src={student.avatar}
                  className="w-12 h-12 rounded-full border object-cover"
                />
                <div>
                  <h3 className="font-semibold">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Enrolled</p>
                  <p className="text-lg font-semibold text-green-600">
                    {student.enrolledCourses}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Joined</p>
                  <p className="text-sm font-semibold">
                    {formatDate(student.joinedDate)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleViewProfile(student.id)}
                  className="flex-1 px-3 py-2 border rounded-lg border-green-600 text-green-600 hover:bg-green-50"
                >
                  <MdVisibility className="inline mr-1" /> View
                </button>

                <button
                  onClick={() => handleDeleteStudent(student.id)}
                  className="flex-1 px-3 py-2 border rounded-lg border-red-600 text-red-600 hover:bg-red-50"
                >
                  <MdDelete className="inline mr-1" /> Delete
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-6 bg-white rounded-lg text-center text-gray-500 border">
            No students found.
          </div>
        )}
      </motion.div>

      {/* Summary */}
      <p className="text-sm text-gray-600 text-center">
        Showing {filteredStudents.length} of {students.length} students
      </p>
    </div>
  );
};

export default StudentList;

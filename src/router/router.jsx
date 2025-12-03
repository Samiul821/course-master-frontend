import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import Signup from "../Pages/Auth/SignUp/SignUp";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import AddCourse from "../Pages/Dashboard/Admin/AddCourse/AddCourse";
import AdminCourses from "../Pages/Dashboard/Admin/ManageCourses/ManageCourses";

const router = createBrowserRouter([
  // Root Layout
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  // Auth Layout
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: SignIn,
      },
      {
        path: "/register",
        Component: Signup,
      },
    ],
  },

  // Dashboard Layout
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },

      // Admin Route
      {
        path: "manage-courses",
        Component: AdminCourses, // All Courses Page
      },
      {
        path: "add-course",
        Component: AddCourse, // Add New Course Page
      },
      // {
      //   path: "/courses/edit/:id",
      //   Component: EditCourse, // Course Edit Page
      // },

      // // 3️⃣ Enrollments
      // {
      //   path: "/enrollments",
      //   Component: EnrollmentsPage,
      // },

      // // 4️⃣ Assignment Review
      // {
      //   path: "/assignments",
      //   Component: AssignmentReview,
      // },

      // // 5️⃣ Students
      // {
      //   path: "/students",
      //   Component: StudentsList,
      // },

      // // 6️⃣ Settings
      // // {
      // //   path: "/settings",
      // //   Component: AdminSettings,
      // // },
      // {
      //   path: "/adimn-profile",
      //   Component: AdminProfile,
      // },

      // // Student Route
      // {
      //   path: "/my-courses",
      //   Component: StudentMyCourses,
      // },
      // {
      //   path: "/learning/:courseId",
      //   Component: LearningPage,
      // },
      // {
      //   path: "/assignments",
      //   Component: StudentAssignments,
      // },
      // {
      //   path: "/my-profile",
      //   Component: StuendProfile,
      // },
    ],
  },
]);

export default router;

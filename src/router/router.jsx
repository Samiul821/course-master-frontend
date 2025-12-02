import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import Home from '../Pages/Home/Home/Home';
import AuthLayout from '../Layout/AuthLayout';
import SignIn from '../Pages/Auth/SignIn/SignIn';
import Signup from '../Pages/Auth/SignUp/SignUp';
import PrivateRoute from "../routes/PrivateRoute"
import DashboardLayout from "../Layout/DashboardLayout";

const router = createBrowserRouter([
    // Root Layout
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            
        ]
    },
    // Auth Layout
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path:"/login",
                Component: SignIn
            },
            {
                path: '/register',
                Component: Signup
            }
        ]
    },
    // Dashboard Layout
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>
        )
    }
])

export default router;
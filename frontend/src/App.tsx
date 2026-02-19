import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
//import UnauthorizedPage from "@/pages/UnauthorizedPage";
import CreateCoursePage from "@/pages/CreateCoursePage";
import CourseListPage from "@/pages/CourseListPage";

import ProtectedRoute from "@/routes/ProtectedRoute";
import Navbar from "@/components/Navbar";
import MyLearningPage from "@/pages/MyLearningPage";
import CoursePlayerPage from "@/pages/CoursePlayerPage";
import AddContentPage from "@/pages/AddContentPage";
import CreatorDashboardPage from "@/pages/CreatorDashboardPage";
import SignupPage from "@/pages/SignupPage";





function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />


        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CourseListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-course"
          element={
            <ProtectedRoute requiredPermission="can_create_course">
              <CreateCoursePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-learning"
          element={
            <ProtectedRoute>
              <MyLearningPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <CoursePlayerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-content"
          element={
            <ProtectedRoute requiredPermission="can_update_course">
              <AddContentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/creator-dashboard"
          element={
            <ProtectedRoute requiredPermission="can_create_course">
              <CreatorDashboardPage />
            </ProtectedRoute>
          }
        />





        <Route path="*" element={<Navigate to="/" replace />} />


      </Routes>
    </>
  );
}

export default App;

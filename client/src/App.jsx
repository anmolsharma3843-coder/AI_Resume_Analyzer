import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import AnalyzeResume from "./pages/AnalyzeResume";
import AnalysisHistory from "./pages/AnalysisHistory";
import AnalysisDetails from "./pages/AnalysisDetails";
import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes with login overlay */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyze" element={<AnalyzeResume />} />
            <Route path="/analysis-history" element={<AnalysisHistory />} />
            <Route path="/analysis/:id" element={<AnalysisDetails />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
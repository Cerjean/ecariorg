import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PreRegistrationProvider } from './contexts/PreRegistrationContext';
import { ProfessorRegistrationProvider } from './contexts/ProfessorRegistrationContext';

// Layouts
import Layout from './components/Layout/Layout';
import AdminLayout from './components/admin/layout/AdminLayout';

// Public Pages
import Home from './pages/Home';
import PreRegistration from './pages/PreRegistration';
import StatusCheck from './pages/StatusCheck';
import NotFound from './pages/NotFound';
import UcaoPresentation from './pages/UcaoPresentation';

// Auth Pages
import UserLogin from './pages/auth/UserLogin';
import AdminLogin from './pages/auth/AdminLogin';
import ProfessorRegistration from './pages/auth/ProfessorRegistration';

// Protected Pages
import ProtectedRoute from './components/auth/ProtectedRoute';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import AdminDashboardDispatcher from './pages/admin/AdminDashboardDispatcher';
import ManagePreRegistrations from './pages/admin/ManagePreRegistrations';
import ManageStudents from './pages/admin/ManageStudents';
import ManageProfessors from './pages/admin/ManageProfessors';
import ManageAcademicStructure from './pages/admin/ManageAcademicStructure';
import ManageAdmins from './pages/admin/ManageAdmins';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with standard layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/presentation-ucao" element={<UcaoPresentation />} />
            <Route path="/verification" element={<StatusCheck />} />
            <Route 
              path="/inscription-professeur"
              element={
                <ProfessorRegistrationProvider>
                  <ProfessorRegistration />
                </ProfessorRegistrationProvider>
              }
            />
          </Route>

          {/* Pre-registration route without standard layout */}
          <Route 
            path="/pre-inscription" 
            element={
              <PreRegistrationProvider>
                <PreRegistration />
              </PreRegistrationProvider>
            } 
          />
          
          {/* Auth routes */}
          <Route path="/connexion" element={<UserLogin />} />
          <Route path="/admin/connexion" element={<AdminLogin />} />

          {/* Student Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <StudentDashboard />
                </Layout>
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Protected Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin_uu', 'admin_ucao', 'super_admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboardDispatcher />} />
            <Route path="pre-inscriptions" element={<ManagePreRegistrations />} />
            <Route path="etudiants" element={<ManageStudents />} />
            <Route path="professeurs" element={<ManageProfessors />} />
            <Route path="structure-academique" element={<ManageAcademicStructure />} />
            <Route path="administrateurs" element={<ManageAdmins />} />
            <Route path="parametres" element={<AdminSettings />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
